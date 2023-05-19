import { RefObject } from "react";

export const scroll = (ref: RefObject<HTMLDivElement>): void | undefined =>
  ref?.current?.scrollIntoView();

// export const scroll = (
//   ref: RefObject<HTMLElement>,
//   direction?: "up" | "down"
// ): void | undefined => {
//   switch (direction) {
//     case "up":
//       return ref?.current?.scrollIntoView({
//         block: "start",
//         behavior: "smooth",
//       });
//     case "down":
//       return ref?.current?.scrollIntoView({ block: "end", behavior: "smooth" });
//     default:
//       ref?.current?.scrollIntoView();
//   }
// };
