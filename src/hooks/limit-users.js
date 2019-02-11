// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const {app} = context;

    let users = await app.service("users").find();
    
    if(users.total <= 1){
      return context;
    } else {
      return new Error("only 1 user is allowed here!")
    }
    
  };
};
