import { FC, Fragment } from "react";
import { MenuItem, Menu, ListItemIcon } from "@mui/material";
import styled from "styled-components";

// icons
import { MenuOpenIcon, DeleteIcon, EditIcon, VisibilityIcon } from "../icon";

// types
import { IDiaryMenuProps as IProps } from "../../types/components/diaries";

// css
const MenuOpenIconWrapper = styled.span`
  color: limegreen;
  margin: 0 0 0 auto;
  padding: 0.6rem 0.6rem 0 0;
  :hover {
    cursor: pointer;
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
  borderRadius: 2,
  color: "limegreen",
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
};

const styledMenuItemDelete = {
  backgroundColor: "white",
  borderRadius: 2,
  color: "red",
  margin: "0.5rem 0.5rem 0 0.5rem",
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

export const DiaryMenu: FC<IProps> = ({
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
      <MenuOpenIconWrapper
        aria-haspopup="true"
        onClick={onMenuOpen}
        data-testid="menuOpenIcon"
      >
        <MenuOpenIcon fontSize="large" />
      </MenuOpenIconWrapper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
        elevation={4}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={styledMenu}
        data-testid="diaryMenuBar"
      >
        {isOpenDiaryEdit ? (
          <MenuItem
            onClick={() => onDiaryShowMode()}
            sx={styledMenuItem}
            data-testid="MenuItemDiaryShow"
          >
            <ListItemIcon>
              <VisibilityIcon data-testid="visibilityIcon" />
            </ListItemIcon>
            閲覧
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => onDiaryEditMode()}
            sx={styledMenuItem}
            data-testid="MenuItemDiaryEdit"
          >
            <ListItemIcon>
              <EditIcon data-testid="editIcon" />
            </ListItemIcon>
            編集
          </MenuItem>
        )}
        <MenuItem
          onClick={onOpenCofirmationDialog}
          sx={styledMenuItemDelete}
          data-testid="MenuItemDiaryDelete"
        >
          <ListItemIcon>
            <DeleteIcon data-testid="deleteIcon" />
          </ListItemIcon>
          削除
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
