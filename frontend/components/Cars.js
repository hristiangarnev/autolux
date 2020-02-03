import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
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
`
export default class Cars extends Component {
  render() {
    return (
      <div>
        Cars
        <Query query={ALL_CARS_QUERY}>
          {({data, error, loading}) => {
            if(loading) return <p>Loading...</p>
            if(error) return <p>Error... {error.message}</p>
            return <div>
              {data.cars.map(car => <Car key={car.id} car={car} />)}
            </div>
          }}
        </Query>
      </div>
    );
  }
}