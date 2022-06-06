import { BaseModel } from './BaseModel';

BaseModel.init({ table: 'categories' });

export default {
  ...BaseModel,
};
