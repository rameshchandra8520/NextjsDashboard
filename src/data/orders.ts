export type OrderStatus = 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface PizzaOrder {
  id: string;
  customerName: string;
  pizzaType: string;
  quantity: number;
  orderDate: string;
  status: OrderStatus;
}

export const pizzaOrders: PizzaOrder[] = [
  {
    id: 'PZA001',
    customerName: 'John Doe',
    pizzaType: 'Margherita',
    quantity: 2,
    orderDate: '2023-05-15 14:30',
    status: 'Delivered'
  },
  {
    id: 'PZA002',
    customerName: 'Jane Smith',
    pizzaType: 'Pepperoni',
    quantity: 1,
    orderDate: '2023-05-15 15:45',
    status: 'Preparing'
  },
  {
    id: 'PZA003',
    customerName: 'Robert Johnson',
    pizzaType: 'Veggie Supreme',
    quantity: 3,
    orderDate: '2023-05-15 16:20',
    status: 'Pending'
  },
  {
    id: 'PZA004',
    customerName: 'Emily Davis',
    pizzaType: 'Hawaiian',
    quantity: 1,
    orderDate: '2023-05-15 17:10',
    status: 'Out for Delivery'
  },
  {
    id: 'PZA005',
    customerName: 'Michael Wilson',
    pizzaType: 'BBQ Chicken',
    quantity: 2,
    orderDate: '2023-05-15 18:05',
    status: 'Cancelled'
  },
  {
    id: 'PZA006',
    customerName: 'Sarah Brown',
    pizzaType: 'Meat Lovers',
    quantity: 1,
    orderDate: '2023-05-16 12:15',
    status: 'Delivered'
  },
  {
    id: 'PZA007',
    customerName: 'David Miller',
    pizzaType: 'Buffalo Chicken',
    quantity: 2,
    orderDate: '2023-05-16 13:30',
    status: 'Preparing'
  },
  {
    id: 'PZA008',
    customerName: 'Jennifer Taylor',
    pizzaType: 'Cheese',
    quantity: 1,
    orderDate: '2023-05-16 14:45',
    status: 'Pending'
  },
  {
    id: 'PZA009',
    customerName: 'Thomas Anderson',
    pizzaType: 'Supreme',
    quantity: 3,
    orderDate: '2023-05-16 15:20',
    status: 'Out for Delivery'
  },
  {
    id: 'PZA010',
    customerName: 'Lisa White',
    pizzaType: 'Mushroom',
    quantity: 1,
    orderDate: '2023-05-16 16:10',
    status: 'Delivered'
  },
  {
    id: 'PZA011',
    customerName: 'James Martin',
    pizzaType: 'Spinach & Feta',
    quantity: 2,
    orderDate: '2023-05-16 17:05',
    status: 'Preparing'
  },
  {
    id: 'PZA012',
    customerName: 'Patricia Garcia',
    pizzaType: 'Veggie',
    quantity: 1,
    orderDate: '2023-05-17 11:30',
    status: 'Pending'
  }
]; 