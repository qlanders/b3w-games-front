import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Infinity from '@b3w/infinity';
import breakpoints from '../../helpers/breakpoints';
import useSliderContent from '../../hooks/useSliderContent';
import { ContentFragment } from '../../generated/graphql';
import { GameType } from '../../hooks/useService';
import placeholderOnline from '../../common/images/placeholder/placeholder-220x220.png';
import placeholderAndroid from '../../common/images/placeholder/placeholder-800x300-dark.png';
import Loader from '../Loader/Loader';

const Wrapper = styled.div<{ $android?: boolean }>`
  padding: ${({ $android }) => ($android ? '15px 0 0' : '13px 0 15px')};
  @media only screen and (${breakpoints.md}) {
    padding: ${({ $android }) => ($android ? '20px 0 0' : '20px 0 30px')};
  }
  .swiper {
    padding: 10px;
  }
`;
const Container = styled.div`
  padding: 10px;
`;
const InfiniteWrapper = styled.ul<{ $android?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ $android }) => ($android ? 'space-evenly' : 'normal')};
  margin-right: ${({ $android }) => ($android ? '0' : '-25px')};
  padding: ${({ $android }) => ($android ? '0 0 15px 0' : '0')};
  @media only screen and (${breakpoints.md}) {
    padding: ${({ $android }) => ($android ? '0 0 25px 0' : '0')};
  }
`;
const ItemOnline = styled.div`
  width: 33.33%;
  padding: 0 25px 0 0;
  margin: 0 0 20px 0;
`;
const ItemAndroid = styled.div`
  width: 45%;
  padding-bottom: 20px;
  @media only screen and (${breakpoints.md}) {
    width: 42%;
    padding-bottom: 35px;
  }
`;
const linkCss = css`
  display: block;
  text-decoration: none;
  text-align: center;
  &,
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: #fff;
  }
`;
const StyledLink = styled(Link)`
  ${linkCss};
`;
const LinkDownload = styled.a`
  ${linkCss};
`;
const ImgHolder = styled.span<{ $android?: boolean }>`
  display: block;
  margin-bottom: 13px;
  position: relative;
  box-shadow: ${({ $android }) => ($android ? '0 5px 30px rgba(0,0,0, .5)' : 'none')};
  @media only screen and (${breakpoints.md}) {
    margin-bottom: 20px;
  }
  &:after {
    content: '';
    display: block;
    height: 0;
    padding-top: ${({ $android }) => ($android ? '56.52%' : '100%')};
  }
`;
const Img = styled.img<{ $isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  filter: drop-shadow(0 5px 10px rgba(0,0,0, .7));
  transition: opacity .3s ease-in-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
`;
const NameWrapper = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Name = styled.span`
  font-size: 16px;
  line-height: .8;
  height: 30px;
  @media only screen and (${breakpoints.md}) {
    font-size: 24px;
    height: 45px;
  }
`;
const StyledLoader = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const InfinityLoader = styled(Loader)`
  min-height: 0;
`;

const ImageComp = ({ src }: { src: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {isLoaded || <StyledLoader />}
      <Img
        src={src}
        $isLoaded={isLoaded}
        onLoad={() => { setIsLoaded(true); }}
        alt=""
      />
    </>
  );
};

export interface IGamesList {
  activePage: GameType;
  hasMore: boolean;
  setHasMore: (arg0: boolean) => void;
  className?: string;
}

const GamesList = ({
  activePage,
  hasMore,
  setHasMore,
  className,
}: IGamesList) => {
  const { contents, fetchMore } = useSliderContent({
    limit: activePage === 'android' ? 8 : 9,
    setHasMore,
    category: activePage,
  });

  const renderItemsOnline = (items: ContentFragment[]) => items.map(({
    id, previews, name,
  }) => {
    const preview = previews?.find(({ type }) => type === 'icon_512x512')?.link;

    return (
      <ItemOnline key={id}>
        <StyledLink to={`/game-page/${id.replace('content:', '')}`}>
          <LazyLoad height={200}>
            <ImgHolder>
              <ImageComp src={preview ? `/gate/f/${preview}` : placeholderOnline} />
            </ImgHolder>
            <NameWrapper>
              <Name>{name}</Name>
            </NameWrapper>
          </LazyLoad>
        </StyledLink>
      </ItemOnline>
    );
  });

  const renderItemsAndroid = (items: ContentFragment[]) => items.map(({
    id, previews, name, link,
  }) => {
    const preview = previews?.find(({ type }) => type === '690_390')?.link;

    return (
      <ItemAndroid key={id}>
        <LinkDownload href={`/gate/${link}`} download={name}>
          <LazyLoad height={200}>
            <ImgHolder $android>
              <ImageComp src={preview ? `/gate/f/${preview}` : placeholderAndroid} />
            </ImgHolder>
            <NameWrapper>
              <Name>{name}</Name>
            </NameWrapper>
          </LazyLoad>
        </LinkDownload>
      </ItemAndroid>
    );
  });

  return (
    <Wrapper className={className} $android={activePage === 'android'}>
      <Container>
        <Infinity fetchMore={fetchMore} hasMore={hasMore} loaderComp={<InfinityLoader />}>
          <InfiniteWrapper $android={activePage === 'android'}>
            {contents?.length && activePage === 'online' && renderItemsOnline(contents)}
            {contents?.length && activePage === 'android' && renderItemsAndroid(contents)}
          </InfiniteWrapper>
        </Infinity>
      </Container>
    </Wrapper>
  );
};

GamesList.defaultProps = {
  className: '',
};

export default GamesList;
