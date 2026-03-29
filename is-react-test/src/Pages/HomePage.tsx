import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/posts/posts";
import PostList from "../Components/PostList";
import { useState, type ChangeEvent } from "react";

import style from "./HomePage.module.css";

export default function HomePage() {
  const [search, setSearch] = useState<string>("");

  const { data, isPending, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

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

  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main>
      <div className={style.wrapper}>
        <input
          type="text"
          onChange={handleSearchInput}
          placeholder="search post titles"
          value={search}
        />
        {search.trim() !== "" && (
          <button onClick={() => setSearch("")}>X</button>
        )}
      </div>

      <PostList posts={filteredData} />
    </main>
  );
}
