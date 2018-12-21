import { SolutionModuleConfig } from '@lcu/elements';
import { ForgeApplicationsSolutionDisplayModule } from '@lowcodeunit/lcu-sln-applications';
import { ForgeWeatherCloudSolutionSolutionDisplayModule } from '@weather-cloud/lcu-sln-weather-cloud';
import { ForgeDepartureTableDisplayModule } from '@weather-cloud/lcu-el-departure-table';

export const CoreForgeSolutionModules = [
	{
		Name: 'Solutions',
		Icon: 'fullscreen',
		BaseKey: 'forge-solution',
		Modules: <SolutionModuleConfig[]>[
			{
				Name: 'Applications',
				Control: { Base: 'forge-solution', Details: {}, Type: 'applications' },
				Solution: ForgeApplicationsSolutionDisplayModule,
				DisplaySetups: [
				],
			},
			// {
			// 	Name: 'Assets',
			// 	Control: { Base: 'forge-solution', Details: {}, Type: 'assets' },
			// 	Solution: ForgeAssetsSolutionDisplayModule,
			// 	DisplaySetups: [
			// 		{
			// 			Name: 'Assets',
			// 			Icon: 'data_usage',
			// 			BaseKey: 'forge-data',
			// 			Modules: [
			// 				{
			// 					Name: 'Config Manager',
			// 					Control: { Base: 'forge-data', Details: {}, Type: 'config-manager' },
			// 					Display: ForgeDataConfigManagerDisplayModule,
			// 					HideDrag: false,
			// 					BuilderState: 'Render',
			// 				},
			// 				{
			// 					Name: 'Asset Input',
			// 					Control: { Base: 'forge-data', Details: {}, Type: 'domain-input' },
			// 					Display: ForgeDataDomainInputDisplayModule,
			// 					HideDrag: false,
			// 					BuilderState: 'Render',
			// 				},
			// 				{
			// 					Name: 'Asset View',
			// 					Control: { Base: 'forge-data', Details: {}, Type: 'domain-view' },
			// 					Display: ForgeDataDomainViewDisplayModule,
			// 					HideDrag: false,
			// 					BuilderState: 'Render',
			// 				},
			// 			]
			// 		},
			// 	],
			// },
			// {
			// 	Name: 'Devices',
			// 	Control: { Base: 'forge-solution', Details: {}, Type: 'devices' },
			// 	Solution: ForgeDevicesSolutionDisplayModule,
			// 	DisplaySetups: [
			// 	],
			// },
			// {
			// 	Name: 'Dashboards',
			// 	Control: { Base: 'forge-solution', Details: {}, Type: 'dashboard' },
			// 	Solution: ForgeDashboardSolutionDisplayModule,
			// 	DisplaySetups: [
			// 	],
			// },
			// {
			// 	Name: 'Flow',
			// 	Control: { Base: 'forge-solution', Details: {}, Type: 'flow' },
			// 	Solution: ForgeFlowSolutionDisplayModule,
			// 	DisplaySetups: [
			// 	],
			// },
			// {
			// 	Name: 'Identity',
			// 	Control: { Base: 'forge-solution', Details: {}, Type: 'identity' },
			// 	Solution: ForgeIdentitySolutionDisplayModule,
			// 	DisplaySetups: [
			// 		{
			// 			Name: 'Identity',
			// 			Icon: 'person',
			// 			BaseKey: 'forge-identity',
			// 			Modules: [
			// 				{
			// 					Name: 'Register',
			// 					Control: { Base: 'forge-identity', Details: {}, Type: 'register' },
			// 					Display: ForgeIdentityRegisterDisplayModule,
			// 					HideDrag: false,
			// 					BuilderState: 'Render',
			// 				},
			// 			]
			// 		},
			// 	],
			// },
			// {
			// 	Name: 'Provisioning',
			// 	Control: { Base: 'forge-solution', Details: {}, Type: 'provisioning' },
			// 	Solution: ForgeProvisioningSolutionDisplayModule,
			// 	DisplaySetups: [
			// 	],
			// },
			{
				Name: 'WeatherCloud',
				Control: { Base: 'forge-solution', Details: {}, Type: 'weather-cloud' },
				Solution: ForgeWeatherCloudSolutionSolutionDisplayModule,
				DisplaySetups: [
					{
						Name: 'Weather Cloud',
						Icon: 'insert_chart',
						BaseKey: 'forge-weather-cloud',
						Modules: [
							{
								Name: 'Departure Table',
								Control: { Base: 'forge-weather-cloud', Details: { Elements: [], Configs: [] }, Type: 'departure-table' },
								Display: ForgeDepartureTableDisplayModule,
								HideDrag: false,
								BuilderState: 'Render',
							},
						]
					},
				],
			},
			// {
			// 	Name: 'Reporting',
			// 	Control: { Base: 'forge-solution', Details: {}, Type: 'reporting' },
			// 	Solution: ForgeReportingSolutionDisplayModule,
			// 	DisplaySetups: [
			// 		{
			// 			Name: 'Reporting',
			// 			Icon: 'insert_chart',
			// 			BaseKey: 'forge-reporting',
			// 			Modules: [
			// 				{
			// 					Name: 'Embedded Report - Edit',
			// 					Control: { Base: 'forge-reporting', Details: { Elements: [], Configs: [] }, Type: 'edit' },
			// 					Display: ForgeReportingEditDisplayModule,
			// 					HideDrag: false,
			// 					BuilderState: 'Render',
			// 				},
			// 				{
			// 					Name: 'Embedded Report - View',
			// 					Control: { Base: 'forge-reporting', Details: { Elements: [], Configs: [] }, Type: 'view' },
			// 					Display: ForgeReportingViewDisplayModule,
			// 					HideDrag: false,
			// 					BuilderState: 'Render',
			// 				},
			// 			]
			// 		},
			// 	],
			// },
		],
	},
];
