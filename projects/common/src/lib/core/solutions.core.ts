import { SolutionModuleConfig } from "@lcu/elements";
import { ForgeApplicationsSolutionDisplayModule } from "@lowcodeunit/lcu-sln-applications";
import { ForgeWeatherCloudSolutionDisplayModule } from "@weather-cloud/lcu-sln-weather-cloud";
import { ForgeDepartureTableDisplayModule } from "@weather-cloud/lcu-el-departure-table";
import { ForgeWcRouteMapDisplayModule } from "@weather-cloud/lcu-el-wc-route-map";
import { ForgeWcSearchFormDisplayModule } from "@weather-cloud/lcu-el-wc-search-form";
import { ForgeWcRouteDetailsDisplayModule } from "@weather-cloud/lcu-el-wc-route-details";
import { ForgeAssetsSolutionDisplayModule } from "@lowcodeunit/lcu-sln-assets";
import { ForgeAssetsConfigManagerDisplayModule } from "@lowcodeunit/lcu-el-assets-config-manager";
import { ForgeAssetsDomainInputDisplayModule } from "@lowcodeunit/lcu-el-assets-domain-input";
import { ForgeAssetsDomainViewDisplayModule } from "@lowcodeunit/lcu-el-assets-domain-view";
import { ForgeDevicesSolutionDisplayModule } from "@lowcodeunit/lcu-sln-devices";
import { ForgeDashboardsSolutionDisplayModule } from "@lowcodeunit/lcu-sln-dashboards";
import { ForgeIdentitySolutionDisplayModule } from "@lowcodeunit/lcu-sln-identity";
import { ForgeIdentityRecoverPasswordDisplayModule } from "@lowcodeunit/lcu-el-identity-recover-password";
import { ForgeIdentityRegisterDisplayModule } from "@lowcodeunit/lcu-el-identity-register";
import { ForgeIdentitySignInDisplayModule } from "@lowcodeunit/lcu-el-identity-sign-in";
import { ForgeInfrastructureSolutionDisplayModule } from "@lowcodeunit/lcu-sln-infrastructure";
import { ForgeReportingSolutionDisplayModule } from "@lowcodeunit/lcu-sln-reporting";
import { ForgeReportingEditDisplayModule } from "@lowcodeunit/lcu-el-reporting-edit";
import { ForgeReportingViewDisplayModule } from "@lowcodeunit/lcu-el-reporting-view";
import { ForgeFluxSolutionDisplayModule } from "@lowcodeunit/lcu-sln-flux";

