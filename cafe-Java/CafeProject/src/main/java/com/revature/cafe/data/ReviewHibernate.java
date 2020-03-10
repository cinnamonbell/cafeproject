package com.revature.cafe.data;

import java.util.Set;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

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
	public Review getReview(Review review) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Set<Review> getReviews() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateReviews(Review review) {
		// TODO Auto-generated method stub
		
	}

}
