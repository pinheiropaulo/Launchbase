import { formatCep, formatCpfCnpj } from '../../lib/utils';
import UserModel from '../models/UserModel';

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

  async delete(req, res) {
    try {
      await UserModel.delete(req.body.id);

      req.session.destroy();

      return res.render('session/login', {
        success: 'Conta deletada com sucesso',
      });
      //
    } catch (error) {
      console.error(error);
      return res.render('user/index', {
        user: req.body,
        error: 'Erro ao tentar deletar sua conta',
      });
    }
  },
};
