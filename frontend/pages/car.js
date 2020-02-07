import React, { Component } from 'react';
import { withRouter } from "next/router";
import SingleCar from '../components/SingleCar';

const car = withRouter(({ router }) => {
  if(!router.query.id) return <div>Loading...</div>;

  return (
    <SingleCar id={router.query.id} />
  );
});

export default car;