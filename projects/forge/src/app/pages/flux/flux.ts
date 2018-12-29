import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSnackBar, MatMenuTrigger, MatDialog, MatDialogRef, MatSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FlowLayoutBehavior, FlowService, FlowLayoutConfiguration, FlowParser } from '@lcu/flux';
import { FlowConfig, FlowModuleOption } from '@lcu/apps';
import { isResultSuccess } from '@lcu/core';
import { RouterHelpersService } from '@lcu/routing';

@Component({
    selector: 'app-flux',
    templateUrl: './flux.html',
    providers: [RouterHelpersService],
})
export class FluxComponent implements OnInit, AfterViewInit {
    //	Fields
    protected environment: string;

    protected flowId: string;

    protected statusChecking: boolean;

    protected snackBarConfig: MatSnackBarConfig;

    protected timerRunning: boolean;

    protected intervalRunning: boolean;

    @ViewChild('sidenav')
    public sideNav: MatSidenav;

	@ViewChild('flowLayout')
	public FlowLayoutBehavior: FlowLayoutBehavior;

    //	Properties
    public EditorModuleOptions: {
        Category: string,
        Options: any[]
    }[];

    public Flow: FlowConfig;

    public FlowLayout: any;

    public MainLoader: boolean;

    public MappedFlow: any;

    public ModulesLoading: boolean;

    public ModuleOptions: FlowModuleOption[];

    public SideNavOpen: boolean;

    public ShowProvisioning: boolean;

    public CanUnprovision: boolean;

    public ShowUnprovisioning: boolean;

    //	Constructors
    constructor(public snackBar: MatSnackBar, protected flowSvc: FlowService, protected flowParser: FlowParser,
        protected flowLayoutConfiguration: FlowLayoutConfiguration, protected route: ActivatedRoute, protected router: Router,
        protected routerHelpers: RouterHelpersService) {

        this.statusChecking = false;

        this.snackBarConfig = {
            duration: 4000,
            panelClass: ['snack-bar-container']
        };

        this.FlowLayout = {};

        this.ShowProvisioning = true;

        this.environment = this.getEnvironment();

        this.ShowUnprovisioning = false;

        if (this.environment == 'stg' || this.environment == 'int')
            this.CanUnprovision = true;
        else
            this.CanUnprovision = false;

        this.ModulesLoading = true;
        this.MainLoader = true;
    }

    //	Runtimes
    public ngAfterViewInit() {
        this.FlowLayoutBehavior.AfterViewInit(true, "nodePalette", "mat-list-item");

        window.addEventListener('message', (ev) => {
            if (ev && ev.data && ev.data._type == 'SettingsUpdated') {
                var self = this;
                setTimeout(function () {
                    self.FlowLayoutBehavior.UpdateSettings(ev.data.NodeID, ev.data.Settings);

                    self.FlowLayoutBehavior.AuditConnections();

                    self.SaveFlow(false);
                }, 500);
            }
        }, false);
    }

    public ngOnInit() {
        this.FlowLayoutBehavior.Init(this.DataChanged, 550);

        this.flowLayoutConfiguration.Init(this.FlowLayoutBehavior, this.FlowLayoutBehavior.NodeFactory,
            this.BeforeStartConnect, this.FlowLayoutBehavior.BeforeConnect,
            this.FlowLayoutBehavior.BeforeStartDetach,
            this.ToggleSelection, this.RemoveEdge,
            this.CanvasClick, this.FlowLayoutBehavior.ObjectRepainted,
            this.FlowLayoutBehavior.EdgeAdded, this.FlowLayoutBehavior.EdgeMoved,
            this.FlowLayoutBehavior.ModeChanged, this.FlowLayoutBehavior.ConnectionClick);

    }

    //	API Methods
    public DataChanged() {

    }

    public RemoveEdge(ctx: FlowLayoutBehavior, edge: any) {
        if (edge.source.data.Status && edge.source.data.Status.Code && edge.source.data.Status.Code == 100) {
            ctx.OnError.emit({ Error: "Module Connections Unavailable While Loading", Action: "DISMISS" });
            return false;
        }

        if (edge.target.data.Status && edge.target.data.Status.Code && edge.target.data.Status.Code == 100) {
            ctx.OnError.emit({ Error: "Module Connections Unavailable While Loading", Action: "DISMISS" });
            return false;
        }

        ctx.ConnectionClick(ctx, edge);
    }

