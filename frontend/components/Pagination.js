import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import styled from 'styled-components';
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

const PaginationElement = styled.div`
  text-align: center;
  margin: 20px 0;
  
  .arrow-prev,
  .arrow-next {
    width: 30px;
    height: 30px;
    display: inline-block;
    text-align: center;
    position: relative;

    &:before {
      content: '';
      border: solid black;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 3px;
      position: absolute;
      top: 50%;
      margin-top: -5px;
      left: 50%;
      margin-left: -5px;
    }

    &[aria-disabled="true"] {
      color: grey;
      pointer-events: none;
      opacity: .3;
    }
  }

  .arrow-prev {
    &:before {
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
    }
  }

  .arrow-next {
    &:before {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
  }

  span {
    display: inline-block;
    line-height: 30px;
    vertical-align: top;
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
        <PaginationElement>
          <Link
            prefetch
            href={{
              query: { page: page - 1 }
            }}
            >
            <a className="arrow-prev" aria-disabled={page <= 1}></a>
          </Link>
          <span>Page {props.page} of {Math.ceil(pages)}</span>
          <Link
            prefetch
            href={{
              query: { page: page + 1 }
            }}
          >
            <a className="arrow-next" aria-disabled={page >= pages}></a>
          </Link>
        </PaginationElement>
      )
    }}
  </Query>
)

export default Pagination;