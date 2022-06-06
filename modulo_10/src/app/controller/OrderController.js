import { Cart } from '../../lib/cart';
import { transport } from '../../lib/mailer';
import orderModel from '../models/OrderModel';
import userModel from '../models/UserModel';
import { LoadOrder } from '../services/LoadOrderService';
import { LoadService } from '../services/LoadProductService';

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
  async index(req, res) {
    const orders = await LoadOrder.load('orders', {
      where: { buyer_id: req.session.userId },
    });

    return res.render('orders/index', { orders });
  },

  async sales(req, res) {
    const sales = await LoadOrder.load('orders', {
      where: { seller_id: req.session.userId },
    });

    return res.render('orders/sales', { sales });
  },

  async show(req, res) {
    const order = await LoadOrder.load('order', {
      where: { id: req.params.id },
    });

    return res.render('orders/details', { order });
  },

  async post(req, res) {
    try {
      const cart = Cart.init(req.session.cart);

      const buyer_id = req.session.userId;

      const filteredItems = cart.items.filter(
        (item) => item.product.user_id != buyer_id,
      );

      const createOrderPromise = filteredItems.map(async (item) => {
        let { product, price: total, quantity } = item;
        const { price, id: product_id, user_id: seller_id } = product;
        const status = 'open';

        const order = await orderModel.create({
          seller_id,
          buyer_id,
          product_id,
          price,
          total,
          quantity,
          status,
        });

        product = await LoadService.load('product', {
          where: { id: product_id },
        });

        const seller = await userModel.findOne({
          where: { id: seller_id },
        });

        const buyer = await userModel.findOne({
          where: { id: buyer_id },
        });

        await transport.sendMail({
          to: seller.email,
          from: 'no-replay@launchstore.com.br',
          subject: 'Novo pedido de compra',
          html: email(seller, product, buyer),
        });

        return order;
      });

      await Promise.all(createOrderPromise);

      delete req.session.cart;
      Cart.init();

      return res.render('orders/success');

      //
    } catch (error) {
      console.error(error);
      return res.render('orders/error');
    }
  },

  async update(req, res) {
    try {
      const { id, action } = req.params;

      const acceptedAction = ['close', 'cancel'];

      if (!acceptedAction.includes(action)) {
        return res.send("Can't do this action");
      }

      const order = await orderModel.findOne({
        where: { id },
      });

      if (!order) {
        return res.send('Order not found');
      }

      if (order.status != 'open') {
        return res.send("Can't do this action");
      }

      const statuses = {
        close: 'sold',
        cancel: 'canceled',
      };

      order.status = statuses[action];

      await orderModel.update(id, {
        status: order.status,
      });

      return res.redirect('/orders/sales');
    } catch (error) {
      console.error(error);
    }
  },
};
