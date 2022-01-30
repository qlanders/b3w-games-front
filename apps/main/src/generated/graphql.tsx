import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  alias: Scalars['String'];
  contents?: Maybe<Array<Content>>;
  id: Scalars['ID'];
  localizations?: Maybe<Array<I18nCategory>>;
  name: Scalars['String'];
  params: Array<MetaContentParam>;
  priority: Scalars['Int'];
  tags?: Maybe<Array<Tag>>;
  totalContent: Scalars['Int'];
  totalContents: Scalars['Int'];
  type: Scalars['String'];
};


export type CategoryContentsArgs = {
  filter?: Maybe<ContentFilter>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  paramFilter?: Maybe<Array<ParamFilter>>;
  sort?: Maybe<SortByParam>;
  tagID?: Maybe<Scalars['ID']>;
};


export type CategoryLocalizationsArgs = {
  lang: Array<Language>;
};


export type CategoryParamsArgs = {
  name: Scalars['String'];
};


export type CategoryTotalContentsArgs = {
  filter?: Maybe<ContentFilter>;
  paramFilter?: Maybe<Array<ParamFilter>>;
  sort?: Maybe<SortByParam>;
  tagID?: Maybe<Scalars['ID']>;
};

export type Content = {
  __typename?: 'Content';
  category: Category;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  like: Like;
  link: Scalars['String'];
  localizations?: Maybe<Array<I18nContent>>;
  metaContentParams?: Maybe<Array<MetaContentParam>>;
  name: Scalars['String'];
  previews?: Maybe<Array<Preview>>;
  priority: Scalars['Int'];
  protected: Scalars['Boolean'];
  tags?: Maybe<Array<Tag>>;
  type: Scalars['String'];
  view: View;
};


export type ContentLocalizationsArgs = {
  lang: Array<Language>;
};

export type ContentFilter = {
  typeName?: Maybe<Scalars['String']>;
};

export type I18nCategory = {
  __typename?: 'I18nCategory';
  id: Scalars['ID'];
  lang: Scalars['String'];
  name: Scalars['String'];
};

export type I18nContent = {
  __typename?: 'I18nContent';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lang: Scalars['String'];
  link: Scalars['String'];
  name: Scalars['String'];
};

export type I18nMetaContentParam = {
  __typename?: 'I18nMetaContentParam';
  id: Scalars['ID'];
  lang: Scalars['String'];
  value: Scalars['String'];
};

export type I18nTag = {
  __typename?: 'I18nTag';
  displayName: Scalars['String'];
  id: Scalars['ID'];
  lang: Scalars['String'];
};

export enum Language {
  Am = 'am',
  Base = 'base',
  By = 'by',
  En = 'en',
  Kz = 'kz',
  Ru = 'ru',
  Ua = 'ua',
  Uz = 'uz'
}

export type Like = {
  __typename?: 'Like';
  id: Scalars['ID'];
  isLiked: Scalars['Boolean'];
  total: Scalars['Int'];
};

export type MetaContentParam = Param & {
  __typename?: 'MetaContentParam';
  id: Scalars['ID'];
  localizations?: Maybe<Array<I18nMetaContentParam>>;
  name: Scalars['String'];
  value: Scalars['String'];
};


export type MetaContentParamLocalizationsArgs = {
  lang: Array<Language>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deactivateSubs?: Maybe<Scalars['Boolean']>;
  like: Like;
  view: View;
};


export type MutationLikeArgs = {
  id: Scalars['ID'];
};


export type MutationViewArgs = {
  id: Scalars['ID'];
};

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
  Rand = 'rand'
}

export type Param = {
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Base64 encoded JSON object */
  value: Scalars['String'];
};

export type ParamFilter = {
  paramName: Scalars['String'];
  value?: Maybe<Array<Scalars['String']>>;
};

export type Point = {
  __typename?: 'Point';
  flowURL?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  service: Service;
  sid: Scalars['String'];
  sskey: Scalars['String'];
  tariff: Scalars['Int'];
  verify?: Maybe<Scalars['Boolean']>;
};

