import React, { Component } from 'react';
import { withRouter } from 'next/router';
import SingleCar from '../components/SingleCar';
import Loading from '../components/Loading';

const car = withRouter(({ router }) => {
  if(!router) return <Loading />
  return (
    <SingleCar id={router.query.id} />
  );
});

export default car;