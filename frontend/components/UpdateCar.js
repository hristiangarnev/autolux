import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Loading from "./Loading";
import { cars, colors } from "../../backend/src/constants/cars";

const SINGLE_CAR_QUERY = gql`
  query SINGLE_CAR_QUERY($id: ID!) {
    car(where: { id: $id }) {
      id
      title
      make
      model
      description
      price
      mileage
      transmission
      year
      numOfGears
      bodyType
      numOfDoors
      power
      color
      engine
      driveWheel
    }
  }
`;
const UPDATE_CAR_MUTATION = gql`
  mutation UPDATE_CAR_MUTATION(
    $id: ID!
    $title: String
    $make: String
    $model: String
    $description: String
    $price: Int
    $mileage: Int
    $transmission: String
    $year: Int
    $numOfGears: Int
    $bodyType: String
    $numOfDoors: Int
    $power: Int
    $color: String
    $engine: String
    $driveWheel: String
  ) {
    updateCar(
      id: $id
      title: $title
      make: $make
      model: $model
      description: $description
      price: $price
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
      title
      make
      model
      description
      price
      mileage
      transmission
      year
      numOfGears
      bodyType
      numOfDoors
      power
      color
      engine
      driveWheel
    }
  }
`;

const UpdateForm = styled.form`
  label {
    display: flex;
  }
`;

class UpdateCar extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;

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
    const years = [];

    for (let i = 1900; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }
    return (
      <div className="car-update">
        <h2>Update A Car</h2>
        <Query query={SINGLE_CAR_QUERY} variables={{ id: this.props.id }}>
          {({ data, loading }) => {
            if (loading) return <Loading />;
            if (!data.car) return <p>No car found</p>;
            return (
              <Mutation mutation={UPDATE_CAR_MUTATION} variables={this.state}>
                {(updateCar, { loading, error }) => (
                  <UpdateForm onSubmit={e => this.updateCar(e, updateCar)}>
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

                      <label htmlFor="make">
                        Make
                        <select
                          id="make"
                          name="make"
                          required
                          defaultValue={data.car.make}
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
                          defaultValue={data.car.model}
                          onChange={this.handleChange}
                        >
                          {cars[data.car.make].map(model => (
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
                          defaultValue={data.car.description}
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
                          defaultValue={data.car.price}
                          onChange={this.handleChange}
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
                          defaultValue={data.car.mileage}
                          onChange={this.handleChange}
                        />
                      </label>

                      <label htmlFor="transmission">
                        Transmission
                        <select
                          id="transmission"
                          name="transmission"
                          required
                          defaultValue={data.car.transmission}
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
                          defaultValue={data.car.year}
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
                          defaultValue={data.car.numOfGears}
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
                          defaultValue={data.car.bodyType}
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
                          defaultValue={data.car.numOfDoors}
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
                          defaultValue={data.car.power}
                          onChange={this.handleChange}
                        />
                      </label>

                      <label htmlFor="color">
                        Color
                        <select
                          id="color"
                          name="color"
                          required
                          defaultValue={data.car.color}
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
                          defaultValue={data.car.engine}
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
                          defaultValue={data.car.driveWheel}
                          onChange={this.handleChange}
                        >
                          <option value="Front Wheel Drive">
                            Front Wheel Drive
                          </option>
                          <option value="Rear Wheel Drive">
                            Rear Wheel Drive
                          </option>
                          <option value="4x4">4x4</option>
                          <option value="6x6">6x6</option>
                        </select>
                      </label>

                      <button type="submit">
                        Sav{loading ? "ing" : "e"} changes
                      </button>
                    </fieldset>
                  </UpdateForm>
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default UpdateCar;
export { UPDATE_CAR_MUTATION };
