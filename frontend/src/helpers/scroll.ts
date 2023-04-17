import { RefObject } from "react";

export const scroll = (ref: RefObject<HTMLDivElement>): void | undefined =>
  ref?.current?.scrollIntoView();
