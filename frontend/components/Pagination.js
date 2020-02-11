import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { perPage } from '../config';
import Loading from './Loading';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    carsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = (props) => (
  <Query query={PAGINATION_QUERY}>
    {({data, loading, error}) => {
      if(loading) return <Loading />;
      const count = data.carsConnection.aggregate.count;
      const pages = count / perPage;
      const page = props.page;

      return (
        <div>
          <Link
            prefetch
            href={{
              query: { page: page - 1 }
            }}
            >
            <a aria-disabled={page <= 1}>Prev</a>
          </Link>
          Page {props.page} of {Math.ceil(pages)}
          <Link
            prefetch
            href={{
              query: { page: page + 1 }
            }}
          >
            <a aria-disabled={page >= pages}>Next</a>
          </Link>
        </div>
      )
    }}
  </Query>
)

export default Pagination;