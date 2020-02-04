import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const CarItem = styled.div`
  display: flex;
  flex: 1 1 30%;

  img {
    display: block;
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
          pathname: '/item',
          query: { id: car.id }
        }}>
          <a>
            {car.image && <img src={car.image} alt={car.title} />}
            <h2>{car.title}</h2>
            <span>{car.price}</span>
            <p>{car.description}</p>
          </a>
        </Link>
      </CarItem>
    )
  }
}