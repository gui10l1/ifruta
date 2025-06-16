import { useContext } from "react";
import { CreatePostContext } from "../contexts/CreatePostContext";

export default function useCreatePost() {
  const context = useContext(CreatePostContext);

  return context;
}