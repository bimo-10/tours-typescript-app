"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { type Tour } from "@/lib/type";

export default function TourCard({ tours }: { tours: Tour[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState<Tour[]>([]);
  const [readMore, setReadMore] = useState<{ [key: number]: boolean }>({});

  const handleDelete = (id: number) => {
    const newTours = datas.filter((tour) => tour.id !== id);
    setDatas(newTours);
  };

  const handleReadMore = (id: number) => {
    setReadMore({
      ...readMore,
      [id]: !readMore[id],
    });
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        setDatas(tours);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchTours();
  }, []);

  if (isLoading) {
    return <h1 className="text-center text-4xl">Loading...</h1>;
  }
  return (
    <section className="flex flex-wrap items-center gap-8">
      {datas.length === 0 ? (
        <h1 className="text-center text-4xl">No tour found</h1>
      ) : (
        datas?.map((tour) => (
          <Card key={tour.id} className="relative w-96">
            <CardHeader className="p-0">
              <Image
                src={tour.image}
                alt={tour.title}
                width={120}
                height={120}
                className="w-full h-96"
              />
              <div className="absolute top-0 right-0 p-1 mt-0 bg-teal-200">
                <p>${tour.price}</p>
              </div>
            </CardHeader>
            <CardContent className="my-8 space-y-4">
              <CardTitle className="text-center">{tour.title}</CardTitle>
              <CardDescription>
                {readMore[tour.id]
                  ? tour.desc
                  : `${tour.desc.substring(0, 100)}...`}
                <Button
                  onClick={() => handleReadMore(tour.id)}
                  variant="link"
                  className="hover:no-underline text-teal-500 p-1"
                >
                  {readMore[tour.id] ? "Show Less" : "Read More"}
                </Button>
              </CardDescription>

              <Button
                onClick={() => handleDelete(tour.id)}
                variant="outline"
                size="sm"
                className="w-full text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-white"
              >
                Not Interested
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </section>
  );
}
