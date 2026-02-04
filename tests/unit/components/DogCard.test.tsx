import { render, screen, fireEvent } from "@testing-library/react";
import DogCard from "@/components/DogCard";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { src: string; alt: string }) => (
    <img src={props.src} alt={props.alt} />
  ),
}));

describe("DogCard", () => {
  describe("gallery variant", () => {
    it("should render image with correct src", () => {
      const imageUrl = "https://example.com/dog.jpg";
      render(<DogCard variant="gallery" imageUrl={imageUrl} />);

      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src", imageUrl);
    });

    it("should render as a button", () => {
      render(<DogCard variant="gallery" imageUrl="https://example.com/dog.jpg" />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should call onClick when clicked", () => {
      const handleClick = jest.fn();
      render(
        <DogCard
          variant="gallery"
          imageUrl="https://example.com/dog.jpg"
          onClick={handleClick}
        />
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should have accessible label", () => {
      render(<DogCard variant="gallery" imageUrl="https://example.com/dog.jpg" />);

      const button = screen.getByRole("button", { name: /select this dog/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe("profile variant", () => {
    const mockDog = {
      id: "123",
      imageUrl: "https://example.com/dog.jpg",
      name: "Max",
      gender: "male" as const,
      comment: "A friendly dog",
      tag: "DOG-ABC123-XYZ",
      lastSeenDate: "2024-01-15",
      lastSeenTime: "14:30",
    };

    it("should render dog name", () => {
      render(<DogCard variant="profile" dog={mockDog} />);

      expect(screen.getByText("Max")).toBeInTheDocument();
    });

    it("should render dog tag", () => {
      render(<DogCard variant="profile" dog={mockDog} />);

      expect(screen.getByText("DOG-ABC123-XYZ")).toBeInTheDocument();
    });

    it("should render gender badge for male", () => {
      render(<DogCard variant="profile" dog={mockDog} />);

      expect(screen.getByText("Male")).toBeInTheDocument();
    });

    it("should render gender badge for female", () => {
      const femaleDog = { ...mockDog, gender: "female" as const };
      render(<DogCard variant="profile" dog={femaleDog} />);

      expect(screen.getByText("Female")).toBeInTheDocument();
    });

    it("should render comment when provided", () => {
      render(<DogCard variant="profile" dog={mockDog} />);

      expect(screen.getByText("A friendly dog")).toBeInTheDocument();
    });

    it("should not render comment when not provided", () => {
      const dogWithoutComment = { ...mockDog, comment: null };
      render(<DogCard variant="profile" dog={dogWithoutComment} />);

      expect(screen.queryByText("A friendly dog")).not.toBeInTheDocument();
    });

    it("should render last seen date and time", () => {
      render(<DogCard variant="profile" dog={mockDog} />);

      expect(screen.getByText(/Last seen: 2024-01-15 at 14:30/)).toBeInTheDocument();
    });

    it("should render image with dog name as alt", () => {
      render(<DogCard variant="profile" dog={mockDog} />);

      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("alt", "Max");
    });
  });
});
