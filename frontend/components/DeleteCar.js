import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_CARS_QUERY } from './Cars';

const DELETE_CAR_MUTATION = gql`
  mutation DELETE_CAR_MUTATION($id: ID!) {
    deleteCar(id: $id) {
      id
    }
  }
`;
class DeleteCar extends Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_CARS_QUERY });

    data.cars = data.cars.filter(car => car.id !== payload.data.deleteCar.id);
    cache.writeQuery({ query: ALL_CARS_QUERY, data });
  }
  render() {
    return (
      <Mutation
        mutation={DELETE_CAR_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteCar, { error }) => (
          <button onClick={() => {
            if(confirm('Are you sure')) {
              deleteCar();
            }
          }}>{this.props.children}</button>
        )}
      </Mutation>
    );
  }
}

export default DeleteCar;