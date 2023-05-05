import { FC } from "react";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// types
import { ICustomGalleryProps as IProps } from "../types/components";

const Container = styled.div`
  .image-gallery-slide-wrapper {
    height: 84.5vh;
    align-items: center;
    justify-content: center;
    display: flex;

    @media screen and (max-width: 480px) {
      height: 50vh;
      display: flex;
    }
  }

  .image-gallery-slide .image-gallery-image {
    max-height: 70vh;
  }

  .image-gallery-swipe {
    align-items: center;
    justify-content: center;
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
    cursor: pointer;
    color: limegreen;
    opacity: 0;
  }

  .image-gallery-image {
    align-items: center;
    justify-content: center;
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
        items={items}
        showNav={true}
        disableKeyDown={false}
        showPlayButton={false}
        showFullscreenButton={false}
      />
    </Container>
  );
};
