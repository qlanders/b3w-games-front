import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import breakpoints from '../../helpers/breakpoints';
import useSliderContent from '../../hooks/useSliderContent';

const Wrapper = styled.div`
  display: block;
  width: 100%;
  overflow: hidden;
  margin-top: -40px;
  .swiper {
    padding: 40px 0;
  }
  .swiper-slide {
    position: relative;
    user-select: none;
  }
  .swiper-pagination {
    display: flex;
    width: 100vw !important;
    max-width: 720px;
    left: 50% !important;
    transform: translate3d(-50%, 0, 0) !important;
  }
  .swiper-pagination-bullet {
    flex: 1 0 auto;
    height: 8px;
    border-radius: 0;
    margin: 0 !important;
    width: auto !important;
    background: #274d1c;
    opacity: 1;
    @media only screen and (${breakpoints.md}) {
        height: 10px;
    }
    &-active {
      background: #ffcc00;
    }
  }
`;
const Container = styled.div`
  width: 120%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
const LinkComp = styled.a`
  display: block;
  text-decoration: none;
  &,
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: inherit;
  }
      
`;
const ImgHolder = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 30px rgba(0,0,0, .5);
  z-index: 10;
  margin-bottom: 10px;
  &:after {
    content: '';
    display: block;
    height: 0;
    width: 100%;
    padding-top: 56.36%;
  }
`;
const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: block;
  width: 100%;
  z-index: 10;
`;
const Content = styled.span`
  display: block;
  overflow: hidden;
  position: relative;
  z-index: 15;
`;
const Name = styled.span`
  font-size: 18px;
  font-weight: 300;
  display: block;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media only screen and (${breakpoints.md}) {
      font-size: 24px;
  }
`;
const Tag = styled.span`
  font-size: 14px;
  font-weight: 300;
  display: block;
  text-align: center;
  @media only screen and (${breakpoints.md}) {
      font-size: 18px;
  }
`;

interface ISliderAndroid {
  className?: string;
}

const SliderAndroid = ({
  className,
}: ISliderAndroid) => {
  const [hasMore, setHasMore] = useState(true);
  const { contents, onIndexChange } = useSliderContent({
    category: 'android',
    slider: { hasMore, looped: true },
    setHasMore,
    ignoreTagsFilter: true,
  });

  return (
    <Wrapper className={className}>
      <Container>
        {contents && (
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          loop
          lazy={{
            checkInView: true,
            loadPrevNext: true,
          }}
          pagination
          breakpoints={{
            520: {
              spaceBetween: 20,
            },
          }}
          onRealIndexChange={onIndexChange}
        >
          {contents.map((slide) => {
            const preview = slide.previews?.find(({ type }) => type === '690_390')?.link;

            return (
              <SwiperSlide key={slide.id}>
                <LinkComp
                  href={`/gate/${slide.link}`}
                  download={`${slide.name}.apk`}
                >
                  <ImgHolder>
                    <Img className="swiper-lazy" data-src={`/gate/f/${preview}`} alt="" />
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
                  </ImgHolder>
                  <Content>
                    <Name>{slide.name}</Name>
                    <Tag>
                      #
                      {slide.tags?.[0].displayName}
                    </Tag>
                  </Content>
                </LinkComp>
              </SwiperSlide>
            );
          })}
        </Swiper>
        )}
      </Container>
    </Wrapper>
  );
};

SliderAndroid.defaultProps = {
  className: '',
};

export default SliderAndroid;
