import { compare } from 'bcryptjs';
import UserModel from '../models/UserModel';

export default {
  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.render('session/login', {
        user: req.body,
        error: 'Usuário não cadastrado',
      });
    }

    const passed = await compare(password, user.password);

    if (!passed) {
      return res.render('session/login', {
        user: req.body,
        error: 'Senha invalida',
      });
    }

    req.user = user;

    next();
  },

  async forgot(req, res, next) {
    const { email } = req.body;

    try {
      let user = await UserModel.findOne({ where: { email } });

      if (!user) {
        return res.render('session/forgot-password', {
          user: req.body,
          error: 'Email não cadastrado',
        });
      }

      req.user = user;

      next();
    } catch (error) {
      console.error(error);
    }
  },

  async reset(req, res, next) {
    const { email, password, passwordRepeat, token } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Usuário não cadastrado',
      });
    }

    if (password != passwordRepeat) {
      return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Senha invalida',
      });
    }

    if (token != user.reset_token) {
      return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Token inválido!',
      });
    }

    let now = new Date();
    now = now.setHours(now.getHours());

    if (now > user.reset_token_expires) {
      return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Token Expirado!',
      });
    }

    req.user = user;

    //
    next();
  },
};
