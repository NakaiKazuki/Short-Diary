import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSetRecoilState } from "recoil";
import ImageGallery from "react-image-gallery";
// recoils
import { authAtom } from "../recoils/Auth";

// constants
import { HTTP_STATUS_CODE, REQUEST_STATE } from "../constants";

// apis
import { getPhotoGallery } from "../apis/diaries";
// helpers
import { removeUserCookies } from "../helpers";
// types
import { IPhotoGalleryInitialState as IInitialState } from "../types/containers";

// css
const PhotoGalleryWrapper = styled.div`
  width: 100vw;
  min-height: 81vh;
  margin-top: 6.6vh;
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

const CustomGallery = styled.div`
  margin-top: 10vh;
  overflow: hidden;
  @media screen and (max-width: 480px) {
    margin-top: 0;
  }
  .image-gallery {
    position: relative;
  }
  .image-gallery-slides {
    height: 60vh;
    white-space: nowrap;
    @media screen and (max-width: 480px) {
      height: 75vh;
    }
  }
  .image-gallery-slide,
  .image-gallery-image {
    width: 100%;
    object-fit: contain;
    align-items: center;
  }
  .image-gallery-slide {
    position: absolute;
    text-align: center;
    .right {
      visibility: hidden;
    }
  }
  .image-gallery-slide-wrapper:hover .image-gallery-right-nav {
    opacity: 1;
  }
  .image-gallery-slide-wrapper:hover .image-gallery-left-nav {
    opacity: 1;
  }
  .image-gallery-slide-wrapper:hover .image-gallery-play-button {
    opacity: 1;
  }
  .image-gallery-left-nav,
  .image-gallery-right-nav,
  .image-gallery-play-button {
    cursor: pointer;
  }
  .image-gallery-left-nav,
  .image-gallery-right-nav {
    position: absolute;
    background-color: transparent;
    border: none;
    top: 25%;
    border: none;
    width: 6%;
    height: 13.5%;
    opacity: 0;
    z-index: 1;
    @media screen and (min-width: 768px) and (max-width: 979px) {
      width: 15%;
      height: 13.5%;
      top: 20%;
    }
    @media screen and (max-width: 480px) {
      width: 20%;
      height: 13.5%;
      top: 37%;
    }
  }
  .image-gallery-right-nav {
    right: 10%;
    @media screen and (max-width: 979px) {
      right: 0;
    }
  }
  .image-gallery-left-nav {
    left: 10%;
    @media screen and (max-width: 979px) {
      left: 0;
    }
  }
  .image-gallery-play-button {
    z-index: 1;
    position: absolute;
    background-color: transparent;
    border: none;
    top: -27%;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 7%;
    height: 13.5%;
    opacity: 0;
    :hover {
      opacity: 1;
    }
    @media screen and (min-width: 768px) and (max-width: 979px) {
      width: 15%;
      height: 13.5%;
      top: -30%;
    }
    @media screen and (max-width: 480px) {
      width: 20%;
      height: 13.5%;
      top: 0;
    }
  }
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
        <CustomGallery data-testid="photGallery">
          <ImageGallery
            items={state.items}
            showNav={true}
            disableKeyDown={false}
            showFullscreenButton={false}
          />
        </CustomGallery>
      ) : (
        <EmptyMessageWrapper data-testid="emptyMessage">
          <EmptyMessage>画像がありません</EmptyMessage>
        </EmptyMessageWrapper>
      )}
    </PhotoGalleryWrapper>
  );
};
