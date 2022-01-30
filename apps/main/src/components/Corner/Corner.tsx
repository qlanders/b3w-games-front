import React from 'react';
import styled from 'styled-components';
import breakpoints from '../../helpers/breakpoints';

const Wrapper = styled.div`
  width: 180px;
  height: 80px;
  background: #ffcc00;
  color: #670100;
  text-align: center;
  padding: 5px;
  transform:  rotate(45deg) translateX(-51%);
  pointer-events: none;
  @media only screen and (${breakpoints.md}) {
    width: 220px;
    height: 100px;
    padding: 10px;
  }
`;

const Text = styled.span`
  text-transform: uppercase;
  font-size: 13px;
  @media only screen and (${breakpoints.md}) {
    font-size: 16px;
  }
`;

const TextLarge = styled.i`
  font-style: normal;
  font-size: 20px;
  @media only screen and (${breakpoints.md}) {
    font-size: 24px;
  }
`;

interface ICorner {
  textLg: string;
  text: string;
  className?: string;
}

const Corner = ({
  textLg,
  text,
  className,
}: ICorner) => (
  <Wrapper className={className}>
    <Text>
      <TextLarge>
        {textLg}
      </TextLarge>
      <br />
      {text}
    </Text>
  </Wrapper>
);

Corner.defaultProps = {
  className: '',
};

export default Corner;
