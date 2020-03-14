package com.revature.cafe.beans;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Review.class)
public abstract class Review_ {

	public static volatile SingularAttribute<Review, String> comments;
	public static volatile SingularAttribute<Review, Integer> id;
	public static volatile SingularAttribute<Review, Boolean> goodRating;

	public static final String COMMENTS = "comments";
	public static final String ID = "id";
	public static final String GOOD_RATING = "goodRating";

}

