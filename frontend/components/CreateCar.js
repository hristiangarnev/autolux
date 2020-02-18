import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag'
import styled from 'styled-components';
import cars from '../../backend/src/constants/cars';
import colors from '../../backend/src/constants/colors';

const CREATE_CAR_MUTATION = gql`
  mutation CREATE_CAR_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
    $price: Int!
    $make: String!
    $model: String!
    $mileage: Int!
    $fuelType: String!
    $transmission: String!
    $year: Int!
    $numOfGears: Int!
    $bodyType: String!
    $power: Int!
    $color: String!
    $engine: String!
    $driveWheel: String!
  ) {
    createCar(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
      price: $price
      make: $make
      model: $model
      mileage: $mileage
      fuelType: $fuelType
      transmission: $transmission
      year: $year
      numOfGears: $numOfGears
      bodyType: $bodyType
      power: $power
      color: $color
      engine: $engine
      driveWheel: $driveWheel
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
    make: '',
    model: '',
    mileage: 0,
    fuelType: '',
    transmission: '',
    year: 0,
    numOfGears: '',
    bodyType: '',
    power: 0,
    color: '',
    engine: '',
    driveWheel: ''
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
    const years = [];

    for(let i = 1900; i <= (new Date()).getFullYear(); i++) {
      years.push(i);
    }

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
                      <option key={index} value={car[0]}>{car[0]}</option>
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
                      <option key={index} value={model}>{model}</option>
                    ))}
                  </select>
                </label>

                <label htmlFor="mileage">
                  Mileage
                  <input
                    type="number"
                    id="mileage"
                    name="mileage"
                    placeholder="mileage"
                    required
                    value={this.state.mileage}
                    onChange={this.handleChange}
                  />
                </label>

                <label htmlFor="fuelType">
                  Fuel Type
                  <select
                    id="fuelType"
                    name="fuelType"
                    required
                    value={this.state.fuelType}
                    onChange={this.handleChange}
                  >
                    <option value="gasoline">Gasoline</option>
                    <option value="diesel">Diesel</option>
                    <option value="petrol">Petrol</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                  </select>
                </label>

                <label htmlFor="transmission">
                  Transmission
                  <select
                    id="transmission"
                    name="transmission"
                    required
                    value={this.state.transmission}
                    onChange={this.handleChange}
                  >
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </label>

                <label htmlFor="year">
                  Year
                  <select
                    id="year"
                    name="year"
                    required
                    value={this.state.year}
                    onChange={this.handleChange}
                  >
                    {years.map(year => (
                      <option value={year}>{year}</option>
                    ))}
                  </select>
                </label>

                <label htmlFor="numOfGears">
                  Number Of Gears
                  <select
                    id="numOfGears"
                    name="numOfGears"
                    required
                    value={this.state.numOfGears}
                    onChange={this.handleChange}
                  >
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                </label>

                <label htmlFor="bodyType">
                  Body Type
                  <select
                    id="bodyType"
                    name="bodyType"
                    required
                    value={this.state.bodyType}
                    onChange={this.handleChange}
                  >
                    <option value="sedan">Sedan</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="mpv">MPV</option>
                    <option value="suv">SUV</option>
                    <option value="crossover">Crossover</option>
                    <option value="coupe">Coupe</option>
                    <option value="convertible">Convertible</option>
                  </select>
                </label>

                <label htmlFor="power">
                  Power
                  <input
                    type="number"
                    id="power"
                    name="power"
                    placeholder="power"
                    required
                    value={this.state.power}
                    onChange={this.handleChange}
                  />
                </label>

                <label htmlFor="bodyType">
                  Body Type
                  <select
                    id="bodyType"
                    name="bodyType"
                    required
                    value={this.state.bodyType}
                    onChange={this.handleChange}
                  >
                    <option value="sedan">Sedan</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="mpv">MPV</option>
                    <option value="suv">SUV</option>
                    <option value="crossover">Crossover</option>
                    <option value="coupe">Coupe</option>
                    <option value="convertible">Convertible</option>
                  </select>
                </label>

                <label htmlFor="color">
                  Color
                  <select
                    id="color"
                    name="color"
                    required
                    value={this.state.color}
                    onChange={this.handleChange}
                  >
                    {colors.map((color, index) => (
                      <option key={index} value={color}>{color}</option>
                    ))}
                  </select>
                </label>

                <label htmlFor="driveWheel">
                  Drive Wheel
                  <select
                    id="driveWheel"
                    name="driveWheel"
                    required
                    value={this.state.driveWheel}
                    onChange={this.handleChange}
                  >
                    <option value="Front Wheel Drive">Front Wheel Drive</option>
                    <option value="Rear Wheel Drive">Rear Wheel Drive</option>
                    <option value="4x4">4x4</option>
                    <option value="6x6">6x6</option>
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