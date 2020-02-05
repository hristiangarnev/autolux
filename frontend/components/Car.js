import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const CarItem = styled.div`
  flex: 1 0 10px;
  overflow: hidden;

  a {
    display: block;
    margin: 5px;
    border: 1px solid #dedede;
    border-radius: 3px;

    img {
      width: 100%;
      display: block;
      max-width: 100%;
    }

    h2,
    p,
    span {
      margin: 5px;
    }
  }
`;

export default class Car extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired
  }
  render() {
    const { car } = this.props;
    return (
      <CarItem>
        <Link href={{
          pathname: '/car',
          query: { id: car.id }
        }}>
          <a>
            {car.image && <img src={car.image} alt={car.title} />}
            <h2>{car.title}</h2>
            <span>{car.price}</span>
          </a>
        </Link>
      </CarItem>
    )
  }
}