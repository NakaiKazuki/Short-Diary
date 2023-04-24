import React, { FC, Fragment } from "react";
import { MenuItem, withStyles, Menu, ListItemIcon } from "@material-ui/core";
import { MenuProps } from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import styled from "styled-components";

// icons
import { LogoutIcon, UserIcon, EditIcon } from "../icon";

// types
import { IUserMenuProps as IProps } from "../../types/components/users";

// css
const UserWrapper = styled.span`
  padding: 0.3rem 0.7rem;
  width: auto;
  margin: 0 0 0 auto;
  border: 0.0125rem solid limegreen;
  border-radius: 0.5rem;
  background-color: limegreen;
  color: white;
  letter-spacing: 0.2rem;
  :hover {
    cursor: pointer;
    background-color: white;
    color: limegreen;
  }
`;

const UserNameWrapper = styled.span`
  margin-left: 0.3rem;
  font-size: 1rem;
`;

const MenuItemLink = styled(Link)`
  text-decoration: none;
  :visited {
    color: inherit;
  }
`;

// Material Ui のMenuデザイン変更
const StyledMenu = withStyles({
  paper: {
    border: ".025rem solid white",
  },
})((props: MenuProps) => (
  <Menu
    elevation={4}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

// Material Ui のMenuItemデザイン変更
const StyledMenuItem = withStyles(() => ({
  root: {
    backgroundColor: "white",
    color: "limegreen",
    borderRadius: 5,
    margin: "0 .5rem",
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
  },
}))(MenuItem);

const StyledMenuItemLogout = withStyles(() => ({
  root: {
    backgroundColor: "white",
    color: "red",
    borderRadius: 5,
    margin: "0.5rem 0.5rem 0",
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
  },
}))(MenuItem);

export const UserMenu: FC<IProps> = ({
  anchorEl,
  userName,
  onMenuOpen,
  onMenuClose,
  onSignOut,
}) => {
  return (
    <Fragment>
      <UserWrapper
        aria-haspopup="true"
        onClick={onMenuOpen}
        data-testid="userWrapper"
      >
        <UserIcon viewBox="0 0 24 20" data-testid="userIcon" />
        <UserNameWrapper data-testid="userName">{userName}</UserNameWrapper>
      </UserWrapper>

      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
        data-testid="menuBar"
      >
        <StyledMenuItem data-testid="userEditLink">
          <MenuItemLink to="/userEdit" onClick={onMenuClose}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            ProfileEdit
          </MenuItemLink>
        </StyledMenuItem>
        <StyledMenuItemLogout onClick={onSignOut} data-testid="logoutButton">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </StyledMenuItemLogout>
      </StyledMenu>
    </Fragment>
  );
};