export type Preview = {
  __typename?: 'Preview';
  id: Scalars['ID'];
  link: Scalars['String'];
  priority: Scalars['Int'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  point?: Maybe<Point>;
};

export enum SearchField {
  Description = 'description',
  Name = 'name'
}

export type Service = {
  __typename?: 'Service';
  alias: Scalars['String'];
  categories?: Maybe<Array<Category>>;
  category?: Maybe<Category>;
  content?: Maybe<Content>;
  contents?: Maybe<Array<Content>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  params: Array<MetaContentParam>;
  search?: Maybe<Array<Content>>;
  tag?: Maybe<Tag>;
  tags?: Maybe<Array<Tag>>;
  totalContent: Scalars['Int'];
};


export type ServiceCategoryArgs = {
  id: Scalars['ID'];
};


export type ServiceContentArgs = {
  id: Scalars['ID'];
};


export type ServiceContentsArgs = {
  filter?: Maybe<ContentFilter>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  paramFilter?: Maybe<Array<ParamFilter>>;
  sort?: Maybe<SortByParam>;
};


export type ServiceParamsArgs = {
  name: Scalars['String'];
};


export type ServiceSearchArgs = {
  fields?: Array<SearchField>;
  lang?: Array<Language>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  query: Scalars['String'];
};


export type ServiceTagArgs = {
  id: Scalars['ID'];
};

export type SortByParam = {
  order: Order;
  paramName?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  contents?: Maybe<Array<Content>>;
  displayName: Scalars['String'];
  id: Scalars['ID'];
  localizations?: Maybe<Array<I18nTag>>;
  name: Scalars['String'];
  priority: Scalars['Int'];
  totalContent: Scalars['Int'];
  totalContents: Scalars['Int'];
};


export type TagContentsArgs = {
  categoryID?: Maybe<Scalars['ID']>;
  filter?: Maybe<ContentFilter>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  paramFilter?: Maybe<Array<ParamFilter>>;
};


export type TagLocalizationsArgs = {
  lang: Array<Language>;
};


export type TagTotalContentsArgs = {
  categoryID?: Maybe<Scalars['ID']>;
  filter?: Maybe<ContentFilter>;
  paramFilter?: Maybe<Array<ParamFilter>>;
};

export type View = {
  __typename?: 'View';
  id: Scalars['ID'];
  isViewed: Scalars['Boolean'];
  total: Scalars['Int'];
};

export type ServiceQueryVariables = Exact<{ [key: string]: never; }>;


export type ServiceQuery = { __typename?: 'Query', point?: { __typename?: 'Point', id: string, flowURL?: string | null | undefined, sid: string, sskey: string, verify?: boolean | null | undefined, service: { __typename?: 'Service', id: string, name: string, categories?: Array<{ __typename?: 'Category', id: string, name: string, tags?: Array<{ __typename?: 'Tag', id: string, displayName: string, name: string }> | null | undefined }> | null | undefined } } | null | undefined };

export type TagsByCategoryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TagsByCategoryQuery = { __typename?: 'Query', point?: { __typename?: 'Point', id: string, service: { __typename?: 'Service', id: string, category?: { __typename?: 'Category', id: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string, displayName: string }> | null | undefined } | null | undefined } } | null | undefined };

export type ContentsQueryVariables = Exact<{
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  paramFilter?: Maybe<Array<ParamFilter> | ParamFilter>;
}>;


export type ContentsQuery = { __typename?: 'Query', point?: { __typename?: 'Point', id: string, service: { __typename?: 'Service', id: string, contents?: Array<{ __typename?: 'Content', id: string, name: string, link: string, previews?: Array<{ __typename?: 'Preview', id: string, link: string, priority: number, type: string }> | null | undefined, tags?: Array<{ __typename?: 'Tag', id: string, name: string, displayName: string }> | null | undefined, category: { __typename?: 'Category', id: string } }> | null | undefined } } | null | undefined };

export type ContentsByCategoryQueryVariables = Exact<{
  categoryId: Scalars['ID'];
  offset?: Scalars['Int'];
  limit?: Scalars['Int'];
}>;


export type ContentsByCategoryQuery = { __typename?: 'Query', point?: { __typename?: 'Point', id: string, service: { __typename?: 'Service', id: string, category?: { __typename?: 'Category', id: string, totalContent: number, contents?: Array<{ __typename?: 'Content', id: string, name: string, link: string, previews?: Array<{ __typename?: 'Preview', id: string, link: string, priority: number, type: string }> | null | undefined, tags?: Array<{ __typename?: 'Tag', id: string, name: string, displayName: string }> | null | undefined, category: { __typename?: 'Category', id: string } }> | null | undefined } | null | undefined } } | null | undefined };

export type ContentsByTagQueryVariables = Exact<{
  id: Scalars['ID'];
  categoryId?: Maybe<Scalars['ID']>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
}>;


export type ContentsByTagQuery = { __typename?: 'Query', point?: { __typename?: 'Point', id: string, service: { __typename?: 'Service', id: string, tag?: { __typename?: 'Tag', id: string, totalContents: number, contents?: Array<{ __typename?: 'Content', id: string, name: string, link: string, previews?: Array<{ __typename?: 'Preview', id: string, link: string, priority: number, type: string }> | null | undefined, tags?: Array<{ __typename?: 'Tag', id: string, name: string, displayName: string }> | null | undefined, category: { __typename?: 'Category', id: string } }> | null | undefined } | null | undefined } } | null | undefined };

