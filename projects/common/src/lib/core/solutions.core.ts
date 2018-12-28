import { SolutionModuleConfig } from '@lcu/elements';
import { ForgeApplicationsSolutionDisplayModule } from '@lcu/lcu-sln-applications';
import { ForgeWeatherCloudSolutionDisplayModule } from '@weather-cloud/lcu-sln-weather-cloud';
import { ForgeDepartureTableDisplayModule } from '@weather-cloud/lcu-el-departure-table';
import { ForgeAssetsSolutionDisplayModule } from '@lcu/lcu-sln-assets';
import { ForgeAssetsConfigManagerDisplayModule } from '@lcu/lcu-el-assets-config-manager';
import { ForgeAssetsDomainInputDisplayModule } from '@lcu/lcu-el-assets-domain-input';
import { ForgeAssetsDomainViewDisplayModule } from '@lcu/lcu-el-assets-domain-view';
import { ForgeDevicesSolutionDisplayModule } from '@lcu/lcu-sln-devices';
import { ForgeDashboardsSolutionDisplayModule } from '@lcu/lcu-sln-dashboards';
import { ForgeIdentitySolutionDisplayModule } from '@lcu/lcu-sln-identity';
import { ForgeIdentityRecoverPasswordDisplayModule } from '@lcu/lcu-el-identity-recover-password';
import { ForgeIdentityRegisterDisplayModule } from '@lcu/lcu-el-identity-register';
import { ForgeIdentitySignInDisplayModule } from '@lcu/lcu-el-identity-sign-in';
import { ForgeInfrastructureSolutionDisplayModule } from '@lcu/lcu-sln-infrastructure';
import { ForgeReportingSolutionDisplayModule } from '@lcu/lcu-sln-reporting';
import { ForgeReportingEditDisplayModule } from '@lcu/lcu-el-reporting-edit';
import { ForgeReportingViewDisplayModule } from '@lcu/lcu-el-reporting-view';

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
			{
				Name: 'Assets',
				Control: { Base: 'forge-solution', Details: {}, Type: 'assets' },
				Solution: ForgeAssetsSolutionDisplayModule,
				DisplaySetups: [
					{
						Name: 'Assets',
						Icon: 'data_usage',
						BaseKey: 'forge-data',
						Modules: [
							{
								Name: 'Config Manager',
								Control: { Base: 'forge-assets', Details: {}, Type: 'config-manager' },
								Display: ForgeAssetsConfigManagerDisplayModule,
								HideDrag: false,
								BuilderState: 'Render',
							},
							{
								Name: 'Asset Input',
								Control: { Base: 'forge-assets', Details: {}, Type: 'domain-input' },
								Display: ForgeAssetsDomainInputDisplayModule,
								HideDrag: false,
								BuilderState: 'Render',
							},
							{
								Name: 'Asset View',
								Control: { Base: 'forge-assets', Details: {}, Type: 'domain-view' },
								Display: ForgeAssetsDomainViewDisplayModule,
								HideDrag: false,
								BuilderState: 'Render',
							},
						]
					},
				],
			},
			{
				Name: 'Devices',
				Control: { Base: 'forge-solution', Details: {}, Type: 'devices' },
				Solution: ForgeDevicesSolutionDisplayModule,
				DisplaySetups: [
				],
			},
			{
				Name: 'Dashboards',
				Control: { Base: 'forge-solution', Details: {}, Type: 'dashboard' },
				Solution: ForgeDashboardsSolutionDisplayModule,
				DisplaySetups: [
				],
			},
			// {
			// 	Name: 'Flow',
			// 	Control: { Base: 'forge-solution', Details: {}, Type: 'flow' },
			// 	Solution: ForgeFlowSolutionDisplayModule,
			// 	DisplaySetups: [
			// 	],
			// },
			{
				Name: 'Identity',
				Control: { Base: 'forge-solution', Details: {}, Type: 'identity' },
				Solution: ForgeIdentitySolutionDisplayModule,
				DisplaySetups: [
					{
						Name: 'Identity',
						Icon: 'person',
						BaseKey: 'forge-identity',
						Modules: [
							{
								Name: 'Register',
								Control: { Base: 'forge-identity', Details: {}, Type: 'register' },
								Display: ForgeIdentityRegisterDisplayModule,
								HideDrag: false,
								BuilderState: 'Render',
							},
							{
								Name: 'Sign In',
								Control: { Base: 'forge-identity', Details: {}, Type: 'sign-in' },
								Display: ForgeIdentitySignInDisplayModule,
								HideDrag: false,
								BuilderState: 'Render',
							},
							{
								Name: 'Forgot Password',
								Control: { Base: 'forge-identity', Details: {}, Type: 'recover-password' },
								Display: ForgeIdentityRecoverPasswordDisplayModule,
								HideDrag: false,
								BuilderState: 'Render',
							},
						]
					},
				],
			},
			{
				Name: 'Infrastructure',
				Control: { Base: 'forge-solution', Details: {}, Type: 'infrastructure' },
				Solution: ForgeInfrastructureSolutionDisplayModule,
				DisplaySetups: [
				],
			},
			{
				Name: 'Reporting',
				Control: { Base: 'forge-solution', Details: {}, Type: 'reporting' },
				Solution: ForgeReportingSolutionDisplayModule,
				DisplaySetups: [
					{
						Name: 'Reporting',
						Icon: 'insert_chart',
						BaseKey: 'forge-reporting',
						Modules: [
							{
								Name: 'Embedded Report - Edit',
								Control: { Base: 'forge-reporting', Details: { Elements: [], Configs: [] }, Type: 'edit' },
								Display: ForgeReportingEditDisplayModule,
								HideDrag: false,
								BuilderState: 'Render',
							},
							{
								Name: 'Embedded Report - View',
								Control: { Base: 'forge-reporting', Details: { Elements: [], Configs: [] }, Type: 'view' },
								Display: ForgeReportingViewDisplayModule,
								HideDrag: false,
								BuilderState: 'Render',
							},
						]
					},
				],
			},
			{
				Name: 'WeatherCloud',
				Control: { Base: 'forge-solution', Details: {}, Type: 'weather-cloud' },
				Solution: ForgeWeatherCloudSolutionDisplayModule,
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
		],
	},
];
