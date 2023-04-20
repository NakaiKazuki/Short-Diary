import { FC, Fragment } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import { Box, SwipeableDrawer, List, Divider, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

// recoils
import { drawerAtom } from "../recoils/Drawer";
import { authAtom } from "../recoils/Auth";

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
const DrawerContainer = styled.div`
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

export const Drawer: FC = () => {
  const currentUser = useRecoilValue(authAtom);
  const [open, setOpenDrawer] = useRecoilState(drawerAtom);

  if (!currentUser) return null;

  const handleClose = (): void => setOpenDrawer(false);

  return (
    <Fragment key={"left"}>
      <CustomSwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={(): void => setOpenDrawer(false)}
        onOpen={(): void => setOpenDrawer(true)}
        data-testid="drawer"
      >
        <Box role="presentation" data-testid="linksDrawer">
          <DrawerContainer>
            <List>
              <CustomLink to="/" data-testid="homeLink" onClick={handleClose}>
                <MainLogo src={mainLogo} alt="main logo" />
              </CustomLink>
              <Divider />
              <CustomLink
                to="/photoGalley"
                data-testid="photoGalleyLink"
                onClick={handleClose}
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
