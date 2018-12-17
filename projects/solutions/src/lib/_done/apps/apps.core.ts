import { ApplicationModel } from 'projects/common/src/lib/core.api';

export class AppsCreateDialogConfig {
	public Host: string;

	public Path: string;

	public ViewType: 'API' | 'View';
}

export class AppsManageAppDialogConfig {
	public Application: ApplicationModel;

	public AppOptions: ApplicationModel[]
}
