import { FC, Fragment } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import { Box, SwipeableDrawer, List, Divider, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

// atoms
import { drawerAtom } from "../atoms/Drawer";
import { authAtom } from "../atoms/Auth";

// components
import { BaseButton } from "../components/shared_style";
import { PictureIcon } from "../components/icon";

const MainLogo = styled.span`
  margin: 1rem auto;
  padding: 1.15vh 0;
  font-size: 1.7rem;
  color: limegreen;
  font-weight: bold;
  font-family: Comic Sans MS;
  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 15rem;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(PictureIcon)`
  color: limegreen;
  margin-right: 0.7rem;
`;

const ItemWrapper = styled(BaseButton)`
  margin: 0.1rem 0;
  padding: 0.7rem;
  letter-spacing: 0.2rem;
  color: limegreen;
  background-color: white;
  border: 0.0125rem solid limegreen;
  letter-spacing: 0.2rem;
  font-size: 1rem;
  :hover {
    opacity: 0.8;
    background-color: limegreen;
    color: white;
    ${Icon} {
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

const style = {
  "&.MuiDrawer-paper": {
    overflowX: "hidden",
    width: "15rem",
  },
};

export const Drawer: FC = () => {
  const currentUser = useRecoilValue(authAtom);
  const [open, setOpenDrawer] = useRecoilState(drawerAtom);

  if (!currentUser) return null;

  const handleClose = (): void => setOpenDrawer(false);

  return (
    <Fragment key={"left"}>
      <SwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={(): void => setOpenDrawer(false)}
        onOpen={(): void => setOpenDrawer(true)}
        data-testid="drawer"
        sx={style}
      >
        <Box component="div" role="presentation" data-testid="linksDrawer">
          <Container>
            <List>
              <ListItem>
                <CustomLink to="/" data-testid="homeLink" onClick={handleClose}>
                  <MainLogo>Short Diary</MainLogo>
                </CustomLink>
              </ListItem>
              <Divider />
              <CustomLink
                to="/photoGalley"
                data-testid="photoGalleyLink"
                onClick={handleClose}
              >
                <ListItem>
                  <ItemWrapper>
                    <Icon />
                    Photo Gallery
                  </ItemWrapper>
                </ListItem>
              </CustomLink>
              <Divider />
            </List>
          </Container>
        </Box>
      </SwipeableDrawer>
    </Fragment>
  );
};
