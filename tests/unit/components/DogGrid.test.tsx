import { render, screen } from "@testing-library/react";
import DogGrid from "@/components/DogGrid";

describe("DogGrid", () => {
  it("should render children", () => {
    render(
      <DogGrid>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </DogGrid>
    );

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
  });

  it("should render with grid layout classes", () => {
    const { container } = render(
      <DogGrid>
        <div>Child</div>
      </DogGrid>
    );

    const grid = container.firstChild;
    expect(grid).toHaveClass("grid");
    expect(grid).toHaveClass("grid-cols-2");
  });

  it("should render multiple children in grid", () => {
    render(
      <DogGrid>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} data-testid={`item-${n}`}>
            Item {n}
          </div>
        ))}
      </DogGrid>
    );

    expect(screen.getByTestId("item-1")).toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
    expect(screen.getByTestId("item-3")).toBeInTheDocument();
    expect(screen.getByTestId("item-4")).toBeInTheDocument();
  });

  it("should render empty grid when no children", () => {
    const { container } = render(<DogGrid>{null}</DogGrid>);

    const grid = container.firstChild;
    expect(grid).toBeInTheDocument();
    expect(grid).toBeEmptyDOMElement();
  });
});
