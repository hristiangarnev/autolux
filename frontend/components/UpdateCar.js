import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag'
import Loading from './Loading';

const SINGLE_CAR_QUERY = gql`
  query SINGLE_CAR_QUERY($id: ID!) {
    car(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;
const UPDATE_CAR_MUTATION = gql`
  mutation UPDATE_CAR_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateCar(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`;

class UpdateCar extends Component {
  state = {};

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  updateCar = async (e, updateCarMutation) => {
    e.preventDefault();

    const res = await updateCarMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });

  };

  render() {
    return (
      <div className="car-update">
        <h2>Sell a car</h2>
        <Query
          query={SINGLE_CAR_QUERY}
          variables={{ id: this.props.id }}
        >
          {({data, loading}) => {
            if(loading) return <Loading />
            if(!data.car) return <p>No car found</p>
            return (
              <div>
                <Mutation mutation={UPDATE_CAR_MUTATION} variables={this.state}>
                  {(updateCar, { loading, error}) => (
                    <form onSubmit={e => this.updateCar(e, updateCar)}>
                      <fieldset disabled={loading}>
                        <label htmlFor="title">
                          Title
                          <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title"
                            required
                            defaultValue={data.car.title}
                            onChange={this.handleChange}
                          />
                        </label>

                        <label htmlFor="price">
                          Price
                          <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Price"
                            required
                            defaultValue={data.car.price}
                            onChange={this.handleChange}
                          />
                        </label>

                        <label htmlFor="description">
                          Description
                          <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            required
                            defaultValue={data.car.description}
                            onChange={this.handleChange}
                          ></textarea>
                        </label>

                        <button type="submit">Sav{loading ? 'ing' : 'e'} changes</button>
                      </fieldset>
                    </form>
                  )}
                </Mutation>
              </div>
            )
          }}
        </Query>
      </div>
    );
  }
}

export default UpdateCar;
export { UPDATE_CAR_MUTATION };