package com.revature.cafe.beans;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(MenuItem.class)
public abstract class MenuItem_ {

	public static volatile SingularAttribute<MenuItem, Integer> quantity;
	public static volatile SingularAttribute<MenuItem, Double> price;
	public static volatile SingularAttribute<MenuItem, String> name;
	public static volatile SingularAttribute<MenuItem, Integer> id;

	public static final String QUANTITY = "quantity";
	public static final String PRICE = "price";
	public static final String NAME = "name";
	public static final String ID = "id";

}

