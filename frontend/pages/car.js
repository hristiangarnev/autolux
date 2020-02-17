import React, { Component } from 'react';
import SingleCar from '../components/SingleCar';

const car = props => (
  <SingleCar id={props.query.id} />
);

export default car;