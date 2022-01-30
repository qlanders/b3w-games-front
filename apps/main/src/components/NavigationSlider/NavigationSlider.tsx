import React from 'react';
import styled, { css } from 'styled-components';
import SwiperCore from 'swiper';
import { ReactComponent as ArrowPrev } from '../../common/images/arrow-prev.svg';
import { ReactComponent as ArrowNext } from '../../common/images/arrow-next.svg';
import breakpoints from '../../helpers/breakpoints';

export type NavigationType = 'game' | undefined;

const buttonPosLeft = css<{ $type: NavigationType }>`
  margin-left: ${({ $type }) => ($type === 'game' ? '20px' : '10px')};
  left: 0;
  @media only screen and (${breakpoints.md}) {
    margin-right: 20px;
  }
`;
const buttonPosRight = css<{ $type: NavigationType }>`
  margin-right: ${({ $type }) => ($type === 'game' ? '20px' : '10px')};
  right: 0;
  @media only screen and (${breakpoints.md}) {
    margin-left: 20px;
  }
`;
const Button = styled.button<{ $pos: 'left' | 'right', $type: NavigationType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 50px;
  width: 50px;
  background: rgba(0, 0, 0, .6);
  border-radius: 50%;
  border: none;
  top: 50%;
  transform: translateY(-50%);
  appearance: none;
  z-index: 10;
  @media only screen and (${breakpoints.md}) {
    height: 80px;
    width: 80px;
  }
  ${({ $pos }) => $pos === 'left' && buttonPosLeft}
  ${({ $pos }) => $pos === 'right' && buttonPosRight}
`;
const StyledArrowPrev = styled(ArrowPrev)`
  height: 45%;
`;

const StyledArrowNext = styled(ArrowNext)`
  height: 45%;
`;

export interface INavigationSlider {
  type?: 'game';
  swiperInst?: SwiperCore;
}

const NavigationSlider = ({ swiperInst, type }: INavigationSlider) => (
  <>
    <Button
      $pos="left"
      $type={type}
      onClick={() => swiperInst?.slidePrev()}
    >
      <StyledArrowPrev />
    </Button>
    <Button
      $pos="right"
      $type={type}
      onClick={() => swiperInst?.slideNext()}
    >
      <StyledArrowNext />
    </Button>
  </>
);

NavigationSlider.defaultProps = {
  className: '',
};

export default NavigationSlider;
