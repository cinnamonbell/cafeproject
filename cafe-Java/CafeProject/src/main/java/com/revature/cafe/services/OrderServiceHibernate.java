package com.revature.cafe.services;

import com.revature.cafe.beans.Customer;
import com.revature.cafe.beans.Order;
import com.revature.cafe.data.OrdersDAO;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceHibernate implements OrderService{
    private OrdersDAO ordersDao;
    
    @Autowired
    public void setOrdersDao(OrdersDAO ordersDao) {
        this.ordersDao = ordersDao;
    }
    
    @Override
    public List<Order> getPendingOrders(){
        return ordersDao.getPendingOrders();
    }

    @Override
    public Order updateOrder(Order order) {
        return ordersDao.updateOrder(order);
    }
    
   
    @Override
    public List<Order> getCustOrders(Customer cust) {

            return ordersDao.viewCustOrders(cust);
    }

    @Override
    public void updateReview(Order ord) {
            ordersDao.updateReviewOrder(ord);

    }
    
}
