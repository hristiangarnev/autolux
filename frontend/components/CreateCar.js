import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import styled from "styled-components";
import { cars, colors } from "../../backend/src/constants/cars";

const CREATE_CAR_MUTATION = gql`
  mutation CREATE_CAR_MUTATION(
    $title: String!
    $make: String!
    $model: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
    $mileage: Int!
    $transmission: String!
    $year: Int!
    $numOfGears: Int!
    $bodyType: String!
    $numOfDoors: Int!
    $power: Int!
    $color: String!
    $engine: String!
    $driveWheel: String!
  ) {
    createCar(
      title: $title
      make: $make
      model: $model
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
      mileage: $mileage
      transmission: $transmission
      year: $year
      numOfGears: $numOfGears
      bodyType: $bodyType
      numOfDoors: $numOfDoors
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
    align-items: center;
    margin: 5px 0;

    select,
    textarea,
    input {
      font-size: 16px;
      width: 150px;
    }
  }

  fieldset {
  }

  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  .images,
  fieldset {
    display: flex;
  }

  .images {
    flex-basis: 70%;

    img {
      max-width: 100%;
      object-fit: contain;
    }
  }

  fieldset {
    flex-direction: column;
    flex-basis: calc(30% - 5px);
    margin: 0 5px 0 0;
    padding: 10px;
    border: 1px solid #ccc;
  }

  .description {
    display: flex;
    flex-basis: 100%;
  }
`;

class CreateCar extends Component {
  state = {
    title: "",
    make: "",
    model: "",
    description: "",
    price: 0,
    image: "",
    largeImage: "",
    mileage: 0,
    transmission: "",
    year: 0,
    numOfGears: "",
    bodyType: "",
    numOfDoors: 0,
    power: 0,
    color: "",
    engine: "",
    driveWheel: ""
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "autolux");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/hristiangarnev/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const file = await res.json();

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val =
      type === "number" ||
      name === "year" ||
      name === "numOfGears" ||
      name === "numOfDoors"
        ? parseFloat(value)
        : value;

    this.setState({ [name]: val });
  };

  render() {
    const years = [];

    for (let i = 1900; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }

    return (
      <div className="sell">
        <h2>Sell A Car</h2>
        <Mutation mutation={CREATE_CAR_MUTATION} variables={this.state}>
          {(createCar, { loading, error }) => (
            <SellForm
              action=""
              onSubmit={async e => {
                e.preventDefault();
                const res = await createCar();

                Router.push({
                  pathname: "/car",
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

                <label htmlFor="make">
                  Make
                  <select
                    id="make"
                    name="make"
                    required
                    value={this.state.make}
                    onChange={this.handleChange}
                  >
                    {Object.entries(cars).map(car => (
                      <option key={car} value={car[0]}>
                        {car[0]}
                      </option>
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
                    {cars[this.state.make].map(model => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
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
                      <option key={year} value={year}>
                        {year}
                      </option>
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

                <label htmlFor="numOfDoors">
                  Num Of Doors
                  <select
                    id="numOfDoors"
                    name="numOfDoors"
                    required
                    value={this.state.numOfDoors}
                    onChange={this.handleChange}
                  >
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
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

                <label htmlFor="color">
                  Color
                  <select
                    id="color"
                    name="color"
                    required
                    value={this.state.color}
                    onChange={this.handleChange}
                  >
                    {colors.map(color => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </label>

                <label htmlFor="engine">
                  Engine
                  <select
                    id="engine"
                    name="engine"
                    required
                    value={this.state.engine}
                    onChange={this.handleChange}
                  >
                    <option value="electric">Electric</option>
                    <option value="diesel">Diesel</option>
                    <option value="petrol">Petrol</option>
                    <option value="gasoline">Gasoline</option>
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

              <div className="images">
                {this.state.image && (
                  <img src={this.state.image} alt="Upload preview" />
                )}
              </div>
            </SellForm>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateCar;
export { CREATE_CAR_MUTATION };
