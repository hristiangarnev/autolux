import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag'

const CREATE_CAR_MUTATION = gql`
  mutation CREATE_CAR_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createCar(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateCar extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  render() {
    return (
      <div>
        <h2>Sell a car</h2>
        <Mutation mutation={CREATE_CAR_MUTATION} variables={this.state}>
          {(createCar, { loading, error}) => (
            <form action="" onSubmit={async (e) => {
                e.preventDefault();
                const res = await createCar();

                Router.push({
                  pathname: '/car',
                  query: { id: res.data.createCar.id }
                });
              }}
            >
              <fieldset disabled={loading}>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    required
                    value={this.state.value}
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
                    value={this.state.price}
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
                    value={this.state.description}
                    onChange={this.handleChange}
                  ></textarea>
                </label>

                <button type="submit">Submit</button>
              </fieldset>
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateCar;
export { CREATE_CAR_MUTATION };