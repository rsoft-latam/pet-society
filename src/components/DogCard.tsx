"use client";

import Image from "next/image";
import { Dog } from "@/db/schema";

type DogCardProps =
  | {
      variant: "gallery";
      imageUrl: string;
      onClick?: () => void;
    }
  | {
      variant: "profile";
      dog: Dog;
    };

export default function DogCard(props: DogCardProps) {
  if (props.variant === "gallery") {
    return (
      <button
        type="button"
        className="dog-card-gallery aspect-[4/5] w-full group"
        onClick={props.onClick}
        aria-label="Select this dog"
      >
        <Image
          src={props.imageUrl}
          alt="Dog"
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover rounded-[2rem]"
          priority={false}
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]" />
        {/* Click indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-sm font-medium text-gray-800">Select</span>
        </div>
      </button>
    );
  }

  // Profile variant
  const { dog } = props;

  return (
    <div className="dog-card-profile">
      <div className="relative aspect-[4/5]">
        <Image
          src={dog.imageUrl}
          alt={dog.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        {/* Tag badge overlay */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
          <span className="text-xs font-mono font-medium text-[#9C8CF0]">
            {dog.tag}
          </span>
        </div>
        {/* Gender badge */}
        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${
          dog.gender === "male"
            ? "bg-blue-100/90 text-blue-700"
            : "bg-pink-100/90 text-pink-700"
        } backdrop-blur-sm`}>
          <span className="text-xs font-medium">
            {dog.gender === "male" ? "Male" : "Female"}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900">{dog.name}</h3>

        {/* Comment */}
        {dog.comment && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {dog.comment}
          </p>
        )}

        {/* Last seen */}
        <div className="flex items-center gap-2 pt-2">
          <div className="w-2 h-2 bg-[#D2EBD8] rounded-full" />
          <span className="text-sm text-gray-400">
            Last seen: {dog.lastSeenDate} at {dog.lastSeenTime}
          </span>
        </div>
      </div>
    </div>
  );
}
