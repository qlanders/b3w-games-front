import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { ContentFragment } from '../../generated/graphql';
import placeholder from '../../common/images/placeholder/placeholder-800x300-dark.png';
import breakpoints from '../../helpers/breakpoints';
import Corner from '../Corner/Corner';
import NavigationSlider from '../NavigationSlider/NavigationSlider';
import useSliderContent from '../../hooks/useSliderContent';

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  @media only screen and (${breakpoints.md}) {
    height: 280px;
  }
`;

const LinkComp = styled(Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  background: rgba(0, 0, 0, .6);
  text-align: center;
  line-height: 45px;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 300;
  border-radius: 20px;
  @media only screen and (${breakpoints.md}) {
    line-height: 70px;
    width: 210px;
    font-size: 24px;
    border-radius: 30px;
  }
`;

const StyledCorner = styled(Corner)`
  position: absolute;
  z-index: 15;
`;

interface ISliderMain {
  tagId: string;
}

const SliderMain = ({ tagId }: ISliderMain) => {
  const [hasMore, setHasMore] = useState(true);
  const { contents, onIndexChange } = useSliderContent({
    slider: { hasMore, looped: true },
    setHasMore,
    category: 'online',
    tagId,
  });
  const [swiperInst, setSwiperInst] = useState<SwiperCore | undefined>(undefined);

  const renderItems = (items: ContentFragment[]) => items.map((slide) => {
    const cover = slide.previews?.find((preview) => preview.type === 'title_800x300')?.link;

    return (
      <SwiperSlide key={slide.id}>
        <Image
          data-src={cover ? `/gate/f/${cover}` : placeholder}
          alt=""
          className="swiper-lazy"
        />
        <LinkComp to={`/game-page/${slide.id.replace('content:', '')}`}>Играть</LinkComp>
        <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
      </SwiperSlide>
    );
  });

  return (
    <Wrapper>
      {contents && (
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={setSwiperInst}
        onRealIndexChange={onIndexChange}
        loop
        lazy={{
          loadPrevNext: true,
        }}
      >
        <NavigationSlider swiperInst={swiperInst} />
        {renderItems(contents)}
      </Swiper>
      )}
      <StyledCorner textLg="Игры" text="недели" />
    </Wrapper>
  );
};

export default SliderMain;
