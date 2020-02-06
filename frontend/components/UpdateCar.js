import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    car(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_CAR_MUTATION = gql`
  mutation UPDATE_CAR_MUTATION(
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

class UpdateCar extends Component {
  state = {};

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  render() {
    return (
      <div>
        <h2>Sell a car</h2>
        <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
          {({data, loading}) => {
            if(loading) {
              return <p>Loading</p>
            }
            return (
              <Mutation mutation={UPDATE_CAR_MUTATION} variables={this.state}>
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
                          value={data.car.description}
                          onChange={this.handleChange}
                        ></textarea>
                      </label>

                      <button type="submit">Submit</button>
                    </fieldset>
                  </form>
                )}
              </Mutation>
              )
            }}
          </Query>
      </div>
    );
  }
}

export default UpdateCar;
export { UPDATE_CAR_MUTATION };