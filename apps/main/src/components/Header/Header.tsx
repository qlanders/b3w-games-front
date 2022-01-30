import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import breakpoints from '../../helpers/breakpoints';
import background from './images/header-background.png';
import logo from './images/logo.svg';

const Wrapper = styled.div`
  position: relative;
  background: url(${background}) bottom / cover no-repeat;
`;

const LinkComp = styled(Link)`
  display: block;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  @media only screen and (${breakpoints.md}) {
    padding: 20px 10px;
  }
  @media only screen and (${breakpoints.lg}) {
    padding: 30px 10px;
  }
`;

const Title = styled.h1`
  margin: 0 0 10px;
  font-size: 30px;
  font-weight: 800;
  text-transform: uppercase;
  color: #c0fcfb;
  text-shadow: 0 0 20px rgba(69, 187, 182, 1);
  line-height: 1;
  @media only screen and (${breakpoints.md}) {
    margin: 0 0 30px;
    font-size: 50px;
  }
`;

const Logo = styled.img`
  width: 70%;
  max-width: 200px;
  @media only screen and (${breakpoints.md}) {
    max-width: 320px;
  }
`;

const Header = () => {
  const { pathname } = useLocation();
  const showTitle = pathname === '/' || pathname === '/offer' || pathname === '/cost';

  return (
    <Wrapper>
      <LinkComp to="/">
        {showTitle && <Title>Games</Title>}
        <Logo src={logo} alt="" />
      </LinkComp>
    </Wrapper>
  );
};

export default Header;
