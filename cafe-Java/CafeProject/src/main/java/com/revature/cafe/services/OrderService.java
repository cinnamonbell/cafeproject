package com.revature.cafe.services;

import com.revature.cafe.beans.Customer;
import com.revature.cafe.beans.Order;
import java.util.List;


public interface OrderService {
    List<Order> getPendingOrders();
    Order updateOrder(Order order);
    List<Order> getCustOrders(Customer cust);
    void updateReview(Order ord);
    Order addOrder(Order order);
    List<Order> getAllOrders();
}
