const BaseModel = require('./BaseModel');

BaseModel.init({ table: 'users' });

module.exports = {
  ...BaseModel,
};
