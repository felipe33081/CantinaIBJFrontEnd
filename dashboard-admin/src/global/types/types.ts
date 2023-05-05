import { ApprovalsProps, ApproversDetailsProps, DataObject } from "components/ApproversDetails/types";
import Helper from "helpers/format.helpers";
import { string } from "prop-types";
import { LEGAL_NATURE } from "../enums/information-type";

export type PaginationSelfType = {
  href: string;
  rel: string;
  method: string;
}

export type PaginatedRequest<T> = {
  page: number;
  totalPages: number;
  totalItems: number;
  paginationToken: string | null;
  data: T;
};

export type UserRefType = {
  userId: string | null;
  userIdDisplay: string | null;
  tenantDisplay: string | null;
};

export type AddressType = {
  addressName: string | null;
  zipCode: string | null;
  city: string | null;
  state: string | null;
  uf: string | null;
  ufDisplay: string | null;
  district: string | null;
  number: string | null;
  complement: string | null;
};

export type EconomicActivityCodeType = {
  code: string | null;
  description: string | null;
};

export type PersonCreditStatusType = {
  registrationNumber: string;
  validUntil: Date;
  status: string;
  reason: string;
  detailedReason: string;
  approvedLimit: number;
};

export type BankAccountTye = {
  id: string;
  createdAt: Date;
  createdBy: UserRefType;
  tenant: string;
  tenantDisplay: string;
  updatedAt: Date;
  updatedBy: UserRefType;
  bankCode: string;
  bankCodeDisplay: string;
  account: string;
  accountDigit: string;
  agency: string;
  agencyDigit: string;
  type: string;
  typeDisplay: string;
  jointAccount: boolean;
  operationTypeValue: string;
  pixKeyTypeValue: string;
  keyPix: string | null;
};

export type UploadType = {
  id: string;
  createdAt: Date;
  createdBy: UserRefType;
  tenant: string;
  tenantDisplay: string;
  updatedAt: Date;
  updatedBy: UserRefType;
  fileName: string;
  fileType: string;
  displayName: string;
  tempUrl: string;
  tempGetUrl: string;
  tempPutUrl: string
};

export type AssetsType = {
  id: string;
  createdAt: Date;
  createdBy: UserRefType;
  tenant: string;
  tenantDisplay: string;
  updatedAt: Date;
  updatedBy: UserRefType;
  assetType: string;
  assetTypeDisplay: string;
  description: string;
  registerNumber: string;
  estimatedValue: number;
  settled: boolean
}

export type PersonType = {
  id: string;
  createdAt: Date;
  createdBy: UserRefType;
  tenant: string;
  tenantDisplay: string;
  updatedAt: Date;
  updatedBy: UserRefType;
  registrationNumber: string;
  name: string;
  discriminator: string;
  riskRating: string;
  datasets: string[] | null;
};

export type RelatedBankAccountPersonType = {
  name: string;
  address: AddressType;
  phone: string;
  economicActivityCodeId: string;
  numberOfEmployees: number;
  legalNature: LEGAL_NATURE;
  averageMonthlyRevenue: number;
  documentNumber: string;
  totalIncome: number;
};

export type RelatedPersonBankAccountType = {
  id: string;
  person: PersonType;
  personId: string;
  typeOfRelationship: string;
  typeOfRelationshipDisplay: string;
  participationPercentage: number;
  isSigner: true;
  relatedToId: string
  relatedToDiscriminator: string;
  relatedToIdDisplay: string
};

export type TimelineType = {
  id: string;
  createdAt: Date;
  createdBy: UserRefType;
  tenant: string;
  tenantDisplay: string;
  updatedAt: Date;
  updatedBy: UserRefType;
  index: number;
  name: string;
  startedAt: Date;
  finishedAt: Date;
  description: string;
};

export type RouteWithIdParamsType = {
  bankAccountId: string;
};

export type PaymentType = {
  id: string;
  createdAt: Date;
  createdBy: UserRefType;
  tenant: string;
  tenantDisplay: string;
  updatedAt: Date;
  updatedBy: UserRefType;
  ownerUser: UserRefType;
  onwerGroup: UserRefType;
  nsu: string;
  amount: number;
  date: Date;
  paymentPurpose: string;
  paymentPurposeDisplay: string;
  status: string;
  statusDisplay: string;
  approvals: any[]
};

export type informationBankSlip = {
  barCode: string;
  digitableLine: string;
  value: number;
  totalValue: number;
  discount: number;
  discountValue: number;
  maximumValue: number;
  minimumValue: number;
  dueDate: Date;
  paymentDeadline: Date;
  trafficTicket?: number;
  fee?: number;
  rebateValue?: number;
};

