import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  AfterViewInit,
  OnInit,
  Output,
  EventEmitter
} from "@angular/core";
import { isResultSuccess } from "@lcu/core";
import { RouterHelpersService } from "@lcu/routing";
import { ForgeJSONSchema } from "@lcu/apps";
import { FlowService } from "@lcu/flux";

export class BaseModuleManagerComponent implements AfterViewInit, OnInit {
  //	Fields

  //	Properties
  public IncommingModules: any;

  public LookupValid: boolean;

  public SubLookupValid: boolean;

  public ModuleTypeName: string;

  public OutgoingModules: any;

  public Settings: any;

  public SchemaOptions: ForgeJSONSchema[];

  public Token: string;

  public SettingsLoaded: EventEmitter<any>;

  public UnavailableLookups: any[];

  public FirstLoad: boolean;

  public ServerError: string;

  public ServerErrorSubLookup: string;

  public Application: string;

  public Service: string;

  public FlowID: string;

  public Saving: boolean;

  //	Constructors
  constructor(
    protected container: ElementRef,
    protected routerHelpers: RouterHelpersService,
    protected cdRef: ChangeDetectorRef,
    protected flowSvc: FlowService
  ) {
    this.SettingsLoaded = new EventEmitter();

    this.LookupValid = true;

    this.SubLookupValid = true;

    this.FirstLoad = false;

    this.Saving = false;

    this.Settings = {};
  }

  //	Runtime
  public ngAfterViewInit() {
    setTimeout(() => {
      this.SendDimensions();
    }, 350);
  }

  public ngOnInit() {
    this.routerHelpers.RunOnQueryParam("token", params => {
      this.Token = params["token"];
    });

    window.addEventListener(
      "message",
      ev => {
        var settingsData = this.shouldHandle("IoTFlow:Settings", ev);
        var shouldFire = false;

        if (settingsData) {
          this.Settings = settingsData.Settings;

          var schemaData = settingsData.Options;
          if (schemaData) {
            this.SchemaOptions = schemaData.filter(item => item.Title);
          }

          var incommingModuleData = settingsData.IncommingModules;
          if (incommingModuleData) {
            this.IncommingModules = incommingModuleData.Items;
          }

          var outgoingModuleData = settingsData.OutgoingModules;
          if (outgoingModuleData) {
            this.OutgoingModules = outgoingModuleData.Items;
          }

          var unavailableLookups = settingsData.UnavailableLookups;
          if (unavailableLookups) {
            this.UnavailableLookups = unavailableLookups;
          }

          var moduleTypeName = settingsData.ModuleTypeName;
          if (moduleTypeName) {
            this.ModuleTypeName = moduleTypeName;
          }

          var service = settingsData.Service;
          if (service) {
            this.Service = service;
          }

          var application = settingsData.Application;
          if (application) {
            this.Application = application;
          }

          var flowId = settingsData.FlowID;
          if (flowId) {
            this.FlowID = flowId;
          }

          var firstLoad = settingsData.FirstLoad;
          if (firstLoad) this.FirstLoad = true;
          else this.FirstLoad = false;

          shouldFire = true;

          this.cdRef.detectChanges();
        }

        if (shouldFire) this.SettingsLoaded.emit();
      },
      false
    );
  }

  //	API Methods
  public ValidateLookup(min, max) {
    this.ServerError = "";
    var letters = /^[0-9a-zA-Z]+$/;

    if (this.UnavailableLookups && this.UnavailableLookups.length > 0)
      this.LookupValid =
        Object.keys(this.UnavailableLookups).indexOf(this.Settings.Lookup) ==
        -1;
    else if (this.Settings.Lookup.indexOf(" ") > -1) {
      this.ServerError = "Lookups cannot conatin spaces";
    } else if (
      this.Settings.Lookup.length < min ||
      this.Settings.Lookup.length > max
    ) {
      this.ServerError =
        "Lookups must be " +
        min.toString() +
        " or " +
        max.toString() +
        " alphanumeric characters";
    } else if (!this.Settings.Lookup.match(letters))
      this.ServerError =
        "Lookups must be " +
        min.toString() +
        " or " +
        max.toString() +
        " alphanumeric characters";
    else this.LookupValid = true;
  }

  public ValidateSubLookup(lookup, min, max) {
    this.ServerErrorSubLookup = "";
    this.SubLookupValid = true;
    var letters = /^[0-9a-zA-Z]+$/;

    if (this.UnavailableLookups && this.UnavailableLookups.length > 0) {
      if (
        this.UnavailableLookups.filter(function(item) {
          return item.Lookup == lookup;
        }).length > 0
      ) {
        var origLookup = this.UnavailableLookups.filter(function(item) {
          return item.Lookup == lookup;
        })[0];

        if (origLookup.SubLookups.indexOf(this.Settings.SubLookup))
          this.SubLookupValid = false;
      } else this.SubLookupValid = true;
    }

    if (this.Settings.SubLookup.indexOf(" ") > -1)
      this.ServerErrorSubLookup = "Sub Lookups cannot conatin spaces";
    else if (
      this.Settings.SubLookup.length < min ||
      this.Settings.SubLookup.length > max
    )
      this.ServerErrorSubLookup =
        "Sub Lookups must be " +
        min.toString() +
        " or " +
        max.toString() +
        " alphanumeric characters";
    else if (!this.Settings.SubLookup.match(letters))
      this.ServerErrorSubLookup =
        "Sub Lookups must be " +
        min.toString() +
        " or " +
        max.toString() +
        " alphanumeric characters";
  }

  public SendDimensions() {
    //var iframe = this.container.nativeElement.querySelector('> div');
    //this.postMessageToParent({
    //	height: iframe.offsetHeight,
    //	width: iframe.offsetWidth
    //}, 'IoTFlow:Dimensions');
  }

  public Save() {
    this.ServerError = "";

    var lookupValid = true;

    this.Saving = true;

    if (this.FirstLoad) {
      var result = this.flowSvc
        .GetModuleStatus(
          this.FlowID,
          this.getEnvironment(),
          this.Application,
          this.Service,
          this.Settings
        )
        .subscribe(result => {
          if (isResultSuccess(result)) lookupValid = false;

          this.Saving = false;

          if (lookupValid) this.postMessageToParent(this.Settings, "IoTFlow");
          else
            this.ServerError =
              "Lookup already exists on server for this flow's " +
              this.ModuleTypeName +
              " items (possibly a UI deletion)";
        });
    } else this.postMessageToParent(this.Settings, "IoTFlow");
  }

  //	Helpers
  protected getEnvironment() {
    var host = window.location.hostname.toLowerCase();

    if (host == "localhost" || host == "int-flow.fathym.com") return "int";
    else if (host == "stg-flow.fathym.com") return "stg";
    else if (host == "flow.fathym.com") return "prd";

    return "int";
  }

  protected postMessageToParent(data: any, app: string) {
    data._app = app;

    data._token = this.Token;

    window.parent.postMessage(JSON.stringify(data), "*");
  }

  protected shouldHandle(app: string, ev: MessageEvent) {
    try {
      var data = ev.data ? JSON.parse(ev.data) : null;

      var handle = data && data._app == app;

      return handle ? data : null;
    } catch (e) {
      return null;
    }
  }
}
