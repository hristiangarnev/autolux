import React, { Component } from 'react';
import UpdateCar from '../components/UpdateCar';

const Sell = props => (
  <UpdateCar id={props.query.id} />
);

export default Sell;