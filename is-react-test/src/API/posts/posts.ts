import type { CommentsResponse } from "../../Models/CommentsResponse";
import type { PostsResponse } from "../../Models/PostsResponse";
import { fetchFromJsonplaceholder } from "../axiosClient";

const postsEndpoint = "posts";

export const fetchPosts = () =>
  fetchFromJsonplaceholder<PostsResponse>(`${postsEndpoint}`);

export const fetchPostComments = (id: string) =>
  fetchFromJsonplaceholder<CommentsResponse>(`${postsEndpoint}/${id}/comments`);
