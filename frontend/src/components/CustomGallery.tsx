import { FC } from "react";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// types
import { ICustomGalleryProps as IProps } from "../types/components";

const Container = styled.div`
  .image-gallery-slide-wrapper {
    height: 81vh;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 480px) {
      height: 50vh;
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
  .image-gallery-play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .image-gallery-left-nav,
  .image-gallery-right-nav,
  .image-gallery-play-button {
    cursor: pointer;
    color: limegreen;
    opacity: 0;
  }
  .image-gallery-image {
    width: 80%;
  }
`;

export const CustomGallery: FC<IProps> = ({ items }) => {
  return (
    <Container data-testid="customGallery">
      <ImageGallery
        items={items}
        showNav={true}
        disableKeyDown={false}
        showFullscreenButton={false}
      />
    </Container>
  );
};
