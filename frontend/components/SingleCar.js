import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import Loading from './Loading';

const SingleCarElement = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const SINGLE_CAR_QUERY = gql`
  query SINGLE_CAR_QUERY($id: ID!) {
    car(where: { id: $id }) {
      id
      title
      description
      largeImage
      price
    }
  }
`;

class SingleCar extends Component {
  render() {
    return (
      <Query query={SINGLE_CAR_QUERY} variables={{ id: this.props.id }}>
        {({data, error, loading}) => {
          if(loading) return <Loading />
          if(!data.car) return <div>Error! No car with id {this.props.id} found!</div>
          if(error) return <p>Error... {error.message}</p>
          
          const car = data.car;
          
          return (
            <SingleCarElement>
              <Head>
                <title>{car.title} | AutoLux</title>
              </Head>
              <h2>{car.title}</h2>
              <img src={car.largeImage} />
              <span>{car.price}</span>
            </SingleCarElement>
          )
        }}
      </Query>
    );
  }
}

export default SingleCar;