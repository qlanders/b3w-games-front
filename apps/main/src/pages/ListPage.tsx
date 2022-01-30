import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { isIOS } from 'react-device-detect';
import { useLocation } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import hasIn from 'lodash.hasin';
import ErrorPage from './ErrorPage';
import Navigation from '../components/Navigation/Navigation';
import TagsFilter from '../components/TagsFilter/TagsFilter';
import GamesList from '../components/GamesList/GamesList';
import useService, { GameType } from '../hooks/useService';

const pageStandartTheme = css`
  background: #65c04b;
`;
const Wrapper = styled.div<{ $darkTheme: boolean }>`
  flex-grow: 1;
  ${({ $darkTheme }) => !$darkTheme && pageStandartTheme};
`;

interface IListPage {
  page: GameType,
}

const ListPage = ({ page }: IListPage) => {
  const { search } = useLocation();
  const [hasMore, setHasMore] = useState<{ [key: string]: boolean }>({});
  const parsedQuery: ParsedQuery = queryString.parse(search);
  const currentTagParsed = parsedQuery?.tag;
  const currentTag: string | undefined = typeof currentTagParsed === 'string' ? currentTagParsed : currentTagParsed?.[0];
  const [activePage, setActivePage] = useState<GameType>(page);
  const hasMoreCurrent = hasMore[`${activePage}:${currentTag || 'all'}`];
  const [isError, setIsError] = useState(false);
  const { pathname } = useLocation();
  const { getCategoryId } = useService();
  const categoryId = useMemo(() => getCategoryId(activePage), [activePage]);

  useEffect(() => {
    switch (pathname) {
      case '/android':
        setActivePage('android');
        break;
      case '/online':
        setActivePage('online');
        break;
      default:
        setIsError(true);
    }
  }, [pathname]);

  const setHasMoreHandle = (value: boolean) => {
    setHasMore((state) => ({
      ...state,
      [`${activePage}:${currentTag || 'all'}`]: value,
    }));
  };

  useEffect(() => {
    if (!hasIn(hasMore, `${activePage}:${currentTag || 'all'}`)) {
      setHasMoreHandle(true);
    }
  }, [currentTag, activePage]);

  if (isError) return <ErrorPage />;

  return (
    <Wrapper $darkTheme={activePage === 'online'}>
      {!isIOS && <Navigation activePage={activePage} />}
      { categoryId && (
      <TagsFilter
        page={activePage}
        bodyColor={activePage === 'online' ? '#99fff4' : '#fff'}
        color={activePage === 'online' ? '#253545' : '#65c04b'}
      />
      )}
      {categoryId && (
        <GamesList
          hasMore={hasMoreCurrent}
          setHasMore={setHasMoreHandle}
          activePage={activePage}
        />
      )}
    </Wrapper>
  );
};

export default ListPage;
