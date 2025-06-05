import { PropsWithChildren, ReactNode } from "react";

export interface IIf extends PropsWithChildren {
  condition: boolean;
  otherwise?: ReactNode;
}