import { forwardRef, FC, ReactElement, Fragment, useRef } from "react";
import { TransitionProps } from "@mui/material/transitions";
import {
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

//types
import {
  IAboutProps as IProps,
} from "../../types/components/aboutDialog";
// css
const AboutWrapper = styled.div`
  width: 90vw;
  margin: 4vh auto 10vh auto;
`;

const Title = styled.h1`
  text-align: center;
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

const Category = styled.li`
  cursor: pointer;
  float: left;
  list-style: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 0.4rem;
  text-align: center;
  border: 0.0125rem solid royalblue;
  background-color: white;
  :hover {
    color: white;
    background-color: royalblue;
  }
  :active {
    color: white;
    background-color: royalblue;
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

export const AboutDialog: FC<IProps> = ({
  isOpen,
  state,
  handleClose,
  onCategory,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const hadleClick = (title: string) => {
    if (title === state.title) return;

    onCategory(title);
    ref?.current?.scrollIntoView();
  };

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={transition}
        data-testid="aboutDialog"
      >
        <AppBar sx={{ position: "relative" }} ref={ref} data-testid="appBar">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              About
            </Typography>
          </Toolbar>
        </AppBar>
        <AboutWrapper>
          <Title data-testid="title">{state.title}</Title>
          <Contents data-testid="contents">
            <Categories data-testid="categories">
              <Category
                onClick={() =>
                  hadleClick("プロフィール")
                }
                data-testid="categoryProfile"
              >
                プロフィール
              </Category>
              <Category
                onClick={() =>
                  hadleClick("使用技術一覧")
                }
                data-testid="categoryTool"
              >
                使用技術一覧
              </Category>
              <Category
                onClick={() => {
                  hadleClick("機能その他");
                }}
                data-testid="categoryFeatureList"
              >
                機能その他
              </Category>
            </Categories>
            <Main data-testid="main">{state.jsxElement}</Main>
          </Contents>
        </AboutWrapper>
      </Dialog>
    </Fragment>
  );
};
