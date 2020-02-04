import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Car from './Car';

const ALL_CARS_QUERY = gql`
  query ALL_CARS_QUERY {
    cars {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const CarList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class Cars extends Component {
  render() {
    return (
      <div>
        <h1>Featured cars</h1>
        <Query query={ALL_CARS_QUERY}>
          {({data, error, loading}) => {
            if(loading) return <p>Loading...</p>
            if(error) return <p>Error... {error.message}</p>
            return (
              <CarList>
                {data.cars.map(car => <Car key={car.id} car={car} />)}
              </CarList>
            )
          }}
        </Query>
      </div>
    );
  }
}

export default Cars;
export { ALL_CARS_QUERY };