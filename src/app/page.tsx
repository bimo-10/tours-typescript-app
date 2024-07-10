import TitleHeader from "@/components/TitleHeader";
import TourCard from "@/components/TourCard";
import { tours } from "@/lib/data";
import Image from "next/image";
import { type Tour } from "@/lib/type";

export default function Home() {
  const getTour: Tour[] = tours;
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <TitleHeader />
      <TourCard tours={getTour} />
    </main>
  );
}
