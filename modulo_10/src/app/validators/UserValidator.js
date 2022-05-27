import { compare } from 'bcryptjs';
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

  async show(req, res, next) {
    const { userId: id } = req.session;

    const user = await UserModel.findOne({ where: { id } });

    if (!user) {
      return res.render('user/register', { error: 'Usuário não encontrado' });
    }

    req.user = user;

    next();
  },

  async update(req, res, next) {
    const { id, password } = req.body;

    if (!password) {
      return res.render('user/index', {
        user: req.body,
        error: 'Coloque sua senha para atualizar o cadastro',
      });
    }

    const user = await UserModel.findOne({ where: { id } });

    const passed = await compare(password, user.password);

    if (!passed) {
      return res.render('user/index', {
        user: req.body,
        error: 'Senha invalida',
      });
    }

    req.user = user;

    next();
  },
};
