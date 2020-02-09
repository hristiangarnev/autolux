const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutation = {
  async createCar(parent, args, ctx, info) {
    const car = await ctx.db.mutation.createCar({
      data: {
        ...args
      }
    }, info);

    return car;
  },

  updateCar(parent, args, ctx, info) {
    const updates = { ...args };

    delete updates.id;
    return ctx.db.mutation.updateCar({
      data: updates,
      where: { id: args.id }
    }, info)
  },

  async deleteCar(parent, args, ctx, info) {
    const where = { id: args.id }
    const car = await ctx.db.query.car({ where }, `{ id, title }`);

    return ctx.db.mutation.deleteCar({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);

    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: ['USER'] }
      }
    }, info);

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  }
};

module.exports = Mutation;