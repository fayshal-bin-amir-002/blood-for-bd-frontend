import SectionContainer from "@/components/shared/SectionContainer";
import { ShuffleHero } from "@/components/ui/shuffle-grid";

const GallerySection = () => {
  const squareData = [
    {
      id: "1",
      user_id: "user_001",
      name: "Rahim",
      image:
        "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1740&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-01T10:00:00Z"),
      updatedAt: new Date("2024-07-01T10:00:00Z"),
    },
    {
      id: "2",
      user_id: "user_002",
      name: "Karim",
      image:
        "https://images.unsplash.com/photo-1510925758641-869d353cecc7?auto=format&fit=crop&w=687&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-02T10:30:00Z"),
      updatedAt: new Date("2024-07-02T10:30:00Z"),
    },
    {
      id: "3",
      user_id: "user_003",
      name: "Sumaiya",
      image:
        "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?auto=format&fit=crop&w=687&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-03T11:00:00Z"),
      updatedAt: new Date("2024-07-03T11:00:00Z"),
    },
    {
      id: "4",
      user_id: "user_004",
      name: "Jamal",
      image:
        "https://images.unsplash.com/photo-1580238053495-b9720401fd45?auto=format&fit=crop&w=687&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-04T11:30:00Z"),
      updatedAt: new Date("2024-07-04T11:30:00Z"),
    },
    {
      id: "5",
      user_id: "user_005",
      name: "Fahmida",
      image:
        "https://images.unsplash.com/photo-1569074187119-c87815b476da?auto=format&fit=crop&w=1325&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-05T12:00:00Z"),
      updatedAt: new Date("2024-07-05T12:00:00Z"),
    },
    {
      id: "6",
      user_id: "user_006",
      name: "Arif",
      image:
        "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1740&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-06T12:30:00Z"),
      updatedAt: new Date("2024-07-06T12:30:00Z"),
    },
    {
      id: "7",
      user_id: "user_007",
      name: "Tanvir",
      image:
        "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=1740&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-07T13:00:00Z"),
      updatedAt: new Date("2024-07-07T13:00:00Z"),
    },
    {
      id: "8",
      user_id: "user_008",
      name: "Nusrat",
      image:
        "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?auto=format&fit=crop&w=1740&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-08T13:30:00Z"),
      updatedAt: new Date("2024-07-08T13:30:00Z"),
    },
    {
      id: "9",
      user_id: "user_009",
      name: "Asif",
      image:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1740&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-09T14:00:00Z"),
      updatedAt: new Date("2024-07-09T14:00:00Z"),
    },
    {
      id: "10",
      user_id: "user_010",
      name: "Jannat",
      image:
        "https://images.unsplash.com/photo-1610768764270-790fbec18178?auto=format&fit=crop&w=687&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-10T14:30:00Z"),
      updatedAt: new Date("2024-07-10T14:30:00Z"),
    },
    {
      id: "11",
      user_id: "user_011",
      name: "Nayeem",
      image:
        "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=684&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-11T15:00:00Z"),
      updatedAt: new Date("2024-07-11T15:00:00Z"),
    },
    {
      id: "12",
      user_id: "user_012",
      name: "Ruma",
      image:
        "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&w=882&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-12T15:30:00Z"),
      updatedAt: new Date("2024-07-12T15:30:00Z"),
    },
    {
      id: "13",
      user_id: "user_013",
      name: "Hasan",
      image:
        "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?auto=format&fit=crop&w=870&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-13T16:00:00Z"),
      updatedAt: new Date("2024-07-13T16:00:00Z"),
    },
    {
      id: "14",
      user_id: "user_014",
      name: "Mitu",
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=686&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-14T16:30:00Z"),
      updatedAt: new Date("2024-07-14T16:30:00Z"),
    },
    {
      id: "15",
      user_id: "user_015",
      name: "Sakib",
      image:
        "https://images.unsplash.com/photo-1606244864456-8bee63fce472?auto=format&fit=crop&w=681&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-15T17:00:00Z"),
      updatedAt: new Date("2024-07-15T17:00:00Z"),
    },
    {
      id: "16",
      user_id: "user_016",
      name: "Nabila",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1820&q=80",
      isPublished: true,
      createdAt: new Date("2024-07-16T17:30:00Z"),
      updatedAt: new Date("2024-07-16T17:30:00Z"),
    },
  ];

  return (
    <SectionContainer>
      <ShuffleHero squareData={squareData} />
    </SectionContainer>
  );
};

export default GallerySection;
