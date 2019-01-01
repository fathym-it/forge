import { Component, Inject } from "@angular/core";
import { isResultSuccess } from "@lcu/core";
import { Router } from "@angular/router";
import {
  SolutionModuleSetup,
  SolutionsSetup,
  ISolutionsService,
  SolutionModuleConfig,
  SolutionElement,
  RenderingControl
} from "@lcu/elements";
import { SolutionsSetupContext, PageUIService } from "@lcu/daf-common";

@Component({
  selector: "solutions-overview-pages",
  templateUrl: "./overview.page.html",
  styleUrls: ["./overview.page.scss"]
})
export class OverviewPage {
  //	Properties
  public get HasSolutions(): boolean {
    return this.Setup && this.Setup.Configs && this.Setup.Configs.length > 0;
  }

  public Loading: boolean;

  public get OrderedConfigs(): SolutionElement[] {
    return this.Setup.Configs.sort((a, b) => {
      if (a.Title >= b.Title) return 1;
      else if (a.Title <= b.Title) return -1;
      else a.Title == b.Title;
      return 0;
    });
  }

  public SolutionOptions: SolutionModuleSetup[];

  public Setup: SolutionsSetup;

  //	Constructors
  constructor(
    protected solutionsSetup: SolutionsSetupContext,
    protected router: Router,
    protected pgUiSvc: PageUIService,
    protected solutionsSvc: ISolutionsService
  ) {}

  //	Life Cycle
  public ngOnInit() {
    this.solutionsSetup.Context.subscribe(setup => {
      this.Setup = setup;
    });

    this.solutionsSetup.Loading.subscribe(loading => {
      this.Loading = loading;
    });

    this.solutionsSvc.LoadSolutionModules().subscribe(result => {
      if (isResultSuccess(result)) {
        this.SolutionOptions = result.Model;
      } else {
      }
    });
  }

  //	API Methods
  public IsExisting(control: RenderingControl) {
    var existing =
      control && this.Setup && this.Setup.Configs.find(c => c.Control.Base == control.Base && c.Control.Type == control.Type);

    return !!existing;
  }

  public HasAnyAvailable(setup: SolutionModuleSetup) {
    return setup && setup.Modules.some(m => !this.IsExisting(m.Control));
  }

  public RemoveSolution(element: SolutionElement) {
    var existing = this.IsExisting(element.Control);

    if (existing && confirm(`Are you sure you want to remove ${element.Title}?`)) {
      this.Setup.Configs = this.Setup.Configs.filter(sln => {
        return sln.Control.Base != element.Control.Base || sln.Control.Type != element.Control.Type;
      });

      this.solutionsSetup.Save(this.Setup).subscribe(() => {
        this.pgUiSvc.Notify.Signal(`Successfully removed ${element.Title}`);
      });
    } else if (!existing) {
      alert("Cannot remove the solution as it is not currently in your enterprise, please refresh the page.");
    }
  }

  public Save(module: SolutionModuleConfig) {
    var existing = this.IsExisting(module.Control);

    if (!existing && confirm(`Are you sure you want to select ${module.Name}?`)) {
      this.Setup.Configs.push(<SolutionElement>{
        Title: module.Name,
        Favorite: true,
        Control: module.Control
      });

      this.solutionsSetup.Save(this.Setup).subscribe(() => {
        this.router.navigate(["/solutions", module.Control.Base, module.Control.Type, "overview"]);
      });
    } else if (existing) {
      alert("Cannot add the solution as it is already added to your enterprise.");
    }
  }

  public ToggleFavorite(element: SolutionElement) {
    var existing = this.IsExisting(element.Control);

    if (existing) {
      var config = this.Setup.Configs.find(sln => {
        return sln.Control.Base == element.Control.Base && sln.Control.Type == element.Control.Type;
      });

      config.Favorite = !config.Favorite;

      this.solutionsSetup.Save(this.Setup).subscribe(() => {
        this.pgUiSvc.Notify.Signal(`Successfully toggled favorite for ${element.Title}`);
      });
    } else if (!existing) {
      alert("Cannot toggle favorite for the solution as it is not currently in your enterprise, please refresh the page.");
    }
  }
}
