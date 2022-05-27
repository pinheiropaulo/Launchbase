const LoadProductService = require('../services/LoadProductService');
import { transport } from '../../lib/mailer';
import userModel from '../models/UserModel';

const email = (seller, product, buyer) => `
<div style="font-family: sans-serif; font-size: 16px; color: #111;">
  <h2>Olá ${seller.name}</h2>
  <p>Você tem um novo pedido de compra do seu produto</p>
  <p>Produto : ${product.name}</p>
  <p>Preço ${product.formattedPrice}</p>
  <p><br /></p>
  <h3>Dados do comprador</h3>
  <p>${buyer.name}</p>
  <p>${buyer.email}</p>
  <p>${buyer.address}</p>
  <p>${buyer.cep}</p>
  <p><br /></p>
  <p>
    <strong>
      Entre em contato com o comprado para finalizar a venda!
    </strong>
  </p>
  <p><br /></p>
  <p>Atenciosamente, Equipe LaunchStore</p>
</div>
`;

export default {
  async post(req, res) {
    try {
      const product = await LoadProductService.load('product', {
        where: { id: req.body.id },
      });

      const seller = await userModel.findOne({
        where: { id: product.user_id },
      });

      const buyer = await userModel.findOne({
        where: { id: req.session.userId },
      });

      await transport.sendMail({
        to: seller.email,
        from: 'no-replay@launchstore.com.br',
        subject: 'Novo pedido de compra',
        html: email(seller, product, buyer),
      });
      return res.render('orders/success');

      //
    } catch (error) {
      console.error(error);
      return res.render('orders/error');
    }
  },
};
