import { useNavigate } from "react-router-dom";
import type { Post } from "../Models/Post";

import styles from "./PostItem.module.css";

type PostItemProps = Pick<Post, "title" | "id">;

export default function PostItem({ title, id }: PostItemProps) {
  const navigate = useNavigate();

  function handleButtonClick() {
    navigate(`/posts/${id}`);
  }

  return (
    <li>
      <div className={styles.postItem}>
        <p>{title}</p>
        <button onClick={handleButtonClick}>View</button>
      </div>
    </li>
  );
}
