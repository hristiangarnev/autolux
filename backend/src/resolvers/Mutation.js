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
      where: id === args.id
    }, info)
  }
};

module.exports = Mutation;