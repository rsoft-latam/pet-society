"use server";

import { db } from "@/db";
import { dogs, Dog } from "@/db/schema";
import { dogFormSchema, DogFormData, generateTag } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function createDog(
  imageUrl: string,
  formData: DogFormData
): Promise<{ success: boolean; error?: string }> {
  if (!db) {
    return { success: false, error: "Database not available" };
  }

  try {
    // Validate form data
    const validatedData = dogFormSchema.parse(formData);

    // Generate unique tag
    const tag = generateTag();

    // Insert into database
    await db.insert(dogs).values({
      imageUrl,
      name: validatedData.name,
      gender: validatedData.gender,
      comment: validatedData.comment || null,
      tag,
      lastSeenDate: validatedData.lastSeenDate,
      lastSeenTime: validatedData.lastSeenTime,
    });

    // Revalidate the my-dogs page
    revalidatePath("/my-dogs");

    return { success: true };
  } catch (error) {
    console.error("Error creating dog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create dog",
    };
  }
}

export async function getDogs(): Promise<Dog[]> {
  if (!db) {
    return [];
  }

  try {
    const allDogs = await db.select().from(dogs);
    return allDogs;
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return [];
  }
}
