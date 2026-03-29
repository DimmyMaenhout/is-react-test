import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";

import HomePage from "../../Pages/HomePage";
import { renderWithProviders } from "../test-utils";
import { fetchPosts } from "../../API/posts/posts";
import userEvent from "@testing-library/user-event";

vi.mock("../../API/posts/posts", () => ({
  fetchPosts: vi.fn(),
}));

const mockedFetchPosts = vi.mocked(fetchPosts);

describe("HomePage", () => {
  it("shows loading state initially", () => {
    mockedFetchPosts.mockReturnValue(new Promise(() => {}));

    renderWithProviders(<HomePage />);

    expect(screen.getByText(/busy fetching posts/i)).toBeInTheDocument();
  });

  it("renders posts from API", async () => {
    mockedFetchPosts.mockResolvedValue([
      { id: 1, title: "React post", body: "x", userId: 1 },
      { id: 2, title: "Vue post", body: "x", userId: 1 },
    ]);

    renderWithProviders(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("React post")).toBeInTheDocument();
    });

    expect(screen.getByText("Vue post")).toBeInTheDocument();
  });

  it("shows empty state when no posts", async () => {
    mockedFetchPosts.mockResolvedValue([]);

    renderWithProviders(<HomePage />);

    expect(await screen.findByText(/no posts found/i)).toBeInTheDocument();
  });

  it("shows error state", async () => {
    mockedFetchPosts.mockRejectedValue(new Error("API error"));

    renderWithProviders(<HomePage />);

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
  });

  it("filters posts based on search input", async () => {
    const user = userEvent.setup();

    mockedFetchPosts.mockResolvedValue([
      { id: 1, title: "React post", body: "x", userId: 1 },
      { id: 2, title: "Vue post", body: "x", userId: 1 },
    ]);

    renderWithProviders(<HomePage />);

    const input = await screen.findByPlaceholderText(/search post titles/i);

    await user.type(input, "react");

    expect(screen.getByText("React post")).toBeInTheDocument();
    expect(screen.queryByText("Vue post")).not.toBeInTheDocument();
  });

  it("clears search input when clicking X", async () => {
    const user = userEvent.setup();

    mockedFetchPosts.mockResolvedValue([
      { id: 1, title: "React post", body: "x", userId: 1 },
    ]);

    renderWithProviders(<HomePage />);

    const input = await screen.findByPlaceholderText(/search/i);

    await user.type(input, "react");

    const clearButton = screen.getByRole("button", { name: "X" });

    await user.click(clearButton);

    expect(input).toHaveValue("");
  });
});
