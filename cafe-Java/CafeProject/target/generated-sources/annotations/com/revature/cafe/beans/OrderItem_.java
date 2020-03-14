package com.revature.cafe.beans;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(OrderItem.class)
public abstract class OrderItem_ {

	public static volatile SingularAttribute<OrderItem, Integer> quantity;
	public static volatile SingularAttribute<OrderItem, Integer> id;
	public static volatile SingularAttribute<OrderItem, MenuItem> menuItem;
	public static volatile SingularAttribute<OrderItem, Order> order;

	public static final String QUANTITY = "quantity";
	public static final String ID = "id";
	public static final String MENU_ITEM = "menuItem";
	public static final String ORDER = "order";

}

