import { FC } from "react";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// types
import { ICustomGalleryProps as IProps } from "../types/components";

const Container = styled.div`
  .image-gallery-slide-wrapper {
    align-items: center;
    display: flex;
    height: 84.5vh;
    justify-content: center;

    @media screen and (max-width: 480px) {
      display: flex;
      height: 50vh;
    }
  }
  .image-gallery-slide .image-gallery-image {
    height: 70vh;
    max-height: 70vh;
  }
  .image-gallery-slide {
    &-wrapper:hover {
      .image-gallery-right-nav,
      .image-gallery-left-nav {
        opacity: 1;
      }
    }
  }

  .image-gallery-right-nav,
  .image-gallery-left-nav {
    color: limegreen;
    cursor: pointer;
    opacity: 0;
  }

  .image-gallery-image {
    @media screen and (min-width: 481px) and (max-width: 980px) {
      width: 60%;
    }
    @media screen and (max-width: 480px) {
      width: 80%;
    }
  }
`;

export const CustomGallery: FC<IProps> = ({ items }) => {
  return (
    <Container data-testid="customGallery">
      <ImageGallery
        disableKeyDown={false}
        items={items}
        showFullscreenButton={false}
        showPlayButton={false}
      />
    </Container>
  );
};
