import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import SwiperCore from 'swiper';
import {
  useContentsByCategoryLazyQuery,
  useContentsByTagLazyQuery,
} from '../generated/graphql';
import useService, { GameType } from './useService';

export interface ISliderTagsFilter {
  hasMore: boolean;
  looped: boolean;
}

export interface ISliderContent {
  tagId?: string | undefined;
  category: GameType;
  limit?: number;
  slider?: ISliderTagsFilter;
  setHasMore: (arg0: boolean) => void;
  ignoreTagsFilter?: boolean;
}

export default ({
  limit = 10, setHasMore, tagId, category, slider, ignoreTagsFilter = false,
} : ISliderContent) => {
  const { getCategoryId } = useService();
  const categoryId = useMemo(() => getCategoryId(category), [category]);
  const { search } = useLocation();

  const currentTag = useMemo(() => {
    const parsedQuery: ParsedQuery = queryString.parse(search);
    const currentTagParsed = parsedQuery?.tag;

    return tagId?.replace('tag:', '') || (typeof currentTagParsed === 'string' ? currentTagParsed : currentTagParsed?.[0]);
  }, [search]);

  const contentsByTag = currentTag && !ignoreTagsFilter;

  const [getContentsByCategory, {
    data: dataByCategory,
    loading: loadingByCategory,
    fetchMore: fetchMoreByCategory,
  }] = useContentsByCategoryLazyQuery({
    onCompleted: (res) => {
      const contents = res?.point?.service.category?.contents;
      if (contents && contents.length < limit) setHasMore(false);
    },
  });
  const [getContentsByTag, {
    data: dataByTag,
    loading: loadingByTag,
    fetchMore: fetchMoreByTag,
  }] = useContentsByTagLazyQuery({
    onCompleted: (res) => {
      const contents = res?.point?.service.tag?.contents;
      if (contents && contents.length < limit) setHasMore(false);
    },
  });

  useEffect(() => {
    if (categoryId) {
      if (contentsByTag) {
        getContentsByTag({
          variables: {
            id: `tag:${currentTag}`,
            limit,
            categoryId,
          },
        });
      } else {
        getContentsByCategory({
          variables: {
            categoryId,
            limit,
          },
        });
      }
    }
  }, [currentTag, categoryId]);

  const contents = contentsByTag
    ? dataByTag?.point?.service.tag?.contents
    : dataByCategory?.point?.service.category?.contents;

  const loading = loadingByCategory || loadingByTag;

  const fetchMore = () => {
    if (categoryId && !contentsByTag && fetchMoreByCategory) {
      fetchMoreByCategory({
        variables: {
          categoryId,
          offset: (contents?.length || 0),
        },
      })
        .then((res) => {
          const resContents = res.data?.point?.service.category?.contents;
          if (resContents && resContents.length < limit) setHasMore(false);
        });
    }
    if (categoryId && contentsByTag && fetchMoreByTag) {
      fetchMoreByTag({
        variables: {
          categoryId,
          id: `tag:${currentTag}`,
          offset: (contents?.length || 0),
        },
      })
        .then((res) => {
          const resContents = res.data?.point?.service.tag?.contents;
          if (resContents && resContents.length < limit) setHasMore(false);
        });
    }
  };

  const onIndexChange = (core: SwiperCore) => {
    if (slider?.looped) {
      const realSlidesLength = core.slides.length - (core?.loopedSlides
        ? core?.loopedSlides * 2
        : 0);
      const slidesPerView: number = typeof core.params?.slidesPerView === 'number' ? core.params?.slidesPerView : 0;

      if (core.realIndex + slidesPerView === realSlidesLength && slider?.hasMore) {
        fetchMore();
      }
      return;
    }

    if (core.activeIndex + 1 === core.slides.length && slider?.hasMore) {
      fetchMore();
    }
  };

  return {
    contents, loading, fetchMore, onIndexChange,
  };
};
