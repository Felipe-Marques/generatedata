import React from 'react';
import loadable, { LoadableComponent } from '@loadable/component';
import Dropdown, { DropdownOption } from '../dropdown/Dropdown';
import { exportTypeOptions } from '../../utils/exportTypeUtils';
import * as styles from './ExportSettings.scss';
import { ExportSettingsTab } from './ExportSettings.types';

export type ExportTypeTabProps = {
	exportType: string;
	onChangeExportType: (exportType: string) => void;
	exportSettingsTab: ExportSettingsTab
};

export const ExportTypeTab = ({
	exportType, onChangeExportType
}: ExportTypeTabProps): JSX.Element => {

	// @ts-ignore
	const ExportTypeSettings: LoadableComponent = loadable(() => import(
		/* webpackChunkName: "exportType-[index]" */
		`../../plugins/exportTypes/${exportType}/${exportType}.ui`)
	);

	return (
		<div className={styles.tabContent}>
			<div className={styles.row}>
				<div className={styles.label}>Format</div>
				<div className={styles.field}>
					<div style={{ width: 180 }}>
						<Dropdown
							value={exportType}
							options={exportTypeOptions}
							onChange={({ value }: DropdownOption): any => onChangeExportType(value)}
						/>
					</div>
				</div>
			</div>
			<React.Suspense fallback={<div>loading...</div>}>
				<ExportTypeSettings
					onUpdate={() => {}}
				/>
			</React.Suspense>
		</div>
	);
};
