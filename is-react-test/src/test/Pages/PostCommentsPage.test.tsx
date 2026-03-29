import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PostCommentsPage from "../../Pages/PostCommentsPage";
import { renderWithProviders } from "../test-utils";
import { fetchPostComments } from "../../API/posts/posts";

vi.mock("../../API/posts/posts", () => ({
  fetchPostComments: vi.fn(),
}));

const mockedFetchPostComments = vi.mocked(fetchPostComments);

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("PostCommentsPage", () => {
  it("shows loading state", () => {
    mockedFetchPostComments.mockReturnValue(new Promise(() => {}));

    renderWithProviders(<PostCommentsPage />, {
      route: "/posts/1",
      postsCache: [{ id: 1, title: "React post", body: "x", userId: 1 }],
    });

    expect(screen.getByText(/fetching post comments/i)).toBeInTheDocument();
  });

  it("shows error state", async () => {
    mockedFetchPostComments.mockRejectedValue(new Error("API error"));

    renderWithProviders(<PostCommentsPage />, {
      route: "/posts/1",
      postsCache: [{ id: 1, title: "React post", body: "x", userId: 1 }],
    });

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
  });

  it("shows post not found when cache is empty", async () => {
    mockedFetchPostComments.mockResolvedValue([
      {
        id: 1,
        body: "Nice",
        postId: 1,
        email: "john.doe@email.com",
        name: "John",
      },
    ]);

    renderWithProviders(<PostCommentsPage />, {
      route: "/posts/1",
      postsCache: [],
    });

    expect(
      await screen.findByText(/couldn't find the post/i),
    ).toBeInTheDocument();
  });

  it("shows no comments state", async () => {
    mockedFetchPostComments.mockResolvedValue([]);

    renderWithProviders(<PostCommentsPage />, {
      route: "/posts/1",
      postsCache: [{ id: 1, title: "React post", body: "x", userId: 1 }],
    });

    expect(
      await screen.findByText(/no post comments found/i),
    ).toBeInTheDocument();
  });

  it("renders post + comments", async () => {
    mockedFetchPostComments.mockResolvedValue([
      {
        id: 1,
        body: "Nice post",
        postId: 1,
        email: "john.doe@email.com",
        name: "John",
      },
      {
        id: 2,
        body: "Great!",
        postId: 1,
        email: "john.doe@email.com",
        name: "John",
      },
    ]);

    renderWithProviders(<PostCommentsPage />, {
      route: "/posts/1",
      postsCache: [
        { id: 1, title: "React post", body: "Hello world", userId: 1 },
      ],
    });

    expect(await screen.findByText("React post")).toBeInTheDocument();
    expect(screen.getByText("Hello world")).toBeInTheDocument();

    expect(screen.getByText("Nice post")).toBeInTheDocument();
    expect(screen.getByText("Great!")).toBeInTheDocument();
  });

  it("navigates back on close click", async () => {
    const user = userEvent.setup();

    mockedFetchPostComments.mockResolvedValue([
      {
        id: 1,
        body: "Nice post",
        postId: 1,
        email: "john.doe@email.com",
        name: "John",
      },
    ]);

    renderWithProviders(<PostCommentsPage />, {
      route: "/posts/1",
      postsCache: [
        { id: 1, title: "React post", body: "Hello world", userId: 1 },
      ],
    });

    const button = await screen.findByRole("button", { name: /close/i });

    await user.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });
});
