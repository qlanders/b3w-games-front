import React from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import breakpoints from '../../helpers/breakpoints';

const Wrapper = styled.div`
  text-align: center;
  padding: 25px;
  @media only screen and (${breakpoints.md}) {
      padding: 40px;
  }
`;

const buttonStyles = css<{ $darkTheme: boolean }>`
  display: inline-block;
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 300;
  line-height: 50px;
  height: 50px;
  border-radius: 20px;
  box-shadow: 0 0 25px rgba(0,0,0, .5);
  padding: 0 35px;
  background: ${({ $darkTheme }) => ($darkTheme ? '#98fef0' : '#fff')};
  color: ${({ $darkTheme }) => ($darkTheme ? '#253545' : '#65c04b')};
  @media only screen and (${breakpoints.md}) {
    line-height: 70px;
    height: 70px;
    font-size: 30px;
    box-shadow: 0 0 40px rgba(0,0,0, .5);
  }
`;
const Btn = styled.button<{ $darkTheme: boolean }>`
  ${buttonStyles};
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
const Link = styled.a`
  ${buttonStyles};
  text-decoration: none;
`;

export interface IButton {
  className?: string;
  text: string;
  link: string;
  download?: string;
  darkTheme?: boolean;
}

const Button = ({
  className,
  text,
  link,
  download,
  darkTheme = false,
}: IButton) => {
  const history = useHistory();

  const redirectTo = () => {
    history.push(link);
  };

  return (
    <Wrapper className={className}>
      {download ? (
        <Link
          href={link}
          download={download}
          $darkTheme={darkTheme}
        >
          {text}
        </Link>
      ) : (
        <Btn type="button" onClick={redirectTo} $darkTheme={darkTheme}>
          {text}
        </Btn>
      )}
    </Wrapper>
  );
};

Button.defaultProps = {
  className: '',
  download: null,
  darkTheme: false,
};

export default Button;
