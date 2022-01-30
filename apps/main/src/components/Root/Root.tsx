import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import {
  ApolloClient, InMemoryCache, from, HttpLink,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import App from '../App/App';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      // eslint-disable-next-line no-console
      console.error(`Graphql error ${message}`);
      return null;
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: '/api/query' }),
]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Preview: {
        keyFields: ['id'],
      },
      Category: {
        keyFields: ['id'],
        fields: {
          contents: offsetLimitPagination(),
        },
      },
      Tag: {
        keyFields: ['id'],
        fields: {
          contents: offsetLimitPagination(['categoryID']),
        },
      },
      Service: {
        keyFields: ['id'],
        fields: {
          contents: offsetLimitPagination(),
        },
      },
      Content: {
        keyFields: ['id'],
      },
    },
  }),
});

const Root = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </ApolloProvider>
);

export default Root;
