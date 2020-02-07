import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const SINGLE_CAR_QUERY = gql`
  query SINGLE_CAR_QUERY($id: ID!) {
    car(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

class SingleCar extends Component {
  render() {
    return (
      <Query query={SINGLE_CAR_QUERY} variables={{ id: this.props.id }}>
        {({data, error, loading}) => {
          if(loading) return <p>Loading...</p>
          if(error) return <p>Error... {error.message}</p>
          return (
            <div>
              <h2>{data.car.title}</h2>
              <img src={data.car.largeImage} />
            </div>
          )
        }}
      </Query>
    );
  }
}

export default SingleCar;