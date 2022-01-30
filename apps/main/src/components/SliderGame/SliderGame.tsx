import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore from 'swiper';
import { PreviewFragment } from '../../generated/graphql';
import NavigationSlider from '../NavigationSlider/NavigationSlider';

const Wrapper = styled.div`
  .swiper-slide {
    box-shadow: 0 0 20px rgba(0,0,0, .8);
  }
`;
const Main = styled.div`
  .swiper {
    padding: 30px 10px;
    margin: -30px 0 -20px;
  }
`;
const thumbsHorizontal = css`
  .swiper {
    left: -32.9%;
  }
  .swiper-pagination {
    right: -32.9% !important;
  }
`;
const thumbsVertical = css`
  .swiper {
    left: -37%;
  }
  .swiper-pagination {
    right: -37% !important;
  }
`;
const Thumbs = styled.div<{ $type: 'vertical' | 'horizontal' }>`
  .swiper {
    padding: 10px 10px 30px;
    overflow: visible !important;
  }
  .swiper-pagination {
    display: flex;
    height: 10px;
    bottom: 0 !important;
    width: 100vw !important;
    max-width: 720px;
    transform: none !important;
    left: auto !important;
    &-bullet {
      flex: 1 0 auto;
      border-radius: 0;
      margin: 0 !important;
      height: 10px;
      background: #224251;
      border: 1px solid #224251;
      opacity: 1;
      &-active {
        background: #9afef2;
        border: 1px solid #224251;
      }
    }
  }
  ${({ $type }) => $type === 'horizontal' && thumbsHorizontal}
  ${({ $type }) => $type === 'vertical' && thumbsVertical}
`;
const Img = styled.img`
  display: block;
  height: auto;
  width: 100%;
`;

export interface ISliderGame {
  previews: PreviewFragment[];
  className?: string;
}

const SliderGame = ({
  previews,
  className,
}: ISliderGame) => {
  const { pathname } = useLocation();
  const [mainSwiperCore, setMainSwiperCore] = useState<SwiperCore | undefined>(undefined);
  const [thumbsSwiperCore, setThumbsSwiperCore] = useState<SwiperCore | undefined>(undefined);
  const previewsHorizontal = previews.filter(({ type }) => type === 'screens_800x480');
  const previewsVertical = previews.filter(({ type }) => type === 'screens_480x800');
  const previewsToRender = previewsVertical.length ? previewsVertical : previewsHorizontal;

  useEffect(() => {
    mainSwiperCore?.slideTo(0);
  }, [pathname]);

  if (!previewsToRender.length) return null;

  const renderSlides = (pre: PreviewFragment[]) => (
    pre.map(({ id, link }) => (
      <SwiperSlide key={id}>
        <Img src={`/gate/f/${link}`} alt="" />
      </SwiperSlide>
    )));

  return (
    <Wrapper className={className}>
      <Main>
        <Swiper
          slidesPerView={previewsVertical.length ? 2 : 1}
          spaceBetween={10}
          onSwiper={setMainSwiperCore}
          controller={{ control: thumbsSwiperCore }}
        >
          {renderSlides(previewsToRender)}
          <NavigationSlider swiperInst={mainSwiperCore} type="game" />
        </Swiper>
      </Main>
      <Thumbs $type={previewsVertical.length ? 'vertical' : 'horizontal'}>
        <Swiper
          spaceBetween={10}
          slidesPerView={previewsVertical.length ? 3 : 2}
          touchRatio={0.2}
          slideToClickedSlide
          centeredSlides
          pagination
          onSwiper={setThumbsSwiperCore}
          controller={{ control: mainSwiperCore }}
          breakpoints={{
            520: {
              slidesPerView: previewsVertical.length ? 4 : 3,
            },
          }}
        >
          {renderSlides(previewsToRender)}
        </Swiper>
      </Thumbs>
    </Wrapper>
  );
};

SliderGame.defaultProps = {
  className: '',
};

export default SliderGame;
