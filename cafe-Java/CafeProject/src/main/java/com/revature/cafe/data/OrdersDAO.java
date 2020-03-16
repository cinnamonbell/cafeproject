package com.revature.cafe.data;

import com.revature.cafe.beans.Customer;
import com.revature.cafe.beans.Order;
import java.util.List;

public interface OrdersDAO {
    List<Order> getPendingOrders();
    List<Order> viewCustOrders(Customer cust);
}
