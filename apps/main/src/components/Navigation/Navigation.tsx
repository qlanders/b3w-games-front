import React from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import breakpoints from '../../helpers/breakpoints';
import { GameType } from '../../hooks/useService';

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 25px 0 10px 15px;
  margin: 0;
  @media only screen and (${breakpoints.md}) {
    padding: 40px 0 10px 25px;
  }
`;
const Item = styled.li`
  margin: 0 15px 7px 0;
  @media only screen and (${breakpoints.md}) {
    margin: 0 25px 15px 0;
  }
`;
const buttonActive = css<{ $theme: GameType }>`
  background: ${({ $theme }) => ($theme === 'online' ? '#99fff4' : '#fff')};
  box-shadow: 0 0 40px rgba(0,0,0, .5);
  color: ${({ $theme }) => ($theme === 'online' ? '#253545' : '#65c04b')};
`;
const Button = styled.button<{ $active: boolean, $theme: GameType }>`
  display: inline-block;
  line-height: 48px;
  font-size: 20px;
  font-weight: 300;
  text-transform: uppercase;
  border-width: 1px;
  border-style: solid;
  border-radius: 20px;
  padding: 0 15px;
  text-decoration: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  @media only screen and (${breakpoints.md}) {
    border-width: 2px;
    line-height: 66px;
    font-size: 30px;
    border-radius: 30px;
  }
  border-color: ${({ $theme }) => ($theme === 'online' ? '#99fff4' : '#fff')};
  color: ${({ $theme }) => ($theme === 'online' ? '#99fff4' : '#fff')};
  background-color: transparent;
  ${({ $active }) => ($active && buttonActive)}
`;

export const gameTypes: GameType[] = ['online', 'android'];

export interface INavigation {
  activePage: GameType;
  className?: string;
}

const Navigation = ({
  activePage,
  className,
}: INavigation) => {
  const history = useHistory();

  return (
    <Wrapper className={className}>
      {gameTypes.map((i) => (
        <Item key={i}>
          <Button
            type="button"
            onClick={() => { history.push(`/${i}`); }}
            $active={i === activePage}
            $theme={activePage}
          >
            {i}
            {' '}
            games
          </Button>
        </Item>
      ))}
    </Wrapper>
  );
};

Navigation.defaultProps = {
  className: '',
};

export default Navigation;
