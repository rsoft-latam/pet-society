"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { dogFormSchema, DogFormData } from "@/lib/validations";
import { createDog } from "@/actions/dogs";
import { useState, Suspense } from "react";

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const imageUrl = searchParams.get("url") || "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DogFormData>({
    resolver: zodResolver(dogFormSchema),
    defaultValues: {
      name: "",
      gender: undefined,
      comment: "",
      lastSeenDate: new Date().toISOString().split("T")[0],
      lastSeenTime: new Date().toTimeString().slice(0, 5),
    },
  });

  const onSubmit = async (data: DogFormData) => {
    if (!imageUrl) {
      setSubmitError("No image URL provided");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await createDog(imageUrl, data);

    if (result.success) {
      router.push("/my-dogs");
    } else {
      setSubmitError(result.error || "Failed to save dog");
      setIsSubmitting(false);
    }
  };

  if (!imageUrl) {
    return (
      <div className="text-center py-16">
        <div className="bg-white rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-md mx-auto">
          <p className="text-gray-500 mb-6">No dog selected</p>
          <button onClick={() => router.push("/")} className="btn-primary">
            Go back to explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Register Dog</h1>
        <p className="text-gray-500 text-lg">
          Fill in the details to add this doggo to your collection
        </p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        {/* Dog Image Preview */}
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={imageUrl}
            alt="Selected dog"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Enter dog's name"
              className="input-pill"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500 pl-4">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Gender Field - Radio Buttons */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Gender
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-3 px-5 py-3.5 bg-white border border-gray-200 rounded-full cursor-pointer hover:border-[#9C8CF0] transition-colors has-[:checked]:border-[#9C8CF0] has-[:checked]:bg-[#9C8CF0]/5">
                <input
                  {...register("gender")}
                  type="radio"
                  value="male"
                  className="w-4 h-4 text-[#9C8CF0] border-gray-300 focus:ring-[#9C8CF0]"
                />
                <span className="text-gray-700 font-medium">Male</span>
              </label>
              <label className="flex items-center gap-3 px-5 py-3.5 bg-white border border-gray-200 rounded-full cursor-pointer hover:border-[#9C8CF0] transition-colors has-[:checked]:border-[#9C8CF0] has-[:checked]:bg-[#9C8CF0]/5">
                <input
                  {...register("gender")}
                  type="radio"
                  value="female"
                  className="w-4 h-4 text-[#9C8CF0] border-gray-300 focus:ring-[#9C8CF0]"
                />
                <span className="text-gray-700 font-medium">Female</span>
              </label>
            </div>
            {errors.gender && (
              <p className="mt-2 text-sm text-red-500 pl-4">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Comment Field */}
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              Comment <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              {...register("comment")}
              id="comment"
              rows={3}
              placeholder="Add a comment about this dog..."
              className="textarea-pill"
            />
            {errors.comment && (
              <p className="mt-2 text-sm text-red-500 pl-4">
                {errors.comment.message}
              </p>
            )}
          </div>

          {/* Tag Info */}
          <div className="p-5 bg-[#D2EBD8]/30 rounded-[1.5rem] border border-[#D2EBD8]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#D2EBD8] rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600">
                A unique tag will be auto-generated when you save
              </p>
            </div>
          </div>

          {/* Date and Time Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="lastSeenDate"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Last Seen Date
              </label>
              <input
                {...register("lastSeenDate")}
                type="date"
                id="lastSeenDate"
                className="input-pill"
              />
              {errors.lastSeenDate && (
                <p className="mt-2 text-sm text-red-500 pl-4">
                  {errors.lastSeenDate.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastSeenTime"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Last Seen Time
              </label>
              <input
                {...register("lastSeenTime")}
                type="time"
                id="lastSeenTime"
                className="input-pill"
              />
              {errors.lastSeenTime && (
                <p className="mt-2 text-sm text-red-500 pl-4">
                  {errors.lastSeenTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Error */}
          {submitError && (
            <div className="p-5 bg-red-50 border border-red-100 rounded-[1.5rem]">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1"
            >
              {isSubmitting ? "Saving..." : "Save Dog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-[#9C8CF0]/20 border-t-[#9C8CF0] rounded-full animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
