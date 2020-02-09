const { forwardTo } = require('prisma-binding');

const Query = {
  cars: forwardTo('db'),
  car: forwardTo('db'),
  carsConnection: forwardTo('db')
};

module.exports = Query;