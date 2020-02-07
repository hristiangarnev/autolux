const { forwardTo } = require('prisma-binding');

const Query = {
  cars: forwardTo('db'),
  car: forwardTo('db')
};

module.exports = Query;