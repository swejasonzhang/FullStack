import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ItemDisplay from "./ItemDisplay";
import type { Item } from "@/types";

describe("ItemDisplay", () => {
  afterEach(() => {
    cleanup();
  });

  const item: Item = {
    id: 1,
    name: "Logitech Mouse",
    cost: 19.99,
    category: "Electronics",
    stock: 10,
    description: "A wireless mouse",
    imageUrl: "https://example.com/mouse.png",
  };

  it("renders the item name and formatted price", () => {
    render(
      <MemoryRouter>
        <ItemDisplay item={item} />
      </MemoryRouter>
    );
    expect(screen.getByText("Logitech Mouse")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });

  it("renders the item image with the name as alt text", () => {
    render(
      <MemoryRouter>
        <ItemDisplay item={item} />
      </MemoryRouter>
    );
    const image = screen.getByAltText("Logitech Mouse");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/mouse.png");
  });
});
