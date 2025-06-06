import { IIf } from "./interfaces";

export default function If({ condition, children, otherwise }: IIf) {
  if (condition) return children;

  return otherwise;
}