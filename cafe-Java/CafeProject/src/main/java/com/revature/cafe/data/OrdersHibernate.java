package com.revature.cafe.data;

import com.revature.cafe.beans.Order;
import com.revature.cafe.beans.Order.OrderStatus;
import com.revature.cafe.beans.Order_;
import com.revature.cafe.util.HibernateUtil;
import java.util.List;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.hibernate.Session;
import org.hibernate.query.Query;

import org.springframework.stereotype.Repository;

@Repository
public class OrdersHibernate implements OrdersDAO {

    private static HibernateUtil hibernate = HibernateUtil.getInstance();
    
    @Override
    public List<Order> getPendingOrders() {
        List<Order> list;
        Session session = hibernate.getSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<Order> c = builder.createQuery(Order.class);
        Root<Order> root = c.from(Order.class);
        c.select(root).where(builder.in(root.get(Order_.status))
                .value(OrderStatus.PENDING).value(OrderStatus.READY));
        Query<Order> query = session.createQuery(c);
        list = query.getResultList();
        session.close();
        return list;
    }

}
