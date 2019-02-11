// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
      const {app} = context;

      console.log(context.hooks)

      let users = await app.service("users").find();

      // if there are no users, then allow creation, otherwise, do not continue
      if(users.total === 0){
        return context;
      } else {
        throw new Error('Whoops! Only 1 user allowed');
      }
  };
};
