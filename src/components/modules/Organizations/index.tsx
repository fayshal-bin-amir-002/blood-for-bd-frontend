'use client';

import { getAllOrganizations } from '@/services/organization';
import { useEffect, useState } from 'react';
import { IOrganization } from '@/types/organization';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';

const OrganizationsComponent = ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllOrganizations();
        if (res?.success) {
          setOrganizations(res.data);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="border rounded-xl p-4 space-y-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <Link href={`/organization/${org.id}`} key={org.id}>
            <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative h-40 w-full bg-gray-100">
                {org.logo ? (
                  <Image
                    src={org.logo}
                    alt={org.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Logo
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg line-clamp-1">{org.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1 mb-3">
                  {org.description}
                </p>

                <div className="flex items-center justify-between text-xs font-medium text-gray-600 border-t pt-3">
                  <span>
                    {org.district}, {org.division}
                  </span>
                  <span className="bg-red-50 text-red-600 px-2 py-1 rounded-full">
                    {org._count.members} Members
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!loading && organizations.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No organizations found.
        </div>
      )}
    </div>
  );
};

export default OrganizationsComponent;
