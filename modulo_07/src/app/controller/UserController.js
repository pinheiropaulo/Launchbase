export default {
  registerForm(req, res) {
    return res.render('user/register');
  },

  async post(req, res) {
    return res.send('passed');
  },
};
