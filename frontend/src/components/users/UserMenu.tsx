import React, { VFC, Fragment } from 'react';
import { MenuItem, withStyles, Menu, ListItemIcon } from '@material-ui/core';
import { MenuProps } from '@material-ui/core/Menu';
import styled from 'styled-components';

// icons
import { MenuIcon, EditIcon, VisibilityIcon } from '../Icons';

// css

const MenuIconWrapper = styled.span`
  margin: 0 0 0 auto;
  padding: .6rem .6rem 0 0;
  color: royalblue;
  :hover{
    cursor: pointer;
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
      vertical: 'top',
      horizontal: 'left',
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

// 型
interface IData {
  id: number;
  name: string;
  email: string;
}
interface ICurrentUser {
  id: number;
  data: IData;
}
type TClickHTMLElement = React.MouseEvent<HTMLElement>;

interface IDiaryMenuProps {
  currentUser: ICurrentUser;
  anchorEl: HTMLElement | null;
  onMenuOpen(e: TClickHTMLElement): void;
  onMenuClose(): void;
  onDiaryEditMode(): void;
  onDiaryShowMode(): void;
}

export const UserMenu:VFC<IDiaryMenuProps> = ({
  anchorEl,
  onMenuOpen,
  onMenuClose,
  onDiaryEditMode,
}) => {
  return(
    <Fragment>
      <MenuIconWrapper
        aria-haspopup="true"
        onClick={onMenuOpen}
      >
        <MenuIcon fontSize="large" />
      </MenuIconWrapper>

      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
      >
        <StyledMenuItem onClick={() => console.log("編集ボタン押された")}>
          <ListItemIcon><VisibilityIcon /></ListItemIcon>
            User Edit
        </StyledMenuItem>

        <StyledMenuItem onClick={() => onDiaryEditMode()}>
          <ListItemIcon><EditIcon /></ListItemIcon>
            Logout
        </StyledMenuItem>
      </StyledMenu>
    </Fragment>
  );
}