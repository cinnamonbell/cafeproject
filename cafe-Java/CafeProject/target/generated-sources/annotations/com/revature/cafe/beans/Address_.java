package com.revature.cafe.beans;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Address.class)
public abstract class Address_ {

	public static volatile SingularAttribute<Address, String> zipCode;
	public static volatile SingularAttribute<Address, String> address;
	public static volatile SingularAttribute<Address, String> city;
	public static volatile SingularAttribute<Address, Integer> id;
	public static volatile SingularAttribute<Address, String> state;

	public static final String ZIP_CODE = "zipCode";
	public static final String ADDRESS = "address";
	public static final String CITY = "city";
	public static final String ID = "id";
	public static final String STATE = "state";

}

