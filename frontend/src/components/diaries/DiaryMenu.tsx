import React, { VFC, Fragment } from 'react';
import { MenuItem, withStyles, Menu, ListItemIcon } from '@material-ui/core';
import { MenuProps } from '@material-ui/core/Menu';
import styled from 'styled-components';

// icons
import { MenuIcon, DeleteIcon, EditIcon, VisibilityIcon } from '../Icons';

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
    backgroundColor: 'white',
    color: 'royalblue',
    borderRadius: 5,
    margin: '0 .5rem',
    '& .MuiListItemIcon-root': {
      color: 'royalblue',
    },
    '&:hover': {
      backgroundColor: 'royalblue',
      color: 'white',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
    '&:focus': {
      backgroundColor: 'royalblue',
      color: 'white',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
  },
}))(MenuItem);

const StyledMenuItemDelete = withStyles(() => ({
  root: {
    backgroundColor: 'white',
    color: 'red',
    borderRadius: 5,
    margin: '0 .5rem',
    '& .MuiListItemIcon-root': {
      color: 'red',
    },
    '&:hover': {
      backgroundColor: 'red',
      color: 'white',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
    '&:focus': {
      backgroundColor: 'red',
      color: 'white',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
  },
}))(MenuItem);

// 型
type TClickHTMLElement = React.MouseEvent<HTMLElement>;

interface IDiary {
  id: number;
  date: string;
  content: string;
  picture_url: string;
  user_id: number;
}

interface IDiaryMenuProps {
  diary: IDiary;
  currentUserId: number;
  anchorEl: HTMLElement | null;
  isOpenDiaryEdit: boolean;
  onMenuOpen(e: TClickHTMLElement): void;
  onMenuClose(): void;
  onOpenCofirmationDialog(): void;
  onDiaryEditMode(): void;
  onDiaryShowMode(): void;
}

export const DiaryMenu:VFC<IDiaryMenuProps> = ({
  diary,
  currentUserId,
  anchorEl,
  isOpenDiaryEdit,
  onMenuOpen,
  onMenuClose,
  onDiaryShowMode,
  onDiaryEditMode,
  onOpenCofirmationDialog,
}) => {
  return(
    <Fragment>
      {
        diary.user_id === currentUserId &&
          <Fragment>
            <MenuIconWrapper
              aria-haspopup='true'
              onClick={onMenuOpen}
            >
              <MenuIcon fontSize='large' />
            </MenuIconWrapper>

            <StyledMenu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={onMenuClose}
            >
              {isOpenDiaryEdit ?
                <StyledMenuItem onClick={() => onDiaryShowMode()}>
                  <ListItemIcon><VisibilityIcon /></ListItemIcon>
                    閲覧
                </StyledMenuItem>
              :
                <StyledMenuItem onClick={() => onDiaryEditMode()}>
                  <ListItemIcon><EditIcon /></ListItemIcon>
                    編集
                </StyledMenuItem>
              }
              <StyledMenuItemDelete onClick={onOpenCofirmationDialog}>
                <ListItemIcon><DeleteIcon /></ListItemIcon>
                  削除
              </StyledMenuItemDelete>
            </StyledMenu>
          </Fragment>
      }
    </Fragment>
  );
}