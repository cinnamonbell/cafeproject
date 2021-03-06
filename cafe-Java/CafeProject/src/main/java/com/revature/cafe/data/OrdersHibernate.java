package com.revature.cafe.data;

import com.revature.cafe.beans.Customer;
import com.revature.cafe.beans.MenuItem;
import com.revature.cafe.beans.Order;
import com.revature.cafe.beans.Order.OrderStatus;
import com.revature.cafe.beans.OrderItem;
import com.revature.cafe.beans.Order_;
import com.revature.cafe.util.HibernateUtil;
import com.revature.cafe.util.LogUtil;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.apache.log4j.Logger;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import org.springframework.stereotype.Repository;

@Repository
public class OrdersHibernate implements OrdersDAO {

	private static HibernateUtil hibernate = HibernateUtil.getInstance();
	private static Logger log = Logger.getLogger(OrdersHibernate.class);
  private static final double minRewardPrice = 5.0;
  @Override
  public Order addOrder(Order order) {
      Session session = hibernate.getSession();
      Transaction tx = null;
      Timestamp time = Timestamp.valueOf(LocalDateTime.now());
      try {
              tx = session.beginTransaction();
              order.setOrderTime(time);
              order.setLastActionTime(time);
            for(OrderItem o : order.getOrderItems()) {
                        MenuItem menuItem = session.get(MenuItem.class,
                                new Integer(o.getMenuItem().getId()));
                        o.setMenuItem(menuItem);
                        menuItem.setQuantity(menuItem.getQuantity() - o.getQuantity());            		
              log.trace("Updated quantity: "+menuItem.getQuantity());
              log.trace("Order: "+order);
              session.update(menuItem);
            }
              if ( order.getCustomer() != null && order.getPrice() > minRewardPrice){
                  int rewards = order.getCustomer().getStars();
                  order.getCustomer().setStars(++rewards);
                  session.update(order.getCustomer());
              }
              order.setStatus(OrderStatus.PENDING);
              session.persist(order);
              tx.commit();
      } catch (HibernateException e) {
              if (tx != null)
                      tx.rollback();
              LogUtil.logException(e, OrdersHibernate.class);
                return null;
      } finally {
              session.close();
      }
      return order;
  }

	@Override
	public List<Order> getPendingOrders() {
		List<Order> list;
		Session session = hibernate.getSession();
		CriteriaBuilder builder = session.getCriteriaBuilder();
		CriteriaQuery<Order> c = builder.createQuery(Order.class);
		Root<Order> root = c.from(Order.class);
		c.select(root).where(builder.in(root.get(Order_.status)).value(OrderStatus.PENDING).value(OrderStatus.READY));
		Query<Order> query = session.createQuery(c);
		list = query.getResultList();
		for (Order o : list)
			log.trace(o.toString());
		Hibernate.initialize(list);
		session.close();
		return list;
	}

	@Override
	public List<Order> viewCustOrders(Customer cust) {
		Session s = hibernate.getSession();
		int id = cust.getId();
		String query = "FROM Order o where o.customer.id = " + id + " ORDER BY o.orderTime";
		Query<Order> q = s.createQuery(query, Order.class);
		List<Order> custOrderList = q.getResultList();
		s.close();
		return custOrderList;
	}

//	@Override
//	public void updateReviewOrder(Order ord) {
//			Session s = hibernate.getSession();
//			Transaction t = null;
//			try {
//				t = s.beginTransaction();
//				s.update(ord);
//				t.commit();
//			} catch (HibernateException e) {
//				if (t != null)
//					t.rollback();
//				LogUtil.logException(e, CustomerHibernate.class);
//			} finally {
//				s.close();
//			}
//		
//		
//	}

	@Override
	public Order updateOrder(Order order) {
		Session session = hibernate.getSession();

		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			order.setLastActionTime(Timestamp.valueOf(LocalDateTime.now()));
			session.update(order);
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			LogUtil.logException(e, OrdersHibernate.class);
			return null;
		} finally {
			session.close();
		}
		return order;
	}

	@Override
	public List<Order> getAllOrders() {
		Session s = hibernate.getSession();
		String query = "FROM Order o ORDER BY o.customer";
		Query<Order> q = s.createQuery(query, Order.class);
		List<Order> allOrderList = q.getResultList();
		s.close();
		return allOrderList;
	}

}
