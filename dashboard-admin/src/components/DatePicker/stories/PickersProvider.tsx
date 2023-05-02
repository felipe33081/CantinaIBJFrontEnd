import React, {FC} from 'react';
import {ptBR} from "date-fns/locale";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

const PickersProvider = (Story: FC) => (
	<MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
		<Story />
	</MuiPickersUtilsProvider>
);

export default PickersProvider;
