import { User } from '@frontend/users';
import { OrderItem } from './order-item.model';

export class Order {
  id?: string;
  orderItems?: OrderItem;
  shippingAddress1?: string;
  shippingAddress2?: string;
  phone?: string;
  city?: string;
  country?: string;
  zip?: string;
  status?: string;
  totalPrice?: number;
  dateOrdered?: string;
  user?: User;
}
