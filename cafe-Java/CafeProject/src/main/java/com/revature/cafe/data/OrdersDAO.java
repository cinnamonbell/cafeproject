package com.revature.cafe.data;

import com.revature.cafe.beans.Customer;
import com.revature.cafe.beans.Order;
import java.util.List;

public interface OrdersDAO {
    List<Order> getPendingOrders();
    Order updateOrder(Order order);
    List<Order> viewCustOrders(Customer cust);
    void updateReviewOrder(Order ord);
}
