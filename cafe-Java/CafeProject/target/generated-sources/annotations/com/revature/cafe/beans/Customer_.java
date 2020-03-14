package com.revature.cafe.beans;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Customer.class)
public abstract class Customer_ {

	public static volatile SingularAttribute<Customer, String> last;
	public static volatile ListAttribute<Customer, Order> orders;
	public static volatile SingularAttribute<Customer, Integer> id;
	public static volatile SingularAttribute<Customer, Integer> stars;
	public static volatile SingularAttribute<Customer, String> first;

	public static final String LAST = "last";
	public static final String ORDERS = "orders";
	public static final String ID = "id";
	public static final String STARS = "stars";
	public static final String FIRST = "first";

}

