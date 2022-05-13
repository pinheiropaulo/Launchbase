import UserModel from '../models/UserModel';

const { formatCep, formatCpfCnpj } = require('../../lib/utils');

export default {
  registerForm(req, res) {
    return res.render('user/register');
  },

  async show(req, res) {
    const { user } = req;

    user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj);
    user.cep = formatCep(user.cep);

    return res.render('user/index', { user });
  },

  async post(req, res) {
    const userId = await UserModel.create(req.body);

    req.session.userId = userId;

    return res.redirect('/users');
  },

  async update(req, res) {
    try {
      const { user } = req;

      let { name, email, cpf_cnpj, cep, address } = req.body;

      cpf_cnpj = cpf_cnpj.replace(/\D/g, '');
      cep = cep.replace(/\D/g, '');

      await UserModel.update(user.id, {
        name,
        email,
        cpf_cnpj,
        cep,
        address,
      });

      return res.render('user/index', {
        user: req.body,
        success: 'Conta atualizada',
      });
      //
    } catch (error) {
      console.error(error);
      return res.render('user/index', {
        error: 'Algo deu errado',
      });
    }
  },
};
