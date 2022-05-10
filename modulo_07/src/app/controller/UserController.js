import UserModel from '../models/UserModel';

export default {
  registerForm(req, res) {
    return res.render('user/register');
  },

  async show(req, res) {
    return res.send('cadastro realizado');
  },

  async post(req, res) {
    const userId = await UserModel.create(req.body);

    return res.redirect('/users');
  },
};
