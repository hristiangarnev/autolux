const { forwardTo } = require('prisma-binding');

const Query = {
  cars: forwardTo('db')
  // async cars(parent, args, ctx, info) {
  //   const cars = await ctx.db.query.cars();
  //   return cars;
  // }
};

module.exports = Query;