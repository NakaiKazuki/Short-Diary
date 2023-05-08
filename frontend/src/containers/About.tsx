import { forwardRef, FC, ReactElement, useRef, useReducer } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";
import styled from "styled-components";

//helpers
import { scroll } from "../helpers";
//types
import { initialState, aboutReducer } from "../reducers/about";
const Container = styled.div`
  min-height: 93.5vh;
  width: 90vw;
  margin: 0 auto 9vh auto;
  padding-top: 8.6vh;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 3rem;
`;

const Contents = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
`;

const Categories = styled.ul`
  padding-inline-start: 0.2rem;
  width: 60%;
  @media screen and (min-width: 980px) {
    width: 15vw;
    left: 20vh;
    position: fixed;
    li:not(:first-child) {
      margin-top: 1rem;
    }
  }
  @media screen and (max-width: 979px) {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    width: 100%;
    display: flex;
    justify-contents: center;
  }
`;

const Base = styled.li`
  cursor: pointer;
  float: left;
  list-style: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 0.4rem;
  text-align: center;
  border: 0.0125rem solid limegreen;
  :hover {
    color: white;
    background-color: limegreen;
    transition: 0.3s;
  }
  :active {
    color: white;
    background-color: limegreen;
  }
  :focus {
    outline: 0;
  }
  @media screen and (min-width: 980px) {
    border-radius: 0.5rem;
    width: 80%;
  }
  @media screen and (max-width: 979px) {
    display: block;
    width: 33.3%;
  }
`;

const Category = styled(Base)<{ disabled: boolean }>`
  ${({ disabled }) =>
    disabled
      ? {
          "background-color": "limegreen",
          color: "white",
          "pointer-events": "none",
        }
      : { "background-color": "white" }};
`;

const Main = styled.div`
  @media screen and (min-width: 980px) {
    padding-left: 20vw;
    flex: 1;
  }
  @media screen and (max-width: 979px) {
    width: 100vw;
  }
`;

const transition = forwardRef<
  unknown,
  TransitionProps & { children: ReactElement }
>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

transition.displayName = "Transition";

export const About: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(aboutReducer, initialState);
  const isDisabeld = (title: string): boolean => state.title === title;

  const hadleClick = (title: string) => {
    if (title === state.title) return;
    dispatch({ title: title });
    scroll(ref);
  };

  return (
    <Container>
      <Title data-testid="title">{state.title}</Title>
      <Contents data-testid="contents">
        <Categories data-testid="categories">
          <Category
            onClick={() => hadleClick("プロフィール他")}
            disabled={isDisabeld("プロフィール他")}
            data-testid="categoryProfile"
          >
            プロフィール他
          </Category>
          <Category
            onClick={() => hadleClick("使用技術一覧")}
            disabled={isDisabeld("使用技術一覧")}
            data-testid="categoryTool"
          >
            使用技術一覧
          </Category>
          <Category
            onClick={() => {
              hadleClick("機能その他");
            }}
            disabled={isDisabeld("機能その他")}
            data-testid="categoryFeatureList"
          >
            機能その他
          </Category>
        </Categories>
        <Main data-testid="main">{state.jsxElement}</Main>
      </Contents>
    </Container>
  );
};
