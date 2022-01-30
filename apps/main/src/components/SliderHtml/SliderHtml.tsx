import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Link } from 'react-router-dom';
import { ContentFragment } from '../../generated/graphql';
import placeholder from '../../common/images/placeholder/dark-bg_240x320.png';
import breakpoints from '../../helpers/breakpoints';
import useSliderContent from '../../hooks/useSliderContent';

const containerLight = css`
  background: #9afef2;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
`;

const Wrapper = styled.div`
  width: 100%;
  padding-top: 15px;
  @media only screen and (${breakpoints.md}) {
      padding-top: 35px;
  }
`;

const Container = styled.div<{ $darkTheme: boolean }>`
  width: 140%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 0 25px;
  @media only screen and (${breakpoints.md}) {
      padding: 0 0 40px;
  }
  ${({ $darkTheme }) => !$darkTheme && containerLight}
  & .swiper {
    padding: 15px 0 30px;
    @media only screen and (${breakpoints.md}) {
        padding: 20px 0 30px;
    }
  }
  .swiper-wrapper {
    align-items: stretch;
  }
  .swiper-slide {
    position: relative;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.5);
    overflow: hidden;
    user-select: none;
    height: auto;
    background: #224251;
  }
  .swiper-pagination {
    display: flex;
    height: 10px;
    bottom: 0 !important;
  }
  .swiper-pagination-bullet {
    flex: 1 0 auto;
    border-radius: 0;
    margin: 0 !important;
    height: 8px;
    background: #224251;
    border: 1px solid #224251;
    opacity: 1;
    @media only screen and (${breakpoints.md}) {
        height: 10px;
    }
    &-active {
      background: #9afef2;
      border: 1px solid #224251;
    }
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  object-fit: contain;
  width: 100%;
  height: auto;
  z-index: 1;
`;

const LinkComp = styled(Link)<{ $darkTheme: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: ${({ $darkTheme }) => ($darkTheme
    ? 'linear-gradient(180deg, rgba(37,53,70,0) 50%, rgba(37,53,70,0.5) 65%, rgba(37,53,70,0.66) 75%, rgb(37,53,70) 100%)'
    : 'linear-gradient(180deg, rgba(155,254,242,0) 50%, rgba(155,254,242,0.5) 65%, rgba(155,254,242,0.66) 75%, rgb(155,254,242) 100%)}')}
  }
  &:before {
    content: '';
    display: block;
    height: 0;
    padding-top: 134%;
  }
`;

const Text = styled.div<{ $darkTheme: boolean }>`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  line-height: .85;
  padding: 0 5px 15px;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  color: ${({ $darkTheme }) => ($darkTheme ? 'inherit' : '#243545')};
  z-index: 3;
  @media only screen and (${breakpoints.md}) {
    font-size: 24px;
    padding: 0 10px 15px;
  }
`;

const Tag = styled.span`
  font-size: 14px;
  text-transform: none;
  @media only screen and (${breakpoints.md}) {
      font-size: 18px;
  }
`;

interface ISliderHtml {
  className?: string;
  tagId: string;
  darkTheme?: boolean;
}

const SliderHtml = ({
  className,
  tagId,
  darkTheme = false,
}: ISliderHtml) => {
  const [hasMore, setHasMore] = useState(true);
  const { contents, onIndexChange } = useSliderContent({
    category: 'online',
    tagId,
    slider: { hasMore, looped: true },
    setHasMore,
    limit: 10,
  });

  const renderItems = (items: ContentFragment[]) => items.map(({
    id, name, previews, tags,
  }) => {
    const cover = previews?.find((i) => i.type === 'screens_240x320')?.link;
    const tag = tags?.find((i) => i.name === 'tag')?.displayName;

    return (
      <SwiperSlide key={id}>
        <LinkComp to={`/game-page/${id.replace('content:', '')}`} $darkTheme={darkTheme}>
          <Image
            alt=""
            data-src={cover ? `/gate/f/${cover}` : placeholder}
            className="swiper-lazy"
          />
        </LinkComp>
        <Text $darkTheme={darkTheme}>
          {name}
          <br />
          <Tag>
            #
            {tag}
          </Tag>
        </Text>
        <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
      </SwiperSlide>
    );
  });

  return (
    <Wrapper className={className}>
      <Container $darkTheme={darkTheme}>
        {contents && (
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          onRealIndexChange={onIndexChange}
          pagination
          loop
          lazy
          breakpoints={{
            512: {
              spaceBetween: 20,
              slidesPerView: 4,
            },
          }}
        >
          {renderItems(contents)}
        </Swiper>
        )}
      </Container>
    </Wrapper>
  );
};

SliderHtml.defaultProps = {
  className: '',
  darkTheme: false,
};

export default SliderHtml;
