import { atom } from "recoil";

export const messageAtom = atom<string | undefined>({
  key: "messageAtom",
  default: undefined,
});
