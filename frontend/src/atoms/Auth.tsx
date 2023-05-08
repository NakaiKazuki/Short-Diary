import { atom } from "recoil";
export const authAtom = atom<ICurrentUser | undefined>({
  key: "authAtom",
  default: undefined,
});
