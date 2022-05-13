import UserModel from '../models/UserModel';

export default {
  async post(req, res, next) {
    const { email, cpf_cnpj, password, passwordRepeat } = req.body;

    const user = await UserModel.findOne({
      where: { email },
      or: { cpf_cnpj },
    });

    if (user) {
      return res.render('user/register', {
        user: req.body,
        error: 'Usuário já cadastrado',
      });
    }

    if (password != passwordRepeat) {
      return res.render('user/register', {
        user: req.body,
        error: 'Senha invalida',
      });
    }

    next();
  },
};
