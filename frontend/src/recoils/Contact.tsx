import { atom } from "recoil";

export const contactAtom = atom<boolean>({
  key: "contactAtom",
  default: false,
});
