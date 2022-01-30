import React, {
  useEffect, useLayoutEffect, useMemo, useState,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import chunk from 'lodash.chunk';
import SwiperCore from 'swiper';
import placeholder from '../../common/images/placeholder/dark-bg_220x220.png';
import useSliderContent from '../../hooks/useSliderContent';
import breakpoints from '../../helpers/breakpoints';
import useService from '../../hooks/useService';
import Loader from '../Loader/Loader';
import TagsFilter from '../TagsFilter/TagsFilter';

const Wrapper = styled.div``;

const SwiperWrapper = styled.div`
  .swiper-slide {
    padding: 20px;
    display: grid;
    gap: 20px;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
    justify-items: stretch;
    align-items: stretch;
    justify-content: space-around;
  }
`;

const LinkComp = styled(Link)`
  display: block;
  text-decoration: none;
  text-align: center;
  &,
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: inherit;
  }
      
`;

const ImageHolder = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 13px;
  @media only screen and (${breakpoints.md}) {
    margin-bottom: 20px;
  }
`;

const Gapper = styled.div`
  height: 0;
  width: 100%;
  padding-top: 100%;
`;

const Image = styled.img<{ $isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
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
  height: 44px;
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

const LoaderWrapper = styled.div`
  position: relative;
  width: 100%;
  &:after {
    content: '';
    display: block;
    height: 0;
    padding-top: 127%;
  }
`;

const StyledLoader = styled(Loader)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ImageComp = ({ src }: { src: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      data-src={src}
      className="swiper-lazy"
      $isLoaded={isLoaded}
      onLoad={() => { setIsLoaded(true); }}
      alt=""
    />
  );
};

interface IGamesListSlider {
  className?: string;
}

const GamesListSlider = ({
  className,
}: IGamesListSlider) => {
  const { search } = useLocation();
  const [swiperInst, setSwiperInst] = useState<SwiperCore | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { getTags } = useService();
  const tags = useMemo(() => getTags('online'), []);

  const {
    contents, loading, onIndexChange,
  } = useSliderContent({
    limit: 18,
    setHasMore,
    slider: { hasMore, looped: false },
    category: 'online',
  });
  const slides = chunk(contents, 9);

  useEffect(() => {
    swiperInst?.slideTo(0);
    if (!hasMore) setHasMore(true);
  }, [search]);

  useLayoutEffect(() => {
    swiperInst?.lazy?.load();
  });

  return (
    <Wrapper className={className}>
      {tags && (
        <TagsFilter
          page="online"
          color="#253545"
          bodyColor="#fff"
        />
      )}
      {slides && (
        <SwiperWrapper>
          <Swiper
            lazy={{
              checkInView: true,
            }}
            onSwiper={setSwiperInst}
            onRealIndexChange={onIndexChange}
          >
            {loading && <LoaderWrapper><StyledLoader /></LoaderWrapper>}
            {slides.map((slide) => (
              <SwiperSlide key={slide[0].id}>
                {slide.map(({ id, name, previews }) => {
                  const preview = previews?.find(({ type }) => type === 'icon_512x512')?.link;

                  return (
                    <LinkComp to={`/game-page/${id.replace('content:', '')}`} key={id}>
                      <ImageHolder>
                        <Gapper />
                        <ImageComp src={preview ? `/gate/f/${preview}` : placeholder} />
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
                      </ImageHolder>
                      <NameWrapper>
                        <Name>{name}</Name>
                      </NameWrapper>
                    </LinkComp>
                  );
                })}
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperWrapper>
      )}
    </Wrapper>
  );
};

GamesListSlider.defaultProps = {
  className: '',
};

export default GamesListSlider;
