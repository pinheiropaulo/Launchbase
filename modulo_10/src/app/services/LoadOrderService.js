import { date, formatPrice } from '../../lib/utils';
import orderModel from '../models/OrderModel';
import userModel from '../models/UserModel';
import { LoadService } from './LoadProductService';

async function format(order) {
  order.product = await LoadService.load('productWithDeleted', {
    where: { id: order.product_id },
  });

  order.buyer = await userModel.findOne({
    where: { id: order.buyer_id },
  });

  order.seller = await userModel.findOne({
    where: { id: order.seller_id },
  });

  order.formattedPrice = formatPrice(order.price);
  order.formattedTotal = formatPrice(order.total);

  const statuses = {
    open: 'Aberto',
    sold: 'Vendido',
    canceled: 'Cancelado',
  };

  order.formattedStatus = statuses[order.status];

  const updatedAt = date(order.updated_at);

  order.formattedUpdatedAt = `${order.formattedStatus} em ${updatedAt.day}/${updatedAt.month}/${updatedAt.year} às ${updatedAt.hour}h${updatedAt.minute}`;

  return order;
}

export const LoadOrder = {
  load(service, filter) {
    this.filter = filter;
    return this[service]();
  },

  async order() {
    try {
      const order = await orderModel.findOne(this.filter);

      return format(order);
    } catch (error) {
      console.error(error);
    }
  },

  async orders() {
    try {
      const orders = await orderModel.findAll(this.filter);
      const ordersPromise = orders.map(format);

      return Promise.all(ordersPromise);
    } catch (error) {
      console.error(error);
    }
  },

  format,
};
