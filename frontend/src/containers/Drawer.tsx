import { FC, Fragment, useContext } from "react";
import styled from "styled-components";
import { Box, SwipeableDrawer, List, Divider, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

// helpers
import { isLoggedIn } from "../helpers";

//contexts
import { DrawerContext } from "../contexts/Drawer";
import { AuthContext } from "../contexts/Auth";

// components
import { BaseButton } from "../components/shared_style";

// images
import mainLogo from "../images/logo.png";

const MainLogo = styled.img`
  height: 2.5rem;
  margin: 0 1rem;
`;

const ItemWrapper = styled(BaseButton)`
  margin: 0.1rem 0;
  height: 1.7rem;
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
  }
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  :visited {
    color: inherit;
  }
`;
// 型
export const Drawer: FC = () => {
  const { open, setOpenDrawer } = useContext(DrawerContext);
  const { currentUser } = useContext(AuthContext);
  return isLoggedIn(currentUser) ? (
    <Fragment key={"left"}>
      <SwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={(): void => setOpenDrawer(false)}
        onOpen={(): void => setOpenDrawer(true)}
      >
        <Box role="presentation" data-testid="MenuDrawer">
          <List>
            <CustomLink
              to="/"
              data-testid="homeLink"
              onClick={() => setOpenDrawer(false)}
            >
              <MainLogo src={mainLogo} alt="main logo" />
            </CustomLink>
            <Divider />
            <CustomLink
              to="/photoGalley"
              data-testid="photoGalleyLink"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItem children={<ItemWrapper>Photo Gallery</ItemWrapper>} />
            </CustomLink>
            <Divider />
          </List>
        </Box>
      </SwipeableDrawer>
    </Fragment>
  ) : null;
};
