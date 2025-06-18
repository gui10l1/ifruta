import { PropsWithChildren } from "react";

interface IPriceRange {
  min: number;
  max: number;
}

export interface IFilters {
  categories: string[];
  searchFor: string;
  ratings: Rating[];
  priceRange: IPriceRange;
}

export interface IBottomSheetFilters {
  shown: boolean;
  onClose(): void;
  onConfirm?(filters: IFilters): void;
  onReset?(): void;
}

export enum Rating {
  ALL = 0,
  FIVE = 5,
  FOUR = 4,
  THREE = 3,
}

export interface IThumb {
  value: number;
}
