import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useSetRecoilState } from "recoil";
import "react-image-gallery/styles/css/image-gallery.css";
// recoils
import { authAtom } from "../recoils/Auth";

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
const PhotoGalleryWrapper = styled.div`
  width: 80vw;
  min-height: 81vh;
  margin: 6.6vh auto 0 auto;
  padding-top: 5.4vh;
`;

const CircularProgressWrapper = styled.span`
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const EmptyMessageWrapper = styled.div`
  text-align: center;
  margin: 20vh auto auto auto;
  height: 17vh;
  width: 18%;
  border: 0.0125rem solid limegreen;
  border-radius: 0.5rem;
  position: relative;
  @media screen and (min-width: 768px) and (max-width: 979px) {
    width: 44%;
  }
  @media screen and (max-width: 480px) {
    height: 10rem;
    width: 100%;
  }
`;

const EmptyMessage = styled.span`
  margin-top: 50% 0;
  position: absolute;
  top: 50%;
  left: 50%;
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
    <CircularProgressWrapper>
      <CircularProgress />
    </CircularProgressWrapper>
  ) : (
    <PhotoGalleryWrapper>
      {state.items.length ? (
        <CustomGallery items={state.items} />
      ) : (
        <EmptyMessageWrapper data-testid="emptyMessage">
          <EmptyMessage>画像がありません</EmptyMessage>
        </EmptyMessageWrapper>
      )}
    </PhotoGalleryWrapper>
  );
};
