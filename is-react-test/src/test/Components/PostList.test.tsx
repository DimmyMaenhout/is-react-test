import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PostList from "../../Components/PostList";

vi.mock("../../Components/PostItem", () => ({
  default: ({ title }: { title: string }) => <li>{title}</li>,
}));

describe("PostList", () => {
  it("renders all posts", () => {
    render(
      <PostList
        posts={[
          { id: 1, title: "React post", body: "Body 1", userId: 1 },
          { id: 2, title: "Vue post", body: "Body 2", userId: 1 },
        ]}
      />,
    );

    expect(screen.getByText("React post")).toBeInTheDocument();
    expect(screen.getByText("Vue post")).toBeInTheDocument();
  });

    it("renders correct number of posts", () => {
      render(
        <PostList
          posts={[
            { id: 1, title: "React post", body: "Body 1", userId: 1 },
            { id: 2, title: "Vue post", body: "Body 2", userId: 1 },
            { id: 3, title: "Angular post", body: "Body 3", userId: 1 },
          ]}
        />
      );

      expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });

    it("renders empty list when no posts", () => {
      render(<PostList posts={[]} />);

      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
});
