import UserModel from '../models/UserModel';

export default {
  async post(req, res, next) {
    const { email, cpf_cnpj, password, passwordRepeat } = req.body;

    const user = await UserModel.findOne({
      where: { email },
      or: { cpf_cnpj },
    });

    if (user) {
      return res.send('User exists');
    }

    if (password != passwordRepeat) {
      return res.send('Password Mismatch');
    }

    next();
  },
};
