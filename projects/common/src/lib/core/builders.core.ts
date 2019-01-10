import { ForgeDisplayActionDisplayModule } from "@lowcodeunit/lcu-el-display-action";
import { ForgeDisplayChartsDisplayModule } from "@lowcodeunit/lcu-el-display-charts";
import { ForgeDisplayContentDisplayModule } from "@lowcodeunit/lcu-el-display-content";
import { ForgeDisplayJsonViewDisplayModule } from "@lowcodeunit/lcu-el-display-json-view";
import { ForgeDisplayPointerDisplayModule } from "@lowcodeunit/lcu-el-display-pointer";
import { ForgeLayoutFlexDisplayModule } from "@lowcodeunit/lcu-el-layout-flex";
import { ForgeLayoutStackedDisplayModule } from "@lowcodeunit/lcu-el-layout-stacked";
import { ForgeLayoutSwitchStateDisplayModule } from "@lowcodeunit/lcu-el-layout-switch-state";
import { ForgeMaterialLayoutCardDisplayModule } from "@lowcodeunit/lcu-el-material-layout-card";
import { ForgeMaterialLayoutGridListDisplayModule } from "@lowcodeunit/lcu-el-material-layout-grid-list";
import { ForgeMaterialNavMenuDisplayModule } from "@lowcodeunit/lcu-el-material-nav-menu";
import { ForgeMaterialNavToolbarDisplayModule } from "@lowcodeunit/lcu-el-material-nav-toolbar";

export const CoreForgeBuilderDisplayModules = [
  {
    Name: "Display",
    Icon: "fullscreen",
    BaseKey: "forge-display",
    Modules: [
      {
        Name: "Action",
        Control: { Base: "forge-display", Details: { Context: "Internal", Insight: {}, Type: "AnchorMaterial" }, Type: "action" },
        Display: ForgeDisplayActionDisplayModule,
        HideDrag: false,
        BuilderState: "Render"
      },
      {
        Name: "Charts",
        Control: { Base: "forge-display", Details: { Elements: [], Configs: [] }, Type: "charts" },
        Display: ForgeDisplayChartsDisplayModule,
        HideDrag: false,
        BuilderState: "Render"
      },
      {
        Name: "Content",
        Control: { Base: "forge-display", Details: { Type: "h3" }, Type: "content" },
        Display: ForgeDisplayContentDisplayModule,
        HideDrag: false,
        BuilderState: "Render"
      },
      {
        Name: "JSON View",
        Control: { Base: "forge-display", Details: {}, Type: "json-view" },
        Display: ForgeDisplayJsonViewDisplayModule,
        HideDrag: false,
        BuilderState: "Render"
      },
      {
        Name: "Pointer",
        Control: { Base: "forge-display", Details: {}, Type: "pointer" },
        Display: ForgeDisplayPointerDisplayModule,
        HideDrag: false,
        BuilderState: "Render"
      }
      // {
      // 	Name: 'Raw View',
      // 	Control: { Base: 'forge', Details: {}, Type: 'display-raw' },
      // 	Display: ForgeDisplayRawDisplayModule,
      // 	HideDrag: false,
      // 	BuilderState: 'Render',
      // },
    ]
  },
  {
    Name: "Layout",
    Icon: "settings_overscan",
    BaseKey: "forge-layout",
    Modules: [
      {
        Name: "Flex",
        Control: { Base: "forge-layout", Details: { Elements: [], Configs: [] }, Type: "flex" },
        Display: ForgeLayoutFlexDisplayModule,
        HideDrag: false,
        BuilderState: "Render"
      },
      {
        Name: "Stacked",
        Control: { Base: "forge-layout", Details: { Elements: [], Configs: [] }, Type: "stacked" },
        Display: ForgeLayoutStackedDisplayModule,
        HideDrag: false,
        BuilderState: "Render"
      },
      {
        Name: "Switch State",
        Control: { Base: "forge-layout", Details: { Elements: [], Configs: [] }, Type: "switch-state" },
        Display: ForgeLayoutSwitchStateDisplayModule,
        HideDrag: false,
        BuilderState: "Render"
      }
    ]
  },
  {
    Name: "Material Layout",
    Icon: "settings_overscan",
    BaseKey: "forge-material-layout",
    Modules: [
      {
        Name: "Card",
        Control: { Base: "forge-material-layout", Details: { Elements: [], Configs: [] }, Type: "card" },
        Display: ForgeMaterialLayoutCardDisplayModule,
        HideDrag: false,
        BuilderState: "Render"
      },
      {
        Name: "Grid List",
        Control: {
          Base: "forge-material-layout",
          Details: { Columns: 8, RowHeight: "1:1", GutterSize: "1rem", Elements: [], Configs: [] },
          Type: "grid-list"
        },
        Display: ForgeMaterialLayoutGridListDisplayModule,
        HideDrag: false,
        BuilderState: "Render"
      }
    ]
  },
  {
    Name: "Material Navigation",
    Icon: "navigation",
    BaseKey: "forge-material-nav",
    Modules: [
      {
        Name: "Menu",
        Control: { Base: "forge-material-nav", Details: { Elements: [], Configs: [] }, Type: "menu" },
        Display: ForgeMaterialNavMenuDisplayModule,
        HideDrag: false,
        BuilderState: "Render"
      },
      {
        Name: "Toolbar",
        Control: { Base: "forge-material-nav", Details: { Elements: [], Configs: [] }, Type: "toolbar" },
        Display: ForgeMaterialNavToolbarDisplayModule,
        HideDrag: false,
        BuilderState: "Render"
      }
    ]
  }
];
