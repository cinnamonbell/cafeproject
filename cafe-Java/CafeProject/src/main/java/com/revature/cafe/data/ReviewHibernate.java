package com.revature.cafe.data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.revature.cafe.beans.Address;
import com.revature.cafe.beans.Customer;
import com.revature.cafe.beans.Review;
import com.revature.cafe.util.HibernateUtil;
import com.revature.cafe.util.LogUtil;

public class ReviewHibernate implements ReviewDAO {
	
	private HibernateUtil hu = HibernateUtil.getInstance();
	private Logger log = Logger.getLogger(ReviewHibernate.class);
	
	@Override
	public void addReview(Review review) {
		Session s = hu.getSession();
		Transaction t = null;
		try {
			t = s.beginTransaction();
			s.save(review);
			t.commit();
		} catch (HibernateException e) {
			if (t != null)
				t.rollback();
			LogUtil.logException(e, ReviewHibernate.class);
		} finally {
			s.close();
		}
	}

	@Override
	public Review getReview(int id) {
		Session s = hu.getSession();
		Review r = s.get(Review.class, id);
		s.close();
		return r;
	}

	@Override
	public Set<Review> getReviews() {
		Session s = hu.getSession();
		String query = "FROM review";
		Query<Review> q = s.createQuery(query, Review.class);
		List<Review> reviewList = q.getResultList();
		Set<Review> reviewSet = new HashSet<Review>();
		reviewSet.addAll(reviewList);
		s.close();
		return reviewSet;
	}

	@Override
	public void updateReviews(Review review) {
		Session s = hu.getSession();
		Transaction t = null;
		try {
			t = s.beginTransaction();
			s.update(review);
			t.commit();
		} catch (HibernateException e) {
			if (t != null)
				t.rollback();
			LogUtil.logException(e, CustomerHibernate.class);
		} finally {
			s.close();
		}	
	}
}
