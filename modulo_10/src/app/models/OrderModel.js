import { BaseModel } from './BaseModel';

BaseModel.init({ table: 'orders' });

export default {
  ...BaseModel,
};
