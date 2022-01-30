import React, { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as LoaderIcon } from '../../common/images/loader.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
`;

interface ILoader {
  className?: string;
}

const Loader = forwardRef(({ className }: ILoader, ref: ForwardedRef<HTMLDivElement>) => (
  <Wrapper ref={ref} className={className}>
    <LoaderIcon />
  </Wrapper>
));

Loader.defaultProps = {
  className: '',
};

export default Loader;
