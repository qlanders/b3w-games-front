import React, { memo } from 'react';
import styled from 'styled-components';
import breakpoints from '../../helpers/breakpoints';

const Wrapper = styled.div`
  font-size: 28px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  user-select: none;
  @media only screen and (${breakpoints.md}) {

    font-size: 40px
  }
`;

interface ITitle {
  text: string;
  className?: string;
}

const Title = ({
  className,
  text,
}: ITitle) => (
  <Wrapper className={className}>
    {text}
  </Wrapper>
);

Title.defaultProps = {
  className: '',
};

export default memo(Title);
