import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import styled from "styled-components";
import Loading from "./Loading";

const SingleCarElement = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  h2 {
    display: flex;
    flex-basis: 100%;
  }

  .images,
  .info {
    display: flex;
  }

  .images {
    flex-basis: 70%;

    img {
      max-width: 100%;
      object-fit: contain;
    }
  }

  .info {
    flex-direction: column;
    flex-basis: calc(30% - 5px);
    margin-right: 5px;
    padding: 10px;
    border: 1px solid #ccc;

    p {
      margin: 5px 0;
    }
  }

  .description {
    display: flex;
    flex-basis: 100%;
  }
`;

const SINGLE_CAR_QUERY = gql`
  query SINGLE_CAR_QUERY($id: ID!) {
    car(where: { id: $id }) {
      id
      title
      make
      model
      description
      price
      image
      largeImage
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

class SingleCar extends Component {
  render() {
    return (
      <Query query={SINGLE_CAR_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (loading) return <Loading />;
          if (!data.car)
            return <div>Error! No car with id {this.props.id} found!</div>;
          if (error) return <p>Error... {error.message}</p>;

          const car = data.car;

          return (
            <SingleCarElement>
              <Head>
                <title>{car.title} | AutoLux</title>
              </Head>
              <h2>{car.title}</h2>
              <aside className="info">
                <p>Make: {car.make}</p>
                <p>Model: {car.model}</p>
                <p>Price: {car.price}</p>
                <p>Mileage: {car.mileage}</p>
                <p>Engine: {car.engine}</p>
                <p>Transmission: {car.transmission}</p>
                <p>Year: {car.year}</p>
                <p>Num Of Gears: {car.numOfGears}</p>
                <p>Power: {car.power}</p>
                <p>Color: {car.color}</p>
                <p>Engine: {car.engine}</p>
                <p>Drive Wheel: {car.driveWheel}</p>
              </aside>
              <div className="images">
                <img src={car.largeImage} />
              </div>
              <div className="description">
                <p>{car.description}</p>
              </div>
            </SingleCarElement>
          );
        }}
      </Query>
    );
  }
}

export default SingleCar;
