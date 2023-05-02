export interface ApproversDetailsProps {
  data: DataObject;
}

export interface DataObject {
  approvals: ApprovalsProps[],
  errorMessage: string
}

export interface ApprovalsProps {
  actionDisplay: string,
  user: User;
  createdAt: string;
}

interface User {
	userIdDisplay: string;
}
