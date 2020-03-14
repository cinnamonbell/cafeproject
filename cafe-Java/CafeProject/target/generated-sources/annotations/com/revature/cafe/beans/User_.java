package com.revature.cafe.beans;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(User.class)
public abstract class User_ {

	public static volatile SingularAttribute<User, String> password;
	public static volatile SingularAttribute<User, Integer> id;
	public static volatile SingularAttribute<User, Employee> employee;
	public static volatile SingularAttribute<User, Customer> customer;
	public static volatile SingularAttribute<User, String> username;

	public static final String PASSWORD = "password";
	public static final String ID = "id";
	public static final String EMPLOYEE = "employee";
	public static final String CUSTOMER = "customer";
	public static final String USERNAME = "username";

}

