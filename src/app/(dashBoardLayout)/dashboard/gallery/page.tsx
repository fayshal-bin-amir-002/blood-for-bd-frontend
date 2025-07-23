import GalleryManegement from "@/components/modules/Dashboard/gallery";
import { ISearchParams } from "@/types";

const GalleryPage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;
  return (
    <div>
      <GalleryManegement query={query} />
    </div>
  );
};

export default GalleryPage;
