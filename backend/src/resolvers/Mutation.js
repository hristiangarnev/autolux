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
  }
};

module.exports = Mutation;