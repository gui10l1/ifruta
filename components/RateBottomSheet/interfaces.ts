export interface IRateBottomSheet {
  shown: boolean;
  onClose?(): void;
  onRate?(rating: number): void;
  rating: number;
}