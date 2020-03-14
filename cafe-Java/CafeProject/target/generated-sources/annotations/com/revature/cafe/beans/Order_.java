package com.revature.cafe.beans;

import com.revature.cafe.beans.Order.OrderStatus;
import java.sql.Timestamp;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Order.class)
public abstract class Order_ {

	public static volatile SingularAttribute<Order, Address> address;
	public static volatile SingularAttribute<Order, Timestamp> orderTime;
	public static volatile SingularAttribute<Order, Double> price;
	public static volatile SingularAttribute<Order, Review> review;
	public static volatile SingularAttribute<Order, Integer> id;
	public static volatile ListAttribute<Order, OrderItem> orderItems;
	public static volatile SingularAttribute<Order, Timestamp> lastActionTime;
	public static volatile SingularAttribute<Order, Customer> customer;
	public static volatile SingularAttribute<Order, OrderStatus> status;

	public static final String ADDRESS = "address";
	public static final String ORDER_TIME = "orderTime";
	public static final String PRICE = "price";
	public static final String REVIEW = "review";
	public static final String ID = "id";
	public static final String ORDER_ITEMS = "orderItems";
	public static final String LAST_ACTION_TIME = "lastActionTime";
	public static final String CUSTOMER = "customer";
	public static final String STATUS = "status";

}

