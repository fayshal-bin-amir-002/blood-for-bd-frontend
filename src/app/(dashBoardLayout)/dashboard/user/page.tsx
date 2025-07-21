import UserManagement from "@/components/modules/Dashboard/User";
import { ISearchParams } from "@/types";

const UsersPage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;
  return (
    <div>
      <UserManagement query={query} />
    </div>
  );
};

export default UsersPage;
