import { describe, expect, it } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import PostItem from "../../Components/PostItem";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("PostItem", () => {
  it("renders the post title", () => {
    render(<PostItem id={1} title="Test post" />);

    expect(screen.getByText("Test post")).toBeInTheDocument();
  });

  it("navigates to post detail when clicking the button", async () => {
    render(<PostItem id={1} title="Test post" />);

    const button = screen.getByRole("button", { name: /view/i });

    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/posts/1");
  });
});
