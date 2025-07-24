export type IImpactData = {
  totalLivesSaved: number;
  totalDonors: number;
  activeDonors: number;
  registeredUsers: number;
};

export type IMonthlyStat = {
  month: string;
  users: number;
  donors: number;
  donations: number;
  galleries: number;
  testimonials: number;
};

export type IStatsResponse = {
  impactData: IImpactData;
  statsByYear: IMonthlyStat[];
};
