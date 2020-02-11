import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Car from './Car';
import Loading from './Loading';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_CARS_QUERY = gql`
  query ALL_CARS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    cars(first: $first, skip: $skip, orderBy: createdAt_DESC) {
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
      <div className="home">
        <h1>Featured cars</h1>
        <Query
          query={ALL_CARS_QUERY}
          variables={{
            skip: this.props.page * perPage - perPage
          }}
        >
          {({data, error, loading}) => {
            if(loading) return <Loading />;
            if(error) return <p>Error... {error.message}</p>
            return (
              <CarList>
                {data.cars.map(car => <Car key={car.id} car={car} />)}
              </CarList>
            )
          }}
        </Query>
        <Pagination page={this.props.page} />
      </div>
    );
  }
}

export default Cars;
export { ALL_CARS_QUERY };