import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag'
import styled from 'styled-components';
import cars from '../../backend/src/constants/cars';

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

const SellForm = styled.form`
  label {
    display: flex;
  }
`;

class CreateCar extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
    make: ''
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'autolux');

    const res = await fetch('https://api.cloudinary.com/v1_1/hristiangarnev/image/upload', {
      method: 'POST',
      body: data
    });

    const file = await res.json();

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
  }

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
            <SellForm action="" onSubmit={async (e) => {
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

                <label htmlFor="file">
                  Image
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Upload an image"
                    required
                    onChange={this.uploadFile}
                  />
                  {this.state.image && <img src={this.state.image} alt="Upload preview" />}
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

                <label htmlFor="make">
                  Make
                  <select
                    id="make"
                    name="make"
                    required
                    value={this.state.make}
                    onChange={this.handleChange}
                  >
                    {Object.entries(cars).map((car, index) => (
                      <option key={index}>{car[0]}</option>
                    ))}
                  </select>
                </label>

                <label htmlFor="model">
                  Model
                  <select
                    id="model"
                    name="model"
                    required
                    value={this.state.model}
                    onChange={this.handleChange}
                  >
                    {cars[this.state.make].map((model, index) => (
                      <option key={index}>{model}</option>
                    ))}
                  </select>
                </label>

                <button type="submit">Submit</button>
              </fieldset>
            </SellForm>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateCar;
export { CREATE_CAR_MUTATION };