import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import Loading from './Loading';

const SingleCarElement = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  h2 {
    display: flex;
    flex: 1;
  }

  .images,
  .info {
    display: flex;
    flex-basis: 50%;

    img {
      max-width: 100%;
    }
  }
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
              <div className="images">
                <img src={car.largeImage} />
              </div>
              <div className="info">
                <span>{car.price}</span>
                <p>{car.description}</p>
              </div>
            </SingleCarElement>
          )
        }}
      </Query>
    );
  }
}

export default SingleCar;