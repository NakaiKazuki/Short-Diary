import { FC, Fragment, useContext } from "react";
import styled from "styled-components";
import { Box, SwipeableDrawer, List, Divider, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//contexts
import { DrawerContext } from "../contexts/Drawer";
import { AuthContext } from "../contexts/Auth";

// components
import { BaseButton } from "../components/shared_style";
import { PictureIcon } from "../components/icon";
// images
import mainLogo from "../images/logo.png";

const MainLogo = styled.img`
  height: 2.5rem;
  margin: 0 1rem;
`;

const CustomSwipeableDrawer = styled(SwipeableDrawer)`
  .MuiDrawer-paper {
    overflow-x: hidden;
    width: 15rem;
  }
`;
const DrawerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 15rem;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const ImageIconArea = styled(PictureIcon)`
  color: royalblue;
  margin-right: 0.7rem;
`;

const ItemWrapper = styled(BaseButton)`
  margin: 0.1rem 0;
  padding: 0.7rem;
  letter-spacing: 0.2rem;
  color: royalblue;
  background-color: white;
  border: 0.0125rem solid royalblue;
  letter-spacing: 0.2rem;
  font-size: 0.95rem;
  :hover {
    opacity: 0.8;
    background-color: royalblue;
    color: white;
    ${ImageIconArea} {
      color: white;
    }
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  :visited {
    color: inherit;
  }
`;

const variants = {
  open: {
    clipPath: "circle(150% at 0 0)",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: "circle(0% at 0 0)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Drawer: FC = () => {
  const { open, setOpenDrawer } = useContext(DrawerContext);
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return null;

  const closeDrawer = (): void => setOpenDrawer(false);

  return (
    <Fragment key={"left"}>
      <CustomSwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={(): void => setOpenDrawer(false)}
        onOpen={(): void => setOpenDrawer(true)}
        data-testid="drawer"
      >
        <Box role="presentation" data-testid="MenuDrawer">
          <DrawerContainer
            variants={variants}
            animate={open ? "open" : "closed"}
          >
            <List>
              <CustomLink to="/" data-testid="homeLink" onClick={closeDrawer}>
                <MainLogo src={mainLogo} alt="main logo" />
              </CustomLink>
              <Divider />
              <CustomLink
                to="/photoGalley"
                data-testid="photoGalleyLink"
                onClick={closeDrawer}
              >
                <ListItem>
                  <ItemWrapper>
                    <ImageIconArea />
                    Photo Gallery
                  </ItemWrapper>
                </ListItem>
              </CustomLink>
              <Divider />
            </List>
          </DrawerContainer>
        </Box>
      </CustomSwipeableDrawer>
    </Fragment>
  );
};
