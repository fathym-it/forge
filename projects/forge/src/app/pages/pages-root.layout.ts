import { Component, ViewChild, Injector } from "@angular/core";
import { isResultSuccess, BaseResponse } from "@lcu/core";
import { MatSidenav } from "@angular/material";
import { Angulartics2GoogleAnalytics } from "angulartics2/ga";
import { PageUIService, SolutionsSetupContext } from "@lcu/daf-common";
import { IdentityService } from "@lcu/identity";

export abstract class PagesRootLayoutComponent {
  //	Fields
  protected angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics;

  protected idSvc: IdentityService;

  protected uiSvc: PageUIService;

  protected solutionsSetup: SolutionsSetupContext;

  //	Properties
  @ViewChild("sidenav")
  public SideNav: MatSidenav;

  //	Constructors
  constructor(protected injector: Injector) {
    this.angulartics2GoogleAnalytics = injector.get(Angulartics2GoogleAnalytics);

    this.idSvc = injector.get(IdentityService);

    this.uiSvc = injector.get(PageUIService);

    this.angulartics2GoogleAnalytics = injector.get(Angulartics2GoogleAnalytics);

    this.angulartics2GoogleAnalytics.startTracking();
  }

  //	Life Cycle
  public ngAfterViewInit() {
    this.uiSvc.SideNav.Set(this.SideNav);

    setTimeout(() => {
      this.uiSvc.SideNav.Open();
    }, 150);
  }

  //	API Methods
  public SignOut() {
    this.idSvc.SignOut().subscribe(
      (result: BaseResponse) => {
        if (isResultSuccess(result)) {
          window.location.href = "/";
        } else {
          window.location.href = window.location.href;
        }
      },
      (error: any) => {
        window.location.href = window.location.href;
      }
    );
  }

  public ToggleSideNav() {
    this.uiSvc.SideNav.Toggle();
  }

  //	Helpers
}