export type ModalProps = {
  disabled?: boolean;
  buttonText?: string;
  open: boolean;
  onClick?: () => void;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  enableButton?: boolean;
  children: JSX.Element | JSX.Element[];
};

export type WarrantyType = "Vehicle" | "HomeEquity" | "JudiciaryProcess"
export type Warranty = VehicleWarranty | HomeEquityWarranty | JudiciaryProcessWarranty;

export class VehicleWarranty
implements WarrantyItem {

	constructor(obj?: VehicleWarranty) {
		this.warrantyType = "Vehicle";

		if (obj) {
			Object.assign(this, obj);
		}
	};
	title() {
		return "Veículo";
	}
	description() {
		return ` Modelo ${this.brand} ${this.color}, ano ${this.yearOfManufacture} (modelo ${this.yearOfModel}), placa ${this.board} RENAVAM ${this.renavam}`;
	};

  readonly warrantyType: WarrantyType;
  renavam?: string;
  typeOfVehicle?: string;
  chassis?: string;
  board?: string;
  taxNumberOfSupplier?: string;
  brand?: string;
  color?: string;
  model?: string;
  yearOfManufacture?: number;
  yearOfModel?: number;
  typeOfFuel?: string;

}

export class HomeEquityWarranty
implements WarrantyItem {

	constructor(obj?: HomeEquityWarranty) {
		this.warrantyType = "HomeEquity";

		if (obj) {
			Object.assign(this, obj);
		}
	};

	description() {
		return `Rua ${this.addressName}, ${this.addressNumber} ${this.complementAddress} - ${this.district} - CEP ${this.zipCodeAddress} / ${this.uf}. Registrado em ${this.registryOffice} sob matrícula ${this.registrationNumber}. Dimensões: ${this.width}x${this.length} ${this.propertyFeatures}`;
	};

	title() {
		return `Imóvel`;
	};

  warrantyType: "HomeEquity";
  registryOffice?: string;
  registrationNumber?: string;
  width?: number;
  length?: number;
  addressName?: string;
  zipCodeAddress?: string;
  uf?: string;
  district?: string;
  addressNumber?: string;
  complementAddress?: string;
  propertyFeatures?: string;
}

export class JudiciaryProcessWarranty
implements WarrantyItem {

	constructor(obj?: JudiciaryProcessWarranty) {
		this.warrantyType = "JudiciaryProcess";
		if (obj) {
			Object.assign(this, obj);
		}
	};

	description() {
		//@ts-ignore
		return `${this.typeOfProcess} nº ${this.number} - ${this.court} - ${this.claimant} vs ${this.claimed} - Valor da causa: ${Helper.formatCurrency((this.valueOfCause || 0) * 100)}`;
	};

	title() {
		return `Processo Judicial`;
	};

  warrantyType: "JudiciaryProcess";
  number?: string;
  court?: string;
  valueOfCause?: string;
  claimant?: string;
  claimed?: string;
  typeOfProcess?: string;
}

export class DefaultWarranty {

	constructor() {
		this.warrantyType = "Warranty";
	}
  warrantyType: string;
}

export interface WarrantyItem {
  warrantyType: WarrantyType;
  description(): string;
  title(): string;
}

export function mapDescription(item : any) {  
	switch (item.warrantyType) {
		case "JudiciaryProcess":
			return `${item.typeOfProcess} nº ${item.number} - ${item.court} - ${item.claimant} vs ${item.claimed} - Valor da causa: ${Helper.formatCurrency((item.valueOfCause || 0) * 100)}`;
		case "HomeEquity":
			return `Rua ${item.addressName}, ${item.addressNumber} ${item.complementAddress} - ${item.district} - CEP ${item.zipCodeAddress} / ${item.uf}. Registrado em ${item.registryOffice} sob matrícula ${item.registrationNumber}. Dimensões: ${item.width}x${item.length} ${item.propertyFeatures}`;
		case "Vehicle":
			return `Modelo ${item.brand} ${item.color}, ano ${item.yearOfManufacture} (modelo ${item.yearOfModel}), placa ${item.board} RENAVAM ${item.renavam}`;		
		default:
			return "Não identificado";
	}
}

export function mapTitle(item: any) {
	switch (item.warrantyType) {
		case "JudiciaryProcess":
			return `Processo Judicial`;
		case "HomeEquity":
			return `Imóvel`;
		case "Vehicle":
			return `Veículo`;			
		default:
			return "Não identificado";
	}

}