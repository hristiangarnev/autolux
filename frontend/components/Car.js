import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import DeleteCar from "./DeleteCar";
import User from "./User";

const CarItem = styled.div`
  flex: 0 0 33.3333%;
  overflow: hidden;

  .car-holder {
    background: #fff;
    display: block;
    margin: 0 5px;
    border: 1px solid #dedede;
    border-radius: 3px;

    .img-holder {
      overflow: hidden;

      img {
        width: 100%;
        display: block;
        max-width: 100%;
        transition: all 0.2s ease-in-out;
      }
    }

    h2 {
      font-size: 16px;
    }

    h2,
    p,
    span {
      margin: 5px;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .car-buttons {
    display: flex;
    margin: 0 5px;

    a,
    button {
      display: flex;
      flex: 1;
      font-size: 15px;
      border: none;
      padding: 5px;
    }
  }
`;

export default class Car extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired
  };
  render() {
    const { car } = this.props;
    return (
      <CarItem>
        <Link
          href={{
            pathname: "/car",
            query: { id: car.id }
          }}
        >
          <a className="car-holder">
            <div className="img-holder">
              {car.image && <img src={car.image} alt={car.title} />}
            </div>
            <h2>{car.title}</h2>
            <span>{car.price}</span>
          </a>
        </Link>
        <User>
          {({ data: { me } }) =>
            me && (
              <div className="car-buttons">
                <Link
                  href={{
                    pathname: "/update",
                    query: { id: car.id }
                  }}
                >
                  <a>Update</a>
                </Link>
                <DeleteCar id={car.id}>Delete</DeleteCar>
              </div>
            )
          }
        </User>
      </CarItem>
    );
  }
}
