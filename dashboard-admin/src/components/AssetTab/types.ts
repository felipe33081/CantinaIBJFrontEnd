import {ChangeEvent, ReactNode} from "react";

export enum ASSET_TYPES {
  NONE = '',
  CASH = 'Cash',
  ACCOUNTS_RECEIVABLE = 'AccountsReceivable',
  INVENTORY = 'Inventory',
  INVESTMENTS = 'Investments',
  VEHICLES = 'Vehicles',
  FURNITURE = 'Furniture',
  PATENTS = 'Patents',
  REAL_ESTATE = 'RealEstate',
}

export type AssetType = {
  description: string;
  estimatedValue: number;
  settled: boolean;
  assetType: ASSET_TYPES;
  id?: string;
};

export type AssetTabProps = {
  assets: AssetType[];
  setAssets: (val: AssetType[]) => void;
};

export type SelectProps = {
  fields: {
    name: string;
    value: any;
  }[];
  value: any;
  onChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) => void;
  disabled?: boolean;
};

export type NumberInputProps = {
  value: number;
  disabled?: boolean;
  onChange: (val: number) => void;
};