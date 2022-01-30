import { useServiceQuery, TagFragment } from '../generated/graphql';
import {
  gameOfTheWeekTag, bestGameTag, categoryAndroid, categoryHtml,
} from '../constants';

export type GameType = 'online' | 'android';
export interface IuseService {
  getCategoryId: (gameType: GameType) => string | undefined;
  getTags: (gameType: GameType) => TagFragment[] | null | undefined;
  gameOfTheWeekTagId: string | undefined;
  bestGameTagId: string | undefined;
  categoryHtmlId: string | undefined;
  categoryAndroidId: string | undefined;
  loading: boolean;
}

export default (): IuseService => {
  const { data, loading } = useServiceQuery();

  const categoryHtmlObj = data?.point?.service.categories
    ?.find((i) => i.name === categoryHtml);
  const categoryAndroidObj = data?.point?.service.categories
    ?.find((i) => i.name === categoryAndroid);

  const gameOfTheWeekTagId = categoryHtmlObj?.tags
    ?.find((i) => i.name === gameOfTheWeekTag)?.id;
  const bestGameTagId = categoryAndroidObj?.tags
    ?.find((i) => i.name === bestGameTag)?.id;
  const categoryHtmlId = data?.point?.service.categories
    ?.find((category) => category.name === categoryHtml)?.id;
  const categoryAndroidId = data?.point?.service.categories
    ?.find((category) => category.name === categoryAndroid)?.id;

  const getCategoryId = (gameType: GameType) => {
    if (gameType === 'online') return categoryHtmlObj?.id;
    if (gameType === 'android') return categoryAndroidObj?.id;
    throw new Error('Wrong game type');
  };

  const getTags = (gameType: GameType) => {
    if (gameType === 'online') return categoryHtmlObj?.tags?.filter(({ name }) => name === 'tag');
    if (gameType === 'android') return categoryAndroidObj?.tags?.filter(({ name }) => name === 'tag');
    throw new Error('Wrong game type');
  };

  return {
    getCategoryId,
    getTags,
    gameOfTheWeekTagId,
    bestGameTagId,
    categoryHtmlId,
    categoryAndroidId,
    loading,
  };
};
