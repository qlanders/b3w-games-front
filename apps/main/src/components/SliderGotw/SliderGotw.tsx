import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { ContentFragment } from '../../generated/graphql';
import Corner from '../Corner/Corner';

const Wrapper = styled.div`
  position: relative;
  padding-top: 40px;
  .swiper-slide {
    position: relative;
    box-shadow: 0 0 15px rgba(0,0,0, .6), 0 0 3px rgba(0,0,0, .7);
  }
`;
const Container = styled.div`
  position: relative;
  overflow: hidden;
  background: #253545;
  box-shadow: 0 0 30px rgba(0,0,0, .7);
  &:before {
    content: '';
    display: block;
    position: absolute;
    height: 4px;
    left: 0;
    right: 0;
    top: 0;
    background: #ffcc00;
    z-index: 10;
  }
`;
const StyledCorner = styled(Corner)`
  position: absolute;
  z-index: 15;
`;
const Image = styled.img`
  display: block;
  height: auto;
  width: 100%;
`;

interface ISliderGotw {
  className?: string;
  game: ContentFragment;
}

const SliderGotw = ({
  className,
  game,
}: ISliderGotw) => (
  <Wrapper className={className}>
    <Container>
      <Swiper
        slidesPerView={3}
        breakpoints={{
          520: {
            slidesPerView: 4,
          },
        }}
      >
        {game.previews?.filter(({ type }) => type === '240_320').map((preview) => (
          <SwiperSlide key={preview.id}>
            <Image src={`/gate/f/${preview.link}`} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <StyledCorner textLg="Игра" text="недели" />
    </Container>
  </Wrapper>
);

SliderGotw.defaultProps = {
  className: '',
};

export default SliderGotw;
