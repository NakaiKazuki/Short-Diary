import React, { FC, Fragment } from "react";
import { MenuItem, Menu, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

// icons
import { LogoutIcon, UserIcon, EditIcon } from "../icon";

// types
import { IUserMenuProps as IProps } from "../../types/components/users";

// css
const Container = styled.span`
  padding: 0.3rem 0.7rem;
  width: auto;
  margin: 0 0 0 auto;
  border: 0.0125rem solid limegreen;
  border-radius: 0.5rem;
  background-color: white;
  color: limegreen;
  letter-spacing: 0.2rem;
  :hover {
    cursor: pointer;
    background-color: limegreen;
    color: white;
    transition: 0.25s;
  }
`;

const UserNameWrapper = styled.span`
  margin-left: 0.3rem;
  font-size: 0.8rem;
  font-family: Comic Sans MS;
`;

const MenuItemLink = styled(Link)`
  text-decoration: none;
  :visited {
    color: inherit;
  }
`;

// Material Ui のMenuデザイン変更
const styledMenu = {
  paper: {
    border: ".025rem solid white",
  },
};

// Material Ui のMenuItemデザイン変更
const styledMenuItem = {
  backgroundColor: "white",
  color: "limegreen",
  borderRadius: 2,
  margin: "0.5rem 0.5rem 0",
  fontFamily: "Comic Sans MS",
  "& .MuiListItemIcon-root": {
    color: "limegreen",
  },
  "&:hover": {
    backgroundColor: "limegreen",
    color: "white",
    "& .MuiListItemIcon-root": {
      color: "white",
    },
  },
  "&:focus": {
    backgroundColor: "limegreen",
    color: "white",
    "& .MuiListItemIcon-root": {
      color: "white",
    },
  },
};

const styledMenuItemLogout = {
  backgroundColor: "white",
  color: "red",
  borderRadius: 2,
  margin: "0.5rem 0.5rem 0",
  fontFamily: "Comic Sans MS",
  "& .MuiListItemIcon-root": {
    color: "red",
  },
  "&:hover": {
    backgroundColor: "red",
    color: "white",
    "& .MuiListItemIcon-root": {
      color: "white",
    },
  },
  "&:focus": {
    backgroundColor: "red",
    color: "white",
    "& .MuiListItemIcon-root": {
      color: "white",
    },
  },
};

export const UserMenu: FC<IProps> = ({
  anchorEl,
  userName,
  onMenuOpen,
  onMenuClose,
  onSignOut,
}) => {
  return (
    <Fragment>
      <Container
        aria-haspopup="true"
        onClick={onMenuOpen}
        data-testid="userWrapper"
      >
        <UserIcon viewBox="0 0 24 20" data-testid="userIcon" />
        <UserNameWrapper data-testid="userName">{userName}</UserNameWrapper>
      </Container>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
        elevation={4}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={styledMenu}
        data-testid="menuBar"
      >
        <MenuItem sx={styledMenuItem} data-testid="userEditLink">
          <MenuItemLink to="/userEdit" onClick={onMenuClose}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            ProfileEdit
          </MenuItemLink>
        </MenuItem>
        <MenuItem
          onClick={onSignOut}
          sx={styledMenuItemLogout}
          data-testid="logoutButton"
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
