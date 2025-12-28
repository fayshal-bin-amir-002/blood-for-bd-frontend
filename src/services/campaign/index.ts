'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';

export const createCampaign = async (payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/campaign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    revalidateTag('Campaigns', 'page');
    revalidateTag('OrganizationDetails', 'page');

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllCampaigns = async (query?: Record<string, any>) => {
  const params = new URLSearchParams(query);
  try {
    const res = await fetch(
      `${process.env.BASE_API}/campaign?${params.toString()}`,
      {
        next: { tags: ['Campaigns'] },
        cache: 'no-store',
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleCampaign = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/campaign/${id}`, {
      next: { tags: ['CampaignDetails'] },
      cache: 'no-store',
    });
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteCampaign = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/campaign/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();

    revalidateTag('Campaigns', 'page');
    revalidateTag('OrganizationDetails', 'page');

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCampaignsByOrganization = async (
  orgId: string,
  query?: Record<string, any>
) => {
  const params = new URLSearchParams(query);
  try {
    const res = await fetch(
      `${
        process.env.BASE_API
      }/campaign/organization/${orgId}?${params.toString()}`,
      {
        next: { tags: ['Campaigns'] },
        cache: 'no-store',
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
