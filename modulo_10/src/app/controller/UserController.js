import { hash } from 'bcryptjs';
import { unlinkSync } from 'fs';
import { formatCep, formatCpfCnpj } from '../../lib/utils';
import ProductModel from '../models/ProductModel';
import UserModel from '../models/UserModel';
import { LoadService } from '../services/LoadProductService';

export default {
  registerForm(req, res) {
    return res.render('user/register');
  },

  async show(req, res) {
    try {
      const { user } = req;

      user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj);
      user.cep = formatCep(user.cep);

      return res.render('user/index', { user });
    } catch (error) {
      console.error(error);
    }
  },

  async post(req, res) {
    try {
      let { name, email, password, cpf_cnpj, cep, address } = req.body;

      password = await hash(password, 8);
      cpf_cnpj = cpf_cnpj.replace(/\D/g, '');
      cep = cep.replace(/\D/g, '');

      const userId = await UserModel.create({
        name,
        email,
        password,
        cpf_cnpj,
        cep,
        address,
      });

      req.session.userId = userId;

      return res.redirect('/users');
    } catch (error) {
      console.error(error);
    }
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
      const products = await ProductModel.findAll({
        where: { user_id: req.body.id },
      });

      const allFilesPromise = products.map((product) =>
        ProductModel.files(product.id),
      );

      let promiseResults = await Promise.all(allFilesPromise);

      await UserModel.delete(req.body.id);
      req.session.destroy();

      promiseResults.map((files) => {
        files.map((file) => {
          try {
            unlinkSync(file.path);
          } catch (error) {
            console.error(error);
          }
        });
      });

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

  async ads(req, res) {
    const products = await LoadService.load('products', {
      where: { user_id: req.session.userId },
    });

    return res.render('user/ads', { products });
  },
};
