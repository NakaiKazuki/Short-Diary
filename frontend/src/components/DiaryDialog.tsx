import React, { VFC, Fragment } from 'react';
import { Dialog, MenuItem, withStyles, Menu, ListItemIcon } from '@material-ui/core';
import { MenuProps } from '@material-ui/core/Menu';
import styled from 'styled-components';

// icons
import { MenuIcon, DeleteIcon } from './Icons';

// css

const TocIconWrapper = styled.span`
  margin: 0 0 0 auto;
  padding: .6rem .6rem 0 0;
  color: royalblue;
  :hover{
    cursor: pointer;
  }
`;

const DiaryDate = styled.h2`
  text-align: center;
  color: royalblue;
  font-weight: normal;
  font-family: cursive, Century;
  width: 50%;
  margin: 0 auto .6rem auto;
`;

const DiaryContentImageWrapper = styled.div`
  min-height: 20rem;
  height: auto;
  margin: 1rem auto 2.5rem auto;
  width: 80%;
  border: .0125rem solid green;
  border-radius: .5rem;
`;

const DiaryContent = styled.div`
  white-space: pre-line;
  word-wrap: break-word;
  padding: 4% 4% 0 4%;
`;

const DiaryImage = styled.img`
  display: flex;
  margin: 1rem auto;
  height: 95%;
  width: 95%;
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
const StyledMenuItemDelete = withStyles(() => ({
  root: {
    backgroundColor: "white",
    color: "red",
    borderRadius: 5,
    margin: "0 .5rem",
    '& .MuiListItemIcon-root': {
      color: "red",
    },
    '&:hover': {
      backgroundColor: "red",
      color: "white",
      '& .MuiListItemIcon-root': {
        color: "white",
      },
    },
    '&:focus': {
      backgroundColor: "red",
      color: "white",
      '& .MuiListItemIcon-root': {
        color: "white",
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

interface IDiaryDialogProps {
  isOpen: boolean;
  diary: IDiary;
  currentUserId: number;
  anchorEl: HTMLElement | null;
  onDeleteDiary(diary: IDiary): void;
  onClose(): void;
  menuOpen(event: TClickHTMLElement): void;
  onMenuClose(): void;
}

export const DiaryDialog:VFC<IDiaryDialogProps> = ({
  isOpen,
  diary,
  currentUserId,
  anchorEl,
  onDeleteDiary,
  onClose,
  menuOpen,
  onMenuClose,
}) => {
  return(
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={"sm"}
      fullWidth
    >
    {
      diary.user_id === currentUserId &&
        <Fragment>
          <TocIconWrapper
            aria-haspopup="true"
            onClick={menuOpen}
          >
            <MenuIcon fontSize="large" />
          </TocIconWrapper>

          <StyledMenu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onMenuClose}
          >
          <StyledMenuItemDelete onClick={() => onDeleteDiary(diary)}>
            <ListItemIcon><DeleteIcon /></ListItemIcon>
              削除
          </StyledMenuItemDelete>
          </StyledMenu>
        </Fragment>
    }
      <DiaryDate >{diary.date}</DiaryDate>
      <DiaryContentImageWrapper>
        <DiaryContent>{diary.content}</DiaryContent>
        {
          diary.picture_url &&
          <DiaryImage
            src={diary.picture_url} alt="日記 画像"
          />
        }
      </DiaryContentImageWrapper>
    </Dialog>
  );
}