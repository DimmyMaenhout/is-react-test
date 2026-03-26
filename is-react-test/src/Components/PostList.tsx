import type { Post } from "../Models/Post";
import PostItem from "./PostItem";

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <ul>
      {posts.map((post) => {
        return <PostItem key={post.id} {...post} />;
      })}
    </ul>
  );
}
