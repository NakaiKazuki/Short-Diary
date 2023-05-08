import { atom } from "recoil";

export const drawerAtom = atom<boolean>({
  key: "drawerAtom",
  default: false,
});
