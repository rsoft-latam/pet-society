import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

// Mock next/navigation
const mockPathname = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

describe("Header", () => {
  beforeEach(() => {
    mockPathname.mockReset();
  });

  it("should render logo text", () => {
    mockPathname.mockReturnValue("/");
    render(<Header />);

    expect(screen.getByText("PET-SOCIETY")).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    mockPathname.mockReturnValue("/");
    render(<Header />);

    expect(screen.getByRole("link", { name: "doggos" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "MyDoggos" })).toBeInTheDocument();
  });

  it("should have correct href on logo", () => {
    mockPathname.mockReturnValue("/");
    render(<Header />);

    const logo = screen.getByText("PET-SOCIETY").closest("a");
    expect(logo).toHaveAttribute("href", "/");
  });

  it("should have correct href on doggos link", () => {
    mockPathname.mockReturnValue("/");
    render(<Header />);

    const link = screen.getByRole("link", { name: "doggos" });
    expect(link).toHaveAttribute("href", "/");
  });

  it("should have correct href on MyDoggos link", () => {
    mockPathname.mockReturnValue("/");
    render(<Header />);

    const link = screen.getByRole("link", { name: "MyDoggos" });
    expect(link).toHaveAttribute("href", "/my-dogs");
  });

  describe("active tab states", () => {
    it("should mark doggos as active on home page", () => {
      mockPathname.mockReturnValue("/");
      render(<Header />);

      const doggosLink = screen.getByRole("link", { name: "doggos" });
      const myDoggosLink = screen.getByRole("link", { name: "MyDoggos" });

      expect(doggosLink).toHaveClass("tab-button-active");
      expect(myDoggosLink).toHaveClass("tab-button-inactive");
    });

    it("should mark doggos as active on register page", () => {
      mockPathname.mockReturnValue("/register");
      render(<Header />);

      const doggosLink = screen.getByRole("link", { name: "doggos" });
      expect(doggosLink).toHaveClass("tab-button-active");
    });

    it("should mark MyDoggos as active on my-dogs page", () => {
      mockPathname.mockReturnValue("/my-dogs");
      render(<Header />);

      const doggosLink = screen.getByRole("link", { name: "doggos" });
      const myDoggosLink = screen.getByRole("link", { name: "MyDoggos" });

      expect(doggosLink).toHaveClass("tab-button-inactive");
      expect(myDoggosLink).toHaveClass("tab-button-active");
    });
  });
});