    public BeforeStartConnect(ctx: FlowLayoutBehavior, node: any, edgeType: any) {
        if (node.data.Status && node.data.Status.Code && node.data.Status.Code == 100) {
            ctx.OnError.emit({ Error: "Module Connections Unavailable While Loading", Action: "DISMISS" });
            return false;
        }

        ctx.BeforeStartConnect(ctx, node, edgeType);
    }

    public CanvasClick(ctx: FlowLayoutBehavior, e: Event) {
        for (var i = 0; i < document.querySelectorAll('.menu-item.menu-item-active').length; i++) {
            document.querySelectorAll('.menu-item.menu-item-active').item(i).classList.remove('menu-item-active');
            i--;
        }

        ctx.CanvasClick(ctx, e);
    }

    public ToggleSelection(ctx: FlowLayoutBehavior, node: any) {
        if (node.data.Status && node.data.Status.Code && node.data.Status.Code == 100) {
            ctx.OnError.emit({ Error: "Module Unavailable While Loading", Action: "DISMISS" });
            return;
        }

        for (var i = 0; i < document.querySelectorAll('.menu-item.menu-item-active').length; i++) {
            document.querySelectorAll('.menu-item.menu-item-active').item(i).classList.remove('menu-item-active');
            i--;
        }

        var newAdd = true;

        ctx.ToolkitComponent.toolkit.getSelection().getNodes().forEach(function (n) {
            if (n.id != node.id)
                document.querySelectorAll('.menu-item.' + n.data.Service).item(0).classList.add('menu-item-active');

            if (n.id == node.id)
                newAdd = false;
        });

        if (newAdd)
            document.querySelectorAll('.menu-item.' + node.data.Service).item(0).classList.add('menu-item-active');

        ctx.ToggleSelection(ctx, node);
    }

    public HasErrors() {
        var hasErrors = false;
        if (this.Flow) {
            this.Flow.Modules.forEach(function (module) {
                if (!module.Deleted && module.Settings && module.Settings.HasErrors)
                    hasErrors = true;
            });
        }
        return hasErrors;
    }

    public InitializeFlow() {
        this.routerHelpers.RunOnRouteParam('id', (params) => {
            this.flowId = params['id'];

            this.Load(true);
        });
    }

    public Load(setMainLoader?: boolean) {
        //this.ModulesLoading = true;

        //this.MainLoader = true;
        var self = this;
        forkJoin(
            this.flowSvc.Get(this.flowId),
            this.flowSvc.LoadModuleOptions(this.flowId)
        ).subscribe(
            (results) => {
                    if (isResultSuccess(results[0])) {
                        this.Flow = results[0].Model;

                        if (this.Flow.ProvisionStatus && (this.Flow.ProvisionStatus == "Provisioned" || this.Flow.ProvisionStatus == "ProvisionedWithErrors")) {
                            this.setProvisioningStatus(true);
                            this.setStatusCheckTimer(false);
                        }
                        else if (this.Flow.ProvisionStatus && this.Flow.ProvisionStatus == "Provisioning") {
                            this.setProvisioningStatus(false);
                            this.setStatusCheckTimer(true);
                            this.ShowUnprovisioning = false;
                        }
                        else if (this.Flow.ProvisionStatus && this.Flow.ProvisionStatus == "Unprovisioned") {
                            this.ShowUnprovisioning = false;
                            this.setUnprovisioningStatus();
                        }
                    } else {
                        console.log(results[0]);
                    }

                    if (isResultSuccess(results[1])) {
                        this.ModuleOptions = results[1].Model.filter(function (item) {
                            return item.ModuleType.indexOf('.IoT.') == -1;
                        });

                        var cats = this.ModuleOptions.map(m => m.Category).filter((item, i, ar) => ar.indexOf(item) === i).sort();

                        this.EditorModuleOptions = cats.map(c => {
                            return {
                                Category: c,
                                Options: this.ModuleOptions.filter(m => m.Category == c && m.Visible).sort(function (a, b) {
                                    return a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0;
                                }),
                                Visible: localStorage['Fathym:Flow:' + this.flowId + ':SideNav:' + c] ? localStorage['Fathym:Flow:' + this.flowId + ':SideNav:' + c] == 'true' : true
                            };
                        });

                        this.SideNavOpen = localStorage['Fathym:Flow:' + this.flowId + ':SideNavOpen'] ? localStorage['Fathym:Flow:' + this.flowId + ':SideNavOpen'] == 'true' : true;
                        if (this.SideNavOpen)
                            this.sideNav.open();

                        setTimeout(() => {
                            this.FlowLayoutBehavior.AfterDataLoad();
                        }, 0);

                        this.FlowLayoutBehavior.SetModuleOptions(this.ModuleOptions);

                        this.FlowLayoutBehavior.PrepareNodesAndPorts();

                        this.FlowLayoutBehavior.MapExistingFlow(this.Flow);
                    } else {
                        console.log(results[1]);
                    }
            },
            (err) => {
                console.log(err);
            },
            () => {
                this.ModulesLoading = false;

                this.MainLoader = false;
            });
    }

