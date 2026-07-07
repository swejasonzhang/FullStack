import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StarRating from "./StarRating";

describe("StarRating", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders 5 star icons", () => {
    const { container } = render(
      <StarRating initialRating={3} onChange={vi.fn()} />
    );
    expect(container.querySelectorAll('svg[data-icon="star"]')).toHaveLength(5);
  });

  it("calls onChange with the clicked star value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <StarRating initialRating={3} onChange={onChange} />
    );
    const stars = container.querySelectorAll('svg[data-icon="star"]');
    await user.click(stars[3]);
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("shows a Clear control when rating > 0 and calls onChange(0)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StarRating initialRating={3} onChange={onChange} />);
    const clear = screen.getByRole("button", { name: "Clear" });
    expect(clear).toBeInTheDocument();
    await user.click(clear);
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("does not show the Clear control when rating is 0", () => {
    render(<StarRating initialRating={0} onChange={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Clear" })).toBeNull();
  });
});
