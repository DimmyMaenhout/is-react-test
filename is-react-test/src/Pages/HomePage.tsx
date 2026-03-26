import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/posts/posts";
import PostList from "../Components/PostList";

export default function HomePage() {
  const { data, isPending, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  console.log(data);

  if (isPending) {
    return <p>Busy fetching posts...</p>;
  }

  if (error) {
    return (
      <p>
        Something went wrong while fething the data, please try again later.
      </p>
    );
  }

  if (!data?.length) {
    return <p>No posts found.</p>;
  }

  return (
    <div>
      <input placeholder="search post titles" />
      <PostList posts={data} />
    </div>
  );
}
