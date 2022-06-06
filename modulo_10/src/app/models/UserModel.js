import { BaseModel } from './BaseModel';

BaseModel.init({ table: 'users' });

export default {
  ...BaseModel,
};
