const BaseModel = require('./BaseModel');

BaseModel.init({ table: 'categories' });

module.exports = {
  ...BaseModel,
};
