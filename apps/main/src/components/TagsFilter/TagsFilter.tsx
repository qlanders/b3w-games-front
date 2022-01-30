import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import SwiperCore from 'swiper';
import useService, { GameType } from '../../hooks/useService';
import breakpoints from '../../helpers/breakpoints';

const Wrapper = styled.div`
  margin-bottom: 5px;
  height: 90px;
  @media only screen and (${breakpoints.md}) {
      height: 150px;
  }
  .swiper-container {
    padding: 0;
  }
  .swiper-wrapper {
    padding: 20px 0;
    @media only screen and (${breakpoints.md}) {
      padding: 40px 0
    }
  }
  .swiper-slide {
    width: auto;
    padding: 0 7px;
    @media only screen and (${breakpoints.md}) {
        padding: 0 15px;
    }
  }
`;

const activeButton = css<{ $color: Color, $bodyColor: Color }>`
  background:  ${({ $bodyColor }) => $bodyColor};
  border-color:  ${({ $bodyColor }) => $bodyColor};
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
  @media only screen and (${breakpoints.md}) {
      box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.5);
  }
  &,
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: ${({ $color }) => $color};
  }
`;

const Button = styled.button<{ $active: boolean, $color: Color, $bodyColor: Color }>`
  display: block;
  line-height: 48px;
  background-color: transparent;
  color: ${({ $bodyColor }) => $bodyColor};
  font-size: 25px;
  font-weight: 300;
  text-decoration: none;
  border-radius: 20px;
  padding: 0 15px;
  border: 1px solid;
  cursor: pointer;
  @media only screen and (${breakpoints.md}) {
    line-height: 66px;
    font-size: 30px;
    border-radius: 30px;
    padding: 0 25px;
    border-width: 2px;
  }
  ${({ $active }) => $active && activeButton}
`;

export type Color = `#${string}`;

export interface ITagsFilter {
  color: Color;
  bodyColor: Color;
  page: GameType;
  className?: string;
}

const TagsFilter = ({
  color,
  bodyColor,
  page,
  className,
}: ITagsFilter) => {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const [swiperInst, setSwiperInst] = useState<SwiperCore | null>(null);
  const currentTag = queryString.parse(search)?.tag;
  const { getTags } = useService();
  const tags = useMemo(() => getTags(page), [page]);

  useEffect(() => {
    if (tags) {
      const index = tags.findIndex(({ id }) => id === `tag:${currentTag}`);
      swiperInst?.slideTo(index, 500);
    }
  }, [swiperInst, pathname]);

  const setQuery = (id: string | null) => {
    history.push({ search: id === null ? '' : `?tag=${id.replace('tag:', '')}` });
  };

  return (
    <Wrapper className={className}>
      <Swiper
        slidesPerView="auto"
        freeMode
        onSwiper={setSwiperInst}
      >
        <SwiperSlide key="all">
          <Button
            onClick={() => { setQuery(null); }}
            $active={!currentTag}
            $color={color}
            $bodyColor={bodyColor}
          >
            #all
          </Button>
        </SwiperSlide>
        {tags && tags.map(({ id, displayName }) => (
          <SwiperSlide key={id}>
            <Button
              onClick={() => { setQuery(id); }}
              $active={currentTag === id.replace('tag:', '')}
              $color={color}
              $bodyColor={bodyColor}
            >
              #
              {displayName}
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

TagsFilter.defaultProps = {
  className: '',
};

export default TagsFilter;