export type ContentByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ContentByIdQuery = { __typename?: 'Query', point?: { __typename?: 'Point', id: string, service: { __typename?: 'Service', id: string, content?: { __typename?: 'Content', id: string, name: string, link: string, previews?: Array<{ __typename?: 'Preview', id: string, link: string, priority: number, type: string }> | null | undefined, metaContentParams?: Array<{ __typename?: 'MetaContentParam', id: string, name: string, value: string }> | null | undefined, tags?: Array<{ __typename?: 'Tag', id: string, name: string, displayName: string }> | null | undefined } | null | undefined } } | null | undefined };

export type CategoryFragment = { __typename?: 'Category', id: string, name: string, tags?: Array<{ __typename?: 'Tag', id: string, displayName: string, name: string }> | null | undefined };

export type ContentFragment = { __typename?: 'Content', id: string, name: string, link: string, previews?: Array<{ __typename?: 'Preview', id: string, link: string, priority: number, type: string }> | null | undefined, tags?: Array<{ __typename?: 'Tag', id: string, name: string, displayName: string }> | null | undefined, category: { __typename?: 'Category', id: string } };

export type ContentDetailFragment = { __typename?: 'Content', id: string, name: string, link: string, previews?: Array<{ __typename?: 'Preview', id: string, link: string, priority: number, type: string }> | null | undefined, metaContentParams?: Array<{ __typename?: 'MetaContentParam', id: string, name: string, value: string }> | null | undefined, tags?: Array<{ __typename?: 'Tag', id: string, name: string, displayName: string }> | null | undefined };

export type TagFragment = { __typename?: 'Tag', id: string, name: string, displayName: string };

export type PreviewFragment = { __typename?: 'Preview', id: string, link: string, priority: number, type: string };

export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  id
  name
  tags {
    id
    displayName
    name
  }
}
    `;
export const PreviewFragmentDoc = gql`
    fragment Preview on Preview {
  id
  link
  priority
  type
}
    `;
export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  id
  name
  displayName
}
    `;
export const ContentFragmentDoc = gql`
    fragment Content on Content {
  id
  name
  link
  previews {
    ...Preview
  }
  tags {
    ...Tag
  }
  category {
    id
  }
}
    ${PreviewFragmentDoc}
${TagFragmentDoc}`;
export const ContentDetailFragmentDoc = gql`
    fragment ContentDetail on Content {
  id
  name
  link
  previews {
    ...Preview
  }
  metaContentParams {
    id
    name
    value
  }
  tags {
    ...Tag
  }
}
    ${PreviewFragmentDoc}
${TagFragmentDoc}`;
export const ServiceDocument = gql`
    query Service {
  point {
    id
    flowURL
    sid
    sskey
    verify
    service {
      id
      name
      categories {
        ...Category
      }
    }
  }
}
    ${CategoryFragmentDoc}`;

/**
 * __useServiceQuery__
 *
 * To run a query within a React component, call `useServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceQuery({
 *   variables: {
 *   },
 * });
 */
export function useServiceQuery(baseOptions?: Apollo.QueryHookOptions<ServiceQuery, ServiceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServiceQuery, ServiceQueryVariables>(ServiceDocument, options);
      }
export function useServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServiceQuery, ServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServiceQuery, ServiceQueryVariables>(ServiceDocument, options);
        }
export type ServiceQueryHookResult = ReturnType<typeof useServiceQuery>;
export type ServiceLazyQueryHookResult = ReturnType<typeof useServiceLazyQuery>;
export type ServiceQueryResult = Apollo.QueryResult<ServiceQuery, ServiceQueryVariables>;
export const TagsByCategoryDocument = gql`
    query TagsByCategory($id: ID!) {
  point {
    id
    service {
      id
      category(id: $id) {
        id
        tags {
          ...Tag
        }
      }
    }
  }
}
    ${TagFragmentDoc}`;

/**
 * __useTagsByCategoryQuery__
 *
 * To run a query within a React component, call `useTagsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsByCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTagsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<TagsByCategoryQuery, TagsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsByCategoryQuery, TagsByCategoryQueryVariables>(TagsByCategoryDocument, options);
      }
export function useTagsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsByCategoryQuery, TagsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsByCategoryQuery, TagsByCategoryQueryVariables>(TagsByCategoryDocument, options);
        }
export type TagsByCategoryQueryHookResult = ReturnType<typeof useTagsByCategoryQuery>;
export type TagsByCategoryLazyQueryHookResult = ReturnType<typeof useTagsByCategoryLazyQuery>;
export type TagsByCategoryQueryResult = Apollo.QueryResult<TagsByCategoryQuery, TagsByCategoryQueryVariables>;
export const ContentsDocument = gql`
    query Contents($limit: Int! = 18, $offset: Int! = 0, $paramFilter: [ParamFilter!]) {
  point {
    id
    service {
      id
      contents(limit: $limit, offset: $offset, paramFilter: $paramFilter) {
        ...Content
      }
    }
  }
}
    ${ContentFragmentDoc}`;

/**
 * __useContentsQuery__
 *
 * To run a query within a React component, call `useContentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      paramFilter: // value for 'paramFilter'
 *   },
 * });
 */
