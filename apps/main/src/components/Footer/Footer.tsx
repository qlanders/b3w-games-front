import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import breakpoints from '../../helpers/breakpoints';

const WrapperThemeMain = css`
  background: #253545;
  color: #9afef0;
`;
const WrapperThemeGreen = css`
  background: #64c04b;
  color: #1a3f1f;
`;
const Wrapper = styled.footer<{ $theme?: FooterTheme }>`
  position: relative;
  padding: 15px 10px;
  margin-top: auto;
  font-size: 12px;
  z-index: 100;
  ${({ $theme }) => ($theme === 'main' ? WrapperThemeMain : WrapperThemeGreen)}
  a {
    &,
    &:link,
    &:visited,
    &:hover,
    &:active {
      color: inherit;
    }
  }
  @media only screen and (${breakpoints.md}) {
    padding: 30px 20px;
    font-size: 14px;
  }
`;
const LinksList = styled.ul`
  padding: 0;
  margin: 0 0 1em;
  list-style-type: none;
`;
const LinkItem = styled.li`
  margin-bottom: 1em;
  &:last-child {
    margin-bottom: 0;
  }
`;
const LinkComp = styled(Link)`
  font-weight: 300
`;
const Text = styled.div`
  font-weight: 300;
  line-height: 1;
  padding: 0;
  p {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export type FooterTheme = 'main' | 'green';

export interface IFooter {
  theme?: FooterTheme;
  className?: string;
}

const Footer = ({
  theme,
  className,
}: IFooter) => {
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('/text/online-games/footer/1')
      .then((res: AxiosResponse<string>) => {
        if (res.data) {
          setText(res.data);
        }
      });
  }, []);

  return (
    <Wrapper $theme={theme} className={className}>
      <LinksList>
        <LinkItem>
          <LinkComp to="/cost">
            Стоимость услуги
          </LinkComp>
        </LinkItem>
        <LinkItem>
          <LinkComp to="/offer">
            Пользовательское соглашение
          </LinkComp>
        </LinkItem>
      </LinksList>
      <Text dangerouslySetInnerHTML={{ __html: text }} />
    </Wrapper>
  );
};

Footer.defaultProps = {
  backgroundColor: 'main',
  className: '',
};

export default Footer;
