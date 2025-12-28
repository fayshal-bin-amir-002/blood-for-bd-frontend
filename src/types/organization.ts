export interface IOrganization {
  id: string;
  name: string;
  description: string;
  email: string;
  contact_number: string;
  address: string;
  division: string;
  district: string;
  logo: string | null;
  status: 'PENDING' | 'APPROVED' | 'BLOCKED';
  admin_id: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    members: number;
  };
}

export interface ICampaign {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  campaign_date: string;
}

export interface ISingleOrganization extends IOrganization {
  campaigns: ICampaign[];
  membershipInfo: {
    id: string;
    status: 'PENDING' | 'JOINED' | 'REJECTED';
    role: 'ADMIN' | 'MODERATOR' | 'MEMBER';
  } | null;
}

export interface IMember {
  id: string;
  user_id: string;
  organization_id: string;
  role: 'ADMIN' | 'MODERATOR' | 'MEMBER';
  status: 'PENDING' | 'JOINED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    phone: string;
    donor: {
      name: string;
      blood_group: string;
    } | null;
  };
}
