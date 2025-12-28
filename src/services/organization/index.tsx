'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';

export const createOrganization = async (payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/organization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    revalidateTag('Organizations', 'page');
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllOrganizations = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/organization`, {
      cache: 'no-store',
    });
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getOrganizationMembers = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.BASE_API}/organization/${id}/members`,
      {
        headers: { Authorization: token },
        cache: 'no-store',
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleOrganization = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/organization/${id}`, {
      headers: { Authorization: token },
      cache: 'no-store',
    });
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const joinOrganization = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.BASE_API}/organization/join/${id}`, {
      method: 'POST',
      headers: { Authorization: token },
    });
    const result = await res.json();
    revalidateTag('OrganizationDetails', 'page');
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const approveMemberRequest = async (
  memberId: string,
  payload: FieldValues
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.BASE_API}/organization/approve-member/${memberId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    revalidateTag('Members', 'page');
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateMemberRole = async (
  memberId: string,
  payload: FieldValues
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.BASE_API}/organization/update-member-role/${memberId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    revalidateTag('Members', 'page');
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const leaveOrganization = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.BASE_API}/organization/leave/${id}`,
      {
        method: 'DELETE',
        headers: { Authorization: token },
      }
    );
    const result = await res.json();
    revalidateTag('Organizations', 'page');
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const changeOrganizationStatus = async (
  id: string,
  payload: FieldValues
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.BASE_API}/organization/admin/update-status/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    revalidateTag('Organizations', 'page');
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
