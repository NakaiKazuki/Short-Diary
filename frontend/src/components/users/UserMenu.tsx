import React, { VFC, Fragment } from "react";
import { MenuItem, withStyles, Menu, ListItemIcon } from "@material-ui/core";
import { MenuProps } from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import styled from "styled-components";

// icons
import { LogoutIcon, UserIcon, EditIcon } from "../Icons";

// css
const UserWrapper = styled.span`
  padding: 0.3rem 0.7rem;
  width: auto;
  margin: 0 0 0 auto;
  border: 0.0125rem solid #22a398;
  border-radius: 0.5rem;
  background-color: white;
  color: #22a398;
  letter-spacing: 0.2rem;
  :hover {
    cursor: pointer;
    background-color: #22a398;
    color: white;
  }
`;

const UserNameWrapper = styled.span`
  margin-left: 0.3rem;
  font-size: 0.8rem;
`;

const MenuItemLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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
    color: "green",
    borderRadius: 5,
    margin: "0 .5rem",
    "& .MuiListItemIcon-root": {
      color: "green",
    },
    "&:hover": {
      backgroundColor: "green",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&:focus": {
      backgroundColor: "green",
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
    color: "royalblue",
    borderRadius: 5,
    margin: "0 .5rem",
    "& .MuiListItemIcon-root": {
      color: "royalblue",
    },
    "&:hover": {
      backgroundColor: "royalblue",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&:focus": {
      backgroundColor: "royalblue",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
  },
}))(MenuItem);

interface IDiaryMenuProps {
  anchorEl: HTMLElement | null;
  currentUserName: string;
  onMenuOpen(e: React.MouseEvent<HTMLElement>): void;
  onMenuClose(): void;
  onSignOut(): void;
}

export const UserMenu: VFC<IDiaryMenuProps> = ({
  anchorEl,
  currentUserName,
  onMenuOpen,
  onMenuClose,
  onSignOut,
}) => {
  return (
    <Fragment>
      <UserWrapper aria-haspopup="true" onClick={onMenuOpen} data-testid="userWrapper">
        <UserIcon viewBox="0 0 24 20" data-testid="userIcon" />
        <UserNameWrapper data-testid="userName">{currentUserName}</UserNameWrapper>
      </UserWrapper>

      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
        data-testid="menuBar"
      >
        <StyledMenuItem data-testid="userEditLink">
          <MenuItemLink to="/userEdit">
            <ListItemIcon children={<EditIcon />} />
            ProfileEdit
          </MenuItemLink>
        </StyledMenuItem>
        <StyledMenuItemLogout onClick={onSignOut} data-testid="logoutButton">
          <ListItemIcon children={<LogoutIcon />} />
          Logout
        </StyledMenuItemLogout>
      </StyledMenu>
    </Fragment>
  );
};
