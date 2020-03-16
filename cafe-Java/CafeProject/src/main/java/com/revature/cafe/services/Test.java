package com.revature.cafe.services;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.revature.cafe.beans.Customer;
import com.revature.cafe.beans.Order;
import com.revature.cafe.beans.User;
import com.revature.cafe.data.OrdersDAO;
import com.revature.cafe.data.OrdersHibernate;
import com.revature.cafe.data.ReviewHibernate;
import com.revature.cafe.data.UserDAO;
import com.revature.cafe.data.UserHibernate;

public class Test {
	
//	public static void main(String[] args) {
//		Logger log = Logger.getLogger(Test.class);
//		User u1 = new User();
//		User u = new User(null, null, "may", "pass");
//		User u3 = new User("jzzzz25", "pass");
//		
//		UserService ud = new UserServiceHibernate();
//		
//		User u1 = ud.getUser("jordan", "pass");
//		Customer cust1 = new Customer(1, "Leeroy", "Jenkins");
//		System.out.println(u1);
//		CustomerService cs = new CustomerServiceHibernate();
//		Customer cust = cs.getCustomer(cust1);
//		log.trace(cust);
//		List<Order> o = new ArrayList<>();
//		cust1.setOrders(o);
//		log.trace(cust1);
//		OrdersDAO od = new OrdersHibernate();
//		List<Order> orderList;
//		orderList = od.viewCustOrders(cust1);
//		log.trace(orderList);
//	}

}
