import type { Post } from "../Models/Post";

type PostItemProps = Pick<Post, "title">;

export default function PostItem({ title }: PostItemProps) {
  function onViewButtonClick() {}

  return (
    <li>
      <p>{title}</p>
      <button onClick={onViewButtonClick}>View</button>
    </li>
  );
}
