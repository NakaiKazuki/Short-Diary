import { FC, Fragment } from "react";
import { MenuItem, withStyles, Menu, ListItemIcon } from "@material-ui/core";
import { MenuProps } from "@material-ui/core/Menu";
import styled from "styled-components";

// icons
import { MenuOpenIcon, DeleteIcon, EditIcon, VisibilityIcon } from "../icon";

// types
import { IDiaryMenuProps as IProps } from "../../types/components/diaries";

// css
const MenuOpenIconWrapper = styled.span`
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

      <StyledMenu
        anchorEl={anchorEl}
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
