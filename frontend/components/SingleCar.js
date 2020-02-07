import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from './Loading';

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
          if(error) return <p>Error... {error.message}</p>
          return (
            <div className="car-view">
              <h2>{data.car.title}</h2>
              <img src={data.car.largeImage} />
              <span>{data.car.price}</span>
            </div>
          )
        }}
      </Query>
    );
  }
}

export default SingleCar;