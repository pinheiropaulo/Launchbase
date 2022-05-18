import crypto from 'crypto';
import { transport } from '../../lib/mailer';
import UserModel from '../models/UserModel';
const { hash } = require('bcryptjs');

export default {
  logout(req, res) {
    req.session.destroy((err) => {
      return res.redirect('/');
    });
  },

  loginForm(req, res) {
    return res.render('session/login');
  },

  login(req, res) {
    req.session.userId = req.user.id;

    return res.redirect('/users');
  },

  forgotForm(req, res) {
    return res.render('session/forgot-password');
  },

  async forgot(req, res) {
    try {
      const user = req.user;

      const token = crypto.randomBytes(20).toString('hex');

      let now = new Date();
      now = now.setHours(now.getHours() + 1);

      await UserModel.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });

      console.log(token);
      console.log(user);

      await transport.sendMail({
        to: user.email,
        from: 'no-reply@launchstore.com.br',
        subject: 'Recuperação de senha',
        html: [
          `<div style="font-family: sans-serif; font-size: 16px; color: #111;" >`,
          `<h2>Esqueceu sua senha ?</h2>`,
          `<p>Não se preocupe! Clique no link abaixo para fazer uma nova senha</p>`,
          `<p>`,
          `<a href="http://localhost:8080/users/password-reset?token=${token}" target="_blank">`,
          `RECUPERAR SENHA`,
          `</a>`,
          `</p>`,
          `</div>`,
        ].join('\n'),
      });

      return res.render('session/forgot-password', {
        success: 'Verifique seu email para resetar sua senha!',
      });
    } catch (error) {
      console.error(error);

      return res.render('session/forgot-password', {
        success: 'Algo deu errado, favor tentar novamente...',
      });
    }
  },

  resetForm(req, res) {
    return res.render('session/password-reset', { token: req.query.token });
  },

  async reset(req, res) {
    const user = req.user;
    const { password } = req.body;

    try {
      const newPassword = await hash(password, 8);

      await UserModel.update(user.id, {
        password: newPassword,
        reset_token: '',
        reset_token_expires: '',
      });

      return res.render('session/login', {
        user: req.body,
        success: 'Senha atualizada com sucesso',
      });
      //
    } catch (error) {
      console.error(error);

      return res.render('session/password-reset', {
        user: req.body,
        success: 'Algo deu errado, favor tentar novamente...',
      });
    }
  },
};