    public Provision() {
        this.ModulesLoading = true;

        this.Flow.ProvisionStatus = "Provisioning";
        var self = this;

        this.SaveFlow(true).add(() => {
            this.timerRunning = false;
            this.setProvisioningStatus(false);

            this.flowSvc.Provision(this.Flow.ID, this.environment).subscribe(
                (results) => {
                    this.timerRunning = true;

                    this.ModulesLoading = false;

                    if (!this.intervalRunning)
                        this.setStatusCheckTimer(false);
                },
                (err) => {
                    this.ModulesLoading = false;

                    this.timerRunning = true;

                    if (!this.intervalRunning)
                        this.setStatusCheckTimer(true);
                },
                () => {
                    this.ModulesLoading = false;

                    this.timerRunning = true;

                    if (!this.intervalRunning)
                        this.setStatusCheckTimer(true);
                });
        });
    }

    public Unprovision() {
        this.ModulesLoading = true;

        this.Flow.ProvisionStatus = "Provisioning";
        var self = this;

        this.SaveFlow(true).add(() => {
            this.timerRunning = false;
            this.setProvisioningStatus(false);

            this.flowSvc.Unprovision(this.Flow.ID, this.environment).subscribe(
                (results) => {
                    this.timerRunning = true;

                    this.ModulesLoading = false;

                    if (!this.intervalRunning)
                        this.setStatusCheckTimer(false);
                },
                (err) => {
                    this.ModulesLoading = false;

                    this.timerRunning = true;

                    if (!this.intervalRunning)
                        this.setStatusCheckTimer(true);
                },
                () => {
                    this.ModulesLoading = false;

                    this.timerRunning = true;

                    if (!this.intervalRunning)
                        this.setStatusCheckTimer(true);
                });
        });
    }

    public SaveFlow(forProvision?: boolean) {
        this.ModulesLoading = true;

        var data = this.FlowLayoutBehavior.ExportFlow(this.Flow);

        var copy = JSON.parse(JSON.stringify(data));

        copy.Modules.forEach(function (module) {
            module.Token = null;
            if (forProvision || (module.Status && module.Status.Code != -100))
                module.Status = null;
        });

        return this.flowSvc.UpdateFlow(copy).subscribe(
            (results) => {
                if (isResultSuccess(results)) {

                } else {
                    console.log(results);
                }
            },
            (err) => {
                console.log(err);
            },
            () => {
                this.ModulesLoading = false;
            });
    }

    public ShowError(errorDetails: { Error: string, Action: string }) {
        this.snackBar.open(errorDetails.Error, errorDetails.Action, this.snackBarConfig);
    }

    public ToggleModuleGroup(moduleType: any) {
        moduleType.Visible = !moduleType.Visible;
        localStorage['Fathym:Flow:' + this.flowId + ':SideNav:' + moduleType.Category] = moduleType.Visible;
    }

    public ToggleSideNav() {
        this.sideNav.toggle();
        this.SideNavOpen = !this.SideNavOpen;
        localStorage['Fathym:Flow:' + this.flowId + ':SideNavOpen'] = this.SideNavOpen;
    }

    //	Helpers
    protected getEnvironment() {
        var host = window.location.hostname.toLowerCase();

        if (host == 'localhost' || host == 'int-flow.fathym.com')
            return 'int';
        else if (host == 'stg-flow.fathym.com')
            return 'stg';
        else if (host == 'flow.fathym.com')
            return 'prd';

        return 'int';
    }

    protected setProvisioningStatus(forPageLoad: boolean) {
        var self = this;

        self.ShowProvisioning = false;
        self.ShowUnprovisioning = false;

        self.Flow.Modules.filter(function (item) {
            return !item.Deleted;
        }).forEach(function (module) {
            if (forPageLoad && module.Status && module.Status.Code == -100) {
                //do nothing
            }
            else
                module.Status = { Code: 100 };
        });
    }

