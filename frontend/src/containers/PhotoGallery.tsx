import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useSetRecoilState } from "recoil";
import "react-image-gallery/styles/css/image-gallery.css";
// atoms
import { authAtom } from "../atoms/Auth";

// constants
import { HTTP_STATUS_CODE, REQUEST_STATE } from "../constants";

// apis
import { getPhotoGallery } from "../apis/diaries";

// components
import { CustomGallery } from "../components/CustomGallery";
// helpers
import { removeUserCookies } from "../helpers";

// types
import { IPhotoGalleryInitialState as IInitialState } from "../types/containers";

// css
const Container = styled.div`
  margin: 0 auto;
  min-height: 93.5vh;
  padding-top: 6.5vh;
  width: 100%;
  @media screen and (max-width: 480px) {
    padding-top: 20vh;
  }
`;

const CircularProgressContainer = styled.span`
  left: 50%;
  position: absolute;
  top: 50vh;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const MessageContainer = styled.div`
  border-radius: 0.5rem;
  border: 0.0125rem solid limegreen;
  height: 17vh;
  margin: 20vh auto auto auto;
  position: relative;
  text-align: center;
  width: 18%;

  @media screen and (min-width: 768px) and (max-width: 979px) {
    width: 44%;
  }

  @media screen and (max-width: 480px) {
    height: 10rem;
    width: 100%;
  }
`;

const Message = styled.span`
  left: 50%;
  margin-top: 50% 0;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

// エラーメッセージ
export const PhotoGallery: FC = () => {
  const setCurrentUser = useSetRecoilState(authAtom);
  const navigate = useNavigate();
  const initialState: IInitialState = {
    items: [],
    fetchState: REQUEST_STATE.INITIAL,
  };
  const [state, setState] = useState<IInitialState>(initialState);

  useEffect((): void => {
    setState({
      ...state,
      fetchState: REQUEST_STATE.LOADING,
    });
    getPhotoGallery()
      .then((data): void => {
        setState({
          ...state,
          items: data.items,
          fetchState: REQUEST_STATE.OK,
        });
      })
      .catch((e): void => {
        if (e.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
          setCurrentUser(undefined);
          removeUserCookies();
          navigate("/login", { replace: true });
        } else {
          console.error(e);
        }
      });
  }, []);

  return state.fetchState === REQUEST_STATE.LOADING ? (
    <CircularProgressContainer>
      <CircularProgress />
    </CircularProgressContainer>
  ) : (
    <Container>
      {state.items.length ? (
        <CustomGallery items={state.items} />
      ) : (
        <MessageContainer data-testid="emptyMessage">
          <Message>画像がありません</Message>
        </MessageContainer>
      )}
    </Container>
  );
};
