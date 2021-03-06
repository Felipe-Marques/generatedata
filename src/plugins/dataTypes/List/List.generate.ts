import { GenerationData, DTGenerateReturnType } from '../../../../types/dataTypes';
import { ListState } from './List.ui';
import { getRandomSubset, getRandomNum } from '../../../utils/randomUtils';
import { ExportTypeMetadata } from '../../../../types/exportTypes';

export const rowStateReducer = ({ example, listType, exactly, atMost, values }: ListState): Partial<ListState> => ({
	example, listType, exactly, atMost, values
});	

export const generate = (data: GenerationData): DTGenerateReturnType => {
	const { listType, values, exactly, atMost } = data.rowState;
	const allElements = values.split('|');

	let val = '';
	if (listType === 'EXACTLY') {
		val = getRandomSubset(allElements, exactly).join(', ');
	} else {
		// at MOST. So randomly calculate a number up to the num specified
		const numItems = getRandomNum(0, atMost);
		val = getRandomSubset(allElements, numItems).join(', ');
	}
	return { display: val };
};

export const getMetadata = (): ExportTypeMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});
