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
};
