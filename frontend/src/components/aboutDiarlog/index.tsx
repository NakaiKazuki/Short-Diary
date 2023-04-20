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

//helpers
import { scroll } from "../../helpers";
// components
import { Footer } from "../../containers/Footer";
//types
import { IAboutProps as IProps } from "../../types/components/aboutDialog";

// images
import BackImage from "../../images/sample.jpg";
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
const Category = styled.li<{ disabled: boolean }>`
  cursor: pointer;
  float: left;
  list-style: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 0.4rem;
  text-align: center;
  border: 0.0125rem solid royalblue;

  ${({ disabled }) =>
    disabled
      ? {
          "background-color": "royalblue",
          color: "white",
          "pointer-events": "none",
        }
      : { "background-color": "white" }};
  :hover {
    color: white;
    background-color: royalblue;
    transition: 0.3s;
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
  background-image: url(${BackImage});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
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
  const isDisabeld = (title: string): boolean => state.title === title;

  const hadleClick = (title: string) => {
    if (title === state.title) return;

    onCategory(title);
    scroll(ref);
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
        <AppBar
          sx={{ position: "relative" }}
          ref={ref}
          style={{ color: "royalblue", backgroundColor: "white" }}
          data-testid="appBar"
        >
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
        </AboutWrapper>
        <Footer />
      </Dialog>
    </Fragment>
  );
};
