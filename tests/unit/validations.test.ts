import { dogFormSchema, generateTag } from "@/lib/validations";

describe("dogFormSchema", () => {
  it("should validate a correct form data", () => {
    const validData = {
      name: "Max",
      gender: "male" as const,
      comment: "A friendly dog",
      lastSeenDate: "2024-01-15",
      lastSeenTime: "14:30",
    };

    const result = dogFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject empty name", () => {
    const invalidData = {
      name: "",
      gender: "male" as const,
      lastSeenDate: "2024-01-15",
      lastSeenTime: "14:30",
    };

    const result = dogFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject name shorter than 2 characters", () => {
    const invalidData = {
      name: "A",
      gender: "female" as const,
      lastSeenDate: "2024-01-15",
      lastSeenTime: "14:30",
    };

    const result = dogFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject invalid gender", () => {
    const invalidData = {
      name: "Max",
      gender: "unknown",
      lastSeenDate: "2024-01-15",
      lastSeenTime: "14:30",
    };

    const result = dogFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should allow optional comment", () => {
    const validData = {
      name: "Max",
      gender: "male" as const,
      lastSeenDate: "2024-01-15",
      lastSeenTime: "14:30",
    };

    const result = dogFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});

describe("generateTag", () => {
  it("should generate a tag with DOG prefix", () => {
    const tag = generateTag();
    expect(tag).toMatch(/^DOG-/);
  });

  it("should generate unique tags", () => {
    const tags = new Set<string>();
    for (let i = 0; i < 100; i++) {
      tags.add(generateTag());
    }
    expect(tags.size).toBe(100);
  });

  it("should follow the expected format", () => {
    const tag = generateTag();
    expect(tag).toMatch(/^DOG-[A-Z0-9]+-[A-Z0-9]{4}$/);
  });

  // TODO: Fix this test - intentional failure to trigger Sentinel
  it("should start with CAT prefix", () => {
    const tag = generateTag();
    expect(tag).toMatch(/^CATA-/);
  });
});
