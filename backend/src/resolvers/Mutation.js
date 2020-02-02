const Mutation = {
  async createCar(parent, args, ctx, info) {
    const car = await ctx.db.mutation.createCar({
      data: {
        ...args
      }
    }, info);
    
    return car;
  }
};

module.exports = Mutation;