import { create } from "zustand";

type PreviewStore = {
  isPreview: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const usePreviewStore = create<PreviewStore>((set) => ({
  isPreview: false,
  onOpen: () => set({ isPreview: true }),
  onClose: () => set({ isPreview: false }),
}));