export const CoreForgeSolutionModules = [
  {
    Name: "Solutions",
    Icon: "fullscreen",
    BaseKey: "forge-solution",
    Modules: <SolutionModuleConfig[]>[
      {
        Name: "Applications",
        Control: { Base: "forge-solution", Details: {}, Type: "applications" },
        Solution: ForgeApplicationsSolutionDisplayModule,
        DisplaySetups: [
        ],
      },
      {
        Name: "Assets",
        Control: { Base: "forge-solution", Details: {}, Type: "assets" },
        Solution: ForgeAssetsSolutionDisplayModule,
        DisplaySetups: [
          {
            Name: "Assets",
            Icon: "data_usage",
            BaseKey: "forge-data",
            Modules: [
              {
                Name: "Config Manager",
                Control: { Base: "forge-assets", Details: {}, Type: "config-manager" },
                Display: ForgeAssetsConfigManagerDisplayModule,
                HideDrag: false,
                BuilderState: "Render",
              },
              {
                Name: "Asset Input",
                Control: { Base: "forge-assets", Details: {}, Type: "domain-input" },
                Display: ForgeAssetsDomainInputDisplayModule,
                HideDrag: false,
                BuilderState: "Render",
              },
              {
                Name: "Asset View",
                Control: { Base: "forge-assets", Details: {}, Type: "domain-view" },
                Display: ForgeAssetsDomainViewDisplayModule,
                HideDrag: false,
                BuilderState: "Render",
              },
            ]
          },
        ],
      },
      {
        Name: "Devices",
        Control: { Base: "forge-solution", Details: {}, Type: "devices" },
        Solution: ForgeDevicesSolutionDisplayModule,
        DisplaySetups: [
        ],
      },
      {
        Name: "Dashboards",
        Control: { Base: "forge-solution", Details: {}, Type: "dashboard" },
        Solution: ForgeDashboardsSolutionDisplayModule,
        DisplaySetups: [
        ],
      },
      {
        Name: "Flux",
        Control: { Base: "forge-solution", Details: {}, Type: "flux" },
        Solution: ForgeFluxSolutionDisplayModule,
        DisplaySetups: [
        ],
      },
      {
        Name: "Identity",
        Control: { Base: "forge-solution", Details: {}, Type: "identity" },
        Solution: ForgeIdentitySolutionDisplayModule,
        DisplaySetups: [
          {
            Name: "Identity",
            Icon: "person",
            BaseKey: "forge-identity",
            Modules: [
              {
                Name: "Register",
                Control: { Base: "forge-identity", Details: {}, Type: "register" },
                Display: ForgeIdentityRegisterDisplayModule,
                HideDrag: false,
                BuilderState: "Render",
              },
              {
                Name: "Sign In",
                Control: { Base: "forge-identity", Details: {}, Type: "sign-in" },
                Display: ForgeIdentitySignInDisplayModule,
                HideDrag: false,
                BuilderState: "Render",
              },
              {
                Name: "Forgot Password",
                Control: { Base: "forge-identity", Details: {}, Type: "recover-password" },
                Display: ForgeIdentityRecoverPasswordDisplayModule,
                HideDrag: false,
                BuilderState: "Render",
              },
            ]
          },
        ],
      },
      {
        Name: "Infrastructure",
        Control: { Base: "forge-solution", Details: {}, Type: "infrastructure" },
        Solution: ForgeInfrastructureSolutionDisplayModule,
        DisplaySetups: [
        ],
      },
      {
        Name: "Reporting",
        Control: { Base: "forge-solution", Details: {}, Type: "reporting" },
        Solution: ForgeReportingSolutionDisplayModule,
        DisplaySetups: [
          {
            Name: "Reporting",
            Icon: "insert_chart",
            BaseKey: "forge-reporting",
            Modules: [
              {
                Name: "Embedded Report - Edit",
                Control: { Base: "forge-reporting", Details: { Elements: [], Configs: [] }, Type: "edit" },
                Display: ForgeReportingEditDisplayModule,
                HideDrag: false,
                BuilderState: "Render",
              },
              {
                Name: "Embedded Report - View",
                Control: { Base: "forge-reporting", Details: { Elements: [], Configs: [] }, Type: "view" },
                Display: ForgeReportingViewDisplayModule,
                HideDrag: false,
                BuilderState: "Render",
              },
            ]
          },
        ],
      },
      {
        Name: "WeatherCloud",
        Control: { Base: "forge-solution", Details: {}, Type: "weather-cloud" },
        Solution: ForgeWeatherCloudSolutionDisplayModule,
        DisplaySetups: [
          {
            Name: "Weather Cloud",
            Icon: "cloud",
            BaseKey: "forge-weather-cloud",
            Modules: [
              {
                Name: "Departure Table",
                Control: { Base: "forge-weather-cloud", Details: { Elements: [], Configs: [] }, Type: "departure-table" },
                Display: ForgeDepartureTableDisplayModule,
                HideDrag: false,
                BuilderState: "Render",
              },
              {
                Name: "Route Map",
                Control: { Base: "forge-weather-cloud", Details: { Elements: [], Configs: [] }, Type: "wc-route-map" },
                Display: ForgeWcRouteMapDisplayModule,
                HideDrag: false,
                BuilderState: "Render",
              },
              {
                Name: "Search Form",
                Control: { Base: "forge-weather-cloud", Details: { Elements: [], Configs: [] }, Type: "wc-search-form" },
                Display: ForgeWcSearchFormDisplayModule,
                HideDrag: false,
                BuilderState: "Render",
              },
              {
                Name: "Route Details",
                Control: { Base: "forge-weather-cloud", Details: { Elements: [], Configs: [] }, Type: "wc-route-details" },
                Display: ForgeWcRouteDetailsDisplayModule,
                HideDrag: false,
                BuilderState: "Render",
              },
            ]
          },
        ],
      },
    ],
  },
];
