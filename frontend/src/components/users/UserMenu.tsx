import React, { VFC, Fragment } from 'react';
import { MenuItem, withStyles, Menu, ListItemIcon } from '@material-ui/core';
import { MenuProps } from '@material-ui/core/Menu';
import styled from 'styled-components';

// icons
import { LogoutIcon,UserIcon } from '../Icons';

// css
const UserIconWrapper = styled.span`
  padding: .3rem .7rem;
  width: auto;
  margin: 0 0 0 auto;
  border: .0125rem solid #22a398;
  border-radius: .5rem;
  background-color: white;
  color: #22a398;
  letter-spacing: .2rem;
  :hover {
    cursor: pointer;
    background-color: #22a398;
    color: white;
  }
`;

// Material Ui のMenuデザイン変更
const StyledMenu = withStyles({
  paper: {
    border: '.025rem solid white',
  },
})((props: MenuProps) => (
  <Menu
    elevation={4}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

// Material Ui のMenuItemデザイン変更
const StyledMenuItem = withStyles(() => ({
  root: {
    backgroundColor: "white",
    color: "royalblue",
    borderRadius: 5,
    margin: "0 .5rem",
    '& .MuiListItemIcon-root': {
      color: "royalblue",
    },
    '&:hover': {
      backgroundColor: "royalblue",
      color: "white",
      '& .MuiListItemIcon-root': {
        color: "white",
      },
    },
    '&:focus': {
      backgroundColor: "royalblue",
      color: "white",
      '& .MuiListItemIcon-root': {
        color: "white",
      },
    },
  },
}))(MenuItem);

type TClickHTMLElement = React.MouseEvent<HTMLElement>;

interface IDiaryMenuProps {
  anchorEl: HTMLElement | null;
  onMenuOpen(e: TClickHTMLElement): void;
  onMenuClose(): void;
  onSignOut(): void;
}

export const UserMenu:VFC<IDiaryMenuProps> = ({
  anchorEl,
  onMenuOpen,
  onMenuClose,
  onSignOut,
}) => {
  return(
    <Fragment>
      <UserIconWrapper
        aria-haspopup="true"
        onClick={onMenuOpen}
      >
        <UserIcon viewBox="0 0 24 20" data-testid="userIcon"/>
      </UserIconWrapper>

      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
        data-testid="menuBar"
      >
        <StyledMenuItem onClick={onSignOut} data-testid="logoutButton">
          <ListItemIcon><LogoutIcon /></ListItemIcon>
            Logout
        </StyledMenuItem>
      </StyledMenu>
    </Fragment>
  );
}