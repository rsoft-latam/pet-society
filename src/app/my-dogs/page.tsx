import { getDogs } from "@/actions/dogs";
import DogCard from "@/components/DogCard";
import DogGrid from "@/components/DogGrid";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MyDogsPage() {
  const dogs = await getDogs();

  if (dogs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-white rounded-[2rem] p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-md">
          <div className="w-20 h-20 bg-[#D2EBD8] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            No dogs registered yet
          </h2>
          <p className="text-gray-500 mb-8">
            Start exploring and add your first doggo to the collection!
          </p>
          <Link href="/" className="btn-primary inline-block">
            Explore Doggos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">My Doggos</h1>
          <p className="text-gray-500 text-lg">
            Your personal collection of adorable dogs
          </p>
        </div>
        <div className="px-5 py-2.5 bg-[#D2EBD8] rounded-full">
          <span className="font-semibold text-gray-700">
            {dogs.length} {dogs.length === 1 ? "dog" : "dogs"}
          </span>
        </div>
      </div>

      <DogGrid>
        {dogs.map((dog) => (
          <DogCard key={dog.id} variant="profile" dog={dog} />
        ))}
      </DogGrid>
    </div>
  );
}
