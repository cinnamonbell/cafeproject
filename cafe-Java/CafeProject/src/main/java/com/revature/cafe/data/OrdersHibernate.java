package com.revature.cafe.data;

import com.revature.cafe.beans.Order;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class OrdersHibernate implements OrdersDAO {

    @Override
    public List<Order> getPendingOrders() {
        List<Order> list = new ArrayList<>();
        list.add(new Order());
        list.add(new Order());
        return list;
    }

}
