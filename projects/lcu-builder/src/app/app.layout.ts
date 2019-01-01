import { Component, ViewChild } from "@angular/core";
import { isResultSuccess, BaseResponse } from "@lcu/core";
import { IdentityService } from "@lcu/identity";
import { Angulartics2GoogleAnalytics } from "angulartics2/ga";
import { SolutionsSetupContext } from "@lcu/daf-common";

@Component({
  selector: "app-root",
  templateUrl: "./app.layout.html"
})
export class AppLayoutComponent {
  //	Fields

  //	Properties

  //	Constructors
  constructor(
    protected idSvc: IdentityService,
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    solutionsSetup: SolutionsSetupContext
  ) {
    angulartics2GoogleAnalytics.startTracking();
  }

  //	Life Cycle

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

  //	Helpers
}
