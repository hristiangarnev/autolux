import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default class Car extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired
  }
  render() {
    const { car } = this.props;
    return (
      <div>
        {car.image && <img src={car.image} alt={car.title} />}
        <Link href={{
          pathname: '/item',
          query: { id: car.id }
        }}>
          <a>
            {car.title}
          </a>
        </Link>
        {car.price}
        {car.description}

        <div>
          <Link href={{
            pathname: 'update',
            query: { id: car.id }
          }}>
            <a>Edit</a>
          </Link>
          <button>Add to cart</button>
          <button>Delete</button>
        </div>
      </div>
    )
  }
}