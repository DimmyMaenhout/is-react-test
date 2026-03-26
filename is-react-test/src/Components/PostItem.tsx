import { useNavigate } from "react-router-dom";
import type { Post } from "../Models/Post";

type PostItemProps = Pick<Post, "title" | "id">;

export default function PostItem({ title, id }: PostItemProps) {
  const navigate = useNavigate();

  function handleButtonClick() {
    navigate(`/posts/${id}`);
  }

  return (
    <li>
      <p>{title}</p>
      <button onClick={handleButtonClick}>View</button>
    </li>
  );
}
