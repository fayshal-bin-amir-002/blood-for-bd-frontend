"use client";

import SectionContainer from "@/components/shared/SectionContainer";
import { ShuffleHero } from "@/components/ui/shuffle-grid";
import { squareData } from "@/constants";
import { getAllGallery } from "@/services/gallery";
import { IGallery } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const GallerySection = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<IGallery[]>([]);

  const fetchData = async () => {
    try {
      const res = await getAllGallery();
      if (res?.success) {
        const apiData = res.data || [];

        const combined = [
          ...apiData,
          ...squareData.filter(
            (item) =>
              !apiData.some((apiItem: IGallery) => apiItem.id === item.id)
          ),
        ].slice(0, 16);

        setItems(combined);
      } else {
        setItems(squareData.slice(0, 16));
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      setItems(squareData.slice(0, 16));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SectionContainer>
      <ShuffleHero squareData={items} loading={loading} />
    </SectionContainer>
  );
};

export default GallerySection;
