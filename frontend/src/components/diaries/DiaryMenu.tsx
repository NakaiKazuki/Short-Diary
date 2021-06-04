import React, { VFC, Fragment } from "react";
import { MenuItem, withStyles, Menu, ListItemIcon } from "@material-ui/core";
import { MenuProps } from "@material-ui/core/Menu";
import styled from "styled-components";

// icons
import { MenuIcon, DeleteIcon, EditIcon, VisibilityIcon } from "../Icons";

// css

const MenuIconWrapper = styled.span`
  margin: 0 0 0 auto;
  padding: 0.6rem 0.6rem 0 0;
  color: royalblue;
  :hover {
    cursor: pointer;
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
      vertical: "top",
      horizontal: "left",
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

const StyledMenuItemDelete = withStyles(() => ({
  root: {
    backgroundColor: "white",
    color: "red",
    borderRadius: 5,
    margin: "0 .5rem",
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

// 型

interface IDiaryMenuProps {
  anchorEl: HTMLElement | null;
  isOpenDiaryEdit: boolean;
  onMenuOpen(e: React.MouseEvent<HTMLElement>): void;
  onMenuClose(): void;
  onOpenCofirmationDialog(): void;
  onDiaryEditMode(): void;
  onDiaryShowMode(): void;
}

export const DiaryMenu: VFC<IDiaryMenuProps> = ({
  anchorEl,
  isOpenDiaryEdit,
  onMenuOpen,
  onMenuClose,
  onDiaryShowMode,
  onDiaryEditMode,
  onOpenCofirmationDialog,
}) => {
  return (
    <Fragment>
      <MenuIconWrapper
        aria-haspopup="true"
        onClick={onMenuOpen}
        data-testid="menuIcon"
      >
        <MenuIcon fontSize="large" />
      </MenuIconWrapper>

      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
        data-testid="diaryMenuBar"
      >
        {isOpenDiaryEdit ? (
          <StyledMenuItem
            onClick={() => onDiaryShowMode()}
            data-testid="MenuItemDiaryShow"
          >
            <ListItemIcon>
              <VisibilityIcon data-testid="visibilityIcon" />
            </ListItemIcon>
            閲覧
          </StyledMenuItem>
        ) : (
          <StyledMenuItem
            onClick={() => onDiaryEditMode()}
            data-testid="MenuItemDiaryEdit"
          >
            <ListItemIcon>
              <EditIcon data-testid="editIcon" />
            </ListItemIcon>
            編集
          </StyledMenuItem>
        )}
        <StyledMenuItemDelete
          onClick={onOpenCofirmationDialog}
          data-testid="MenuItemDiaryDelete"
        >
          <ListItemIcon>
            <DeleteIcon data-testid="deleteIcon" />
          </ListItemIcon>
          削除
        </StyledMenuItemDelete>
      </StyledMenu>
    </Fragment>
  );
};