export function useContentsQuery(baseOptions?: Apollo.QueryHookOptions<ContentsQuery, ContentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContentsQuery, ContentsQueryVariables>(ContentsDocument, options);
      }
export function useContentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContentsQuery, ContentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContentsQuery, ContentsQueryVariables>(ContentsDocument, options);
        }
export type ContentsQueryHookResult = ReturnType<typeof useContentsQuery>;
export type ContentsLazyQueryHookResult = ReturnType<typeof useContentsLazyQuery>;
export type ContentsQueryResult = Apollo.QueryResult<ContentsQuery, ContentsQueryVariables>;
export const ContentsByCategoryDocument = gql`
    query ContentsByCategory($categoryId: ID!, $offset: Int! = 0, $limit: Int! = 10) {
  point {
    id
    service {
      id
      category(id: $categoryId) {
        id
        contents(offset: $offset, limit: $limit) {
          ...Content
        }
        totalContent
      }
    }
  }
}
    ${ContentFragmentDoc}`;

/**
 * __useContentsByCategoryQuery__
 *
 * To run a query within a React component, call `useContentsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentsByCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useContentsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<ContentsByCategoryQuery, ContentsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContentsByCategoryQuery, ContentsByCategoryQueryVariables>(ContentsByCategoryDocument, options);
      }
export function useContentsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContentsByCategoryQuery, ContentsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContentsByCategoryQuery, ContentsByCategoryQueryVariables>(ContentsByCategoryDocument, options);
        }
export type ContentsByCategoryQueryHookResult = ReturnType<typeof useContentsByCategoryQuery>;
export type ContentsByCategoryLazyQueryHookResult = ReturnType<typeof useContentsByCategoryLazyQuery>;
export type ContentsByCategoryQueryResult = Apollo.QueryResult<ContentsByCategoryQuery, ContentsByCategoryQueryVariables>;
export const ContentsByTagDocument = gql`
    query ContentsByTag($id: ID!, $categoryId: ID, $limit: Int! = 10, $offset: Int! = 0) {
  point {
    id
    service {
      id
      tag(id: $id) {
        id
        contents(limit: $limit, offset: $offset, categoryID: $categoryId) {
          ...Content
        }
        totalContents(categoryID: $categoryId)
      }
    }
  }
}
    ${ContentFragmentDoc}`;

/**
 * __useContentsByTagQuery__
 *
 * To run a query within a React component, call `useContentsByTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentsByTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentsByTagQuery({
 *   variables: {
 *      id: // value for 'id'
 *      categoryId: // value for 'categoryId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useContentsByTagQuery(baseOptions: Apollo.QueryHookOptions<ContentsByTagQuery, ContentsByTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContentsByTagQuery, ContentsByTagQueryVariables>(ContentsByTagDocument, options);
      }
export function useContentsByTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContentsByTagQuery, ContentsByTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContentsByTagQuery, ContentsByTagQueryVariables>(ContentsByTagDocument, options);
        }
export type ContentsByTagQueryHookResult = ReturnType<typeof useContentsByTagQuery>;
export type ContentsByTagLazyQueryHookResult = ReturnType<typeof useContentsByTagLazyQuery>;
export type ContentsByTagQueryResult = Apollo.QueryResult<ContentsByTagQuery, ContentsByTagQueryVariables>;
export const ContentByIdDocument = gql`
    query ContentById($id: ID!) {
  point {
    id
    service {
      id
      content(id: $id) {
        ...ContentDetail
      }
    }
  }
}
    ${ContentDetailFragmentDoc}`;

/**
 * __useContentByIdQuery__
 *
 * To run a query within a React component, call `useContentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useContentByIdQuery(baseOptions: Apollo.QueryHookOptions<ContentByIdQuery, ContentByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContentByIdQuery, ContentByIdQueryVariables>(ContentByIdDocument, options);
      }
export function useContentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContentByIdQuery, ContentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContentByIdQuery, ContentByIdQueryVariables>(ContentByIdDocument, options);
        }
export type ContentByIdQueryHookResult = ReturnType<typeof useContentByIdQuery>;
export type ContentByIdLazyQueryHookResult = ReturnType<typeof useContentByIdLazyQuery>;
export type ContentByIdQueryResult = Apollo.QueryResult<ContentByIdQuery, ContentByIdQueryVariables>;