    protected setUnprovisioningStatus() {
        var self = this;

        self.ShowUnprovisioning = false;

        self.Flow.Modules.filter(function (item) {
            return !item.Deleted;
        }).forEach(function (module) {
            module.Status = { Code: -100 };
        });

        this.timerRunning = false;
        this.intervalRunning = false;
    }

    protected setStatusCheckTimer(stillProvisioning: boolean) {
        var self = this;

        if (!this.intervalRunning && !this.statusChecking) {
            this.timerRunning = true;
            this.intervalRunning = true;

            this.statusChecking = true;
            var result = self.flowSvc.GetFlowStatus(self.Flow.ID, this.environment).subscribe(
                (result) => {
                    this.statusChecking = false;

                    if (!result)
                        return;
                    self.Flow.ProvisionStatus = result.Model["ProvisionStatus"].Message;

                    stillProvisioning = result.Model["ProvisionStatus"].Message != "Provisioned"
                        && result.Model["ProvisionStatus"].Message != "ProvisionedWithErrors"
                        && result.Model["ProvisionStatus"].Message != "Unprovisioned";
                    self.ShowProvisioning = !stillProvisioning;
                    if (self.CanUnprovision)
                        self.ShowUnprovisioning = !stillProvisioning && (result.Model["ProvisionStatus"].Message == "Provisioned"
                            || result.Model["ProvisionStatus"].Message == "ProvisionedWithErrors")
                    else
                        self.ShowUnprovisioning = false;

                    if (result.Model["ProvisionStatus"].Message == "Unprovisioned")
                        self.setUnprovisioningStatus();
                    else {
                        self.Flow.Modules.filter(function (item) {
                            return !item.Deleted;
                        }).forEach(function (module) {
                            if (module.Status && module.Status.Code == -100) {
                                //Do nothing
                            }
                            else {
                                var modStatus = result.Model[module.ID];

                                if (modStatus) {
                                    if ((module.Status == null || modStatus.Code != module.Status.Code) && !(stillProvisioning && modStatus.Code != 0)) {
                                        module.Status = modStatus;
                                        self.FlowLayoutBehavior.RefreshNode(module.ID);
                                    }
                                }
                                else if (!stillProvisioning) {
                                    if (module.Status.Code != 404) {
                                        module.Status.Code = 404;
                                        self.FlowLayoutBehavior.RefreshNode(module.ID);
                                    }
                                }
                            }
                        });
                    }
                }, (err) => {
                    this.statusChecking = false;
                });
        };

        setInterval(function () {
            if (!self.flowId)
                self.timerRunning = false;
            if (self.timerRunning && !self.statusChecking) {
                self.statusChecking = true;
                var result = self.flowSvc.GetFlowStatus(self.Flow.ID, self.environment).subscribe(
                    (result) => {
                        self.statusChecking = false;

                        if (!result)
                            return;
                        self.Flow.ProvisionStatus = result.Model["ProvisionStatus"].Message;

                        stillProvisioning = result.Model["ProvisionStatus"].Message != "Provisioned"
                            && result.Model["ProvisionStatus"].Message != "ProvisionedWithErrors"
                            && result.Model["ProvisionStatus"].Message != "Unprovisioned";
                        self.ShowProvisioning = !stillProvisioning;
                        if (self.CanUnprovision)
                            self.ShowUnprovisioning = !stillProvisioning && (result.Model["ProvisionStatus"].Message == "Provisioned"
                                || result.Model["ProvisionStatus"].Message == "ProvisionedWithErrors")
                        else
                            self.ShowUnprovisioning = false;

                        if (result.Model["ProvisionStatus"].Message == "Unprovisioned")
                            self.setUnprovisioningStatus();
                        else {
                            self.Flow.Modules.filter(function (item) {
                                return !item.Deleted;
                            }).forEach(function (module) {
                                if (module.Status && module.Status.Code == -100) {
                                    //Do nothing
                                }
                                else {
                                    var modStatus = result.Model[module.ID];

                                    if (modStatus) {
                                        if (module.Status == null || modStatus.Code != module.Status.Code && !(stillProvisioning && modStatus.Code != 0)) {
                                            module.Status = modStatus;
                                            self.FlowLayoutBehavior.RefreshNode(module.ID);
                                        }
                                    }
                                    else if (!stillProvisioning) {
                                        if (module.Status.Code != 404) {
                                            module.Status.Code = 404;
                                            self.FlowLayoutBehavior.RefreshNode(module.ID);
                                        }
                                    }
                                }
                            });
                        }
                    }, (err) => {
                        self.statusChecking = false;
                    });
            }
        }, 30000);
    }
}
