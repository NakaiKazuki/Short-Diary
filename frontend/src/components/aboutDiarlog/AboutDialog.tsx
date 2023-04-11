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

// Head
import { Head } from "../../Head";

//types
import {
  IAboutProps as IProps,
  TMouseEvent,
} from "../../types/components/aboutDialog";
// css
const AboutWrapper = styled.div`
  width: 90vw;
  margin: 4vh auto 0 auto;
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
  min-height: 150vh;
  @media screen and (min-width: 980px) {
    padding-left: 15vw;
    float: right;
    flex: 1;
  }
  @media screen and (max-width: 979px) {
    width: 100vw;
  }
`;

const transition = forwardRef<
  unknown,
  TransitionProps & { children: ReactElement }
>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AboutDialog: FC<IProps> = ({
  isOpen,
  state,
  handleClose,
  onCategory,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const hadleCategory = (e: string) => {
    if (e === state.title) return;

    onCategory(e);
    ref?.current?.scrollIntoView();
  };

  return (
    <Fragment>
      <Head title="About" />
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
                onClick={(e: TMouseEvent) =>
                  hadleCategory(e.currentTarget.innerText)
                }
                data-testid="categoryProfile"
              >
                プロフィール
              </Category>
              <Category
                onClick={(e: TMouseEvent) =>
                  hadleCategory(e.currentTarget.innerText)
                }
                data-testid="categoryTechnology"
              >
                使用技術
              </Category>
              <Category
                onClick={(e: TMouseEvent) =>
                  hadleCategory(e.currentTarget.innerText)
                }
                data-testid="categoryFunction"
              >
                機能一覧
              </Category>
            </Categories>
            <Main data-testid="main">{state.jsxElement}</Main>
          </Contents>
        </AboutWrapper>
      </Dialog>
    </Fragment>
  );
};
