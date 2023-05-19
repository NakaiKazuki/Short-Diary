import { FC, Fragment } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import { Box, SwipeableDrawer, List, Divider, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

// atoms
import { authAtom, drawerAtom } from "../atoms";

// components
import { BaseButton } from "../components/shared_style";
import { PictureIcon } from "../components/icon";

const MainLogo = styled.span`
  color: limegreen;
  font-family: Comic Sans MS;
  font-size: 1.7rem;
  font-weight: bold;
  margin: 1rem auto;
  padding: 1.15vh 0;
  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Container = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 15rem;
`;

const Icon = styled(PictureIcon)`
  color: limegreen;
  margin-right: 0.7rem;
`;

const ItemWrapper = styled(BaseButton)`
  background-color: white;
  border: 0.0125rem solid limegreen;
  color: limegreen;
  font-size: 1rem;
  letter-spacing: 0.2rem;
  letter-spacing: 0.2rem;
  margin: 0.1rem 0;
  padding: 0.7rem;
  :hover {
    background-color: limegreen;
    color: white;
    opacity: 0.8;
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
