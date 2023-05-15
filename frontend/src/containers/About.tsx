import { forwardRef, FC, ReactElement, useRef, useReducer } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";
import styled from "styled-components";

//helpers
import { scroll } from "../helpers";
//types
import { initialState, aboutReducer } from "../reducers/about";
const Container = styled.div`
  margin: 0 auto 9vh auto;
  min-height: 93.5vh;
  padding-top: 8.6vh;
  width: 90vw;
`;

const Title = styled.h1`
  margin-top: 3rem;
  text-align: center;
`;

const Contents = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  position: relative;
`;

const Categories = styled.ul`
  padding-inline-start: 0.2rem;
  width: 60%;
  @media screen and (min-width: 980px) {
    left: 20vh;
    position: fixed;
    width: 15vw;
    li:not(:first-child) {
      margin-top: 1rem;
    }
  }
  @media screen and (max-width: 979px) {
    display: flex;
    justify-contents: center;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    width: 100%;
  }
`;

const Base = styled.li`
  border: 0.0125rem solid limegreen;
  cursor: pointer;
  float: left;
  list-style: none;
  margin-block-end: 0;
  margin-block-start: 0;
  padding: 0.4rem;
  text-align: center;

  :hover {
    background-color: limegreen;
    color: white;
    transition: 0.3s;
  }

  :active {
    background-color: limegreen;
    color: white;
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
          "pointer-events": "none",
          color: "white",
        }
      : { "background-color": "white" }};
`;

const Main = styled.div`
  @media screen and (min-width: 980px) {
    flex: 1;
    padding-left: 20vw;
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
