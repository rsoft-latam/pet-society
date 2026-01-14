"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DogCard from "@/components/DogCard";
import DogGrid from "@/components/DogGrid";

interface DogApiResponse {
  message: string[];
  status: string;
}

export default function ExplorePage() {
  const router = useRouter();
  const [dogs, setDogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDogs() {
      try {
        const response = await fetch(
          "https://dog.ceo/api/breeds/image/random/30"
        );
        if (!response.ok) throw new Error("Failed to fetch dogs");

        const data: DogApiResponse = await response.json();
        setDogs(data.message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchDogs();
  }, []);

  const handleDogClick = (imageUrl: string) => {
    const encodedUrl = encodeURIComponent(imageUrl);
    router.push(`/register?url=${encodedUrl}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9C8CF0]/20 border-t-[#9C8CF0] rounded-full animate-spin mx-auto mb-6" />
          <p className="text-gray-500 font-medium">Loading doggos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-white rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <p className="text-xl font-semibold text-gray-900 mb-2">Oops!</p>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Explore Doggos
        </h1>
        <p className="text-gray-500 text-lg">
          Click on any dog to add it to your collection
        </p>
      </div>

      <DogGrid>
        {dogs.map((imageUrl, index) => (
          <DogCard
            key={`${imageUrl}-${index}`}
            variant="gallery"
            imageUrl={imageUrl}
            onClick={() => handleDogClick(imageUrl)}
          />
        ))}
      </DogGrid>
    </div>
  );
}
