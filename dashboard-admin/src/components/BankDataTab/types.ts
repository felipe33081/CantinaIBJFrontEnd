import { ChangeEvent } from "react";
import {AutocompleteChangeReason} from "@material-ui/lab";

export type CustomInputProps = {
  options: { name: string, value: any }[];
  value: any;
  onChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void;
  required?: boolean;
  defaultValue?: string | boolean;
  disabled?: boolean;
};

export type AutoCompleteProps = Omit<CustomInputProps, 'onChange'> & {
  onChange: (event: ChangeEvent<{}>, value: { value: any; name: any; }| null, reason: AutocompleteChangeReason) => void;
};

export type BankAccountType = {
  bankCode: string;
  type: string;
  agency: string;
  agencyDigit: string;
  account: string;
  accountDigit: string;
  id: string;
  jointAccount: boolean;
  operationTypeValue: string;
  pixKeyTypeValue: string;
  keyPix: string;
  tableData: {
    id: string;
  };
};

export type BankAccountsTabProps = {
  bankAccounts: BankAccountType[];
  setBankAccounts: (data: BankAccountType[]) => void;
  errors: any;
};
