import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import OnlyStars from "./OnlyStars";

describe("OnlyStars", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders 5 star icons", () => {
    const { container } = render(<OnlyStars rating={4} />);
    expect(container.querySelectorAll('svg[data-icon="star"]')).toHaveLength(5);
  });
});
