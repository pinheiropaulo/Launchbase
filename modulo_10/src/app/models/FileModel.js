import { BaseModel } from './BaseModel';

BaseModel.init({ table: 'files' });

export default {
  ...BaseModel,
};
