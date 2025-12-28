export interface ICampaign {
  id: string;
  organization_id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  campaign_date: string;
  createdAt: string;
  updatedAt: string;
  organization: {
    id: string;
    name: string;
    logo: string;
    division: string;
    district: string;
  };
}

export interface ICampaignResponse {
  success: boolean;
  message: string;
  data: ICampaign[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
