import React, { ReactNode } from 'react';
import styled from 'styled-components';
import breakpoints from '../../helpers/breakpoints';

const WrapperComp = styled.div`
  padding: 30px 25px 0;
  overflow: hidden;
  @media only screen and (${breakpoints.md}) {
    padding: 55px 40px 0;
  }
`;

interface IWrapper {
  className?: string;
  children: ReactNode;
}

const Wrapper = ({
  className,
  children,
}: IWrapper) => (
  <WrapperComp className={className}>
    {children}
  </WrapperComp>
);

Wrapper.defaultProps = {
  className: '',
};

export default Wrapper;
