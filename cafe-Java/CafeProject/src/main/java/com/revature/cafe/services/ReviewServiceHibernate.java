package com.revature.cafe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.cafe.beans.Review;
import com.revature.cafe.data.ReviewDAO;

@Service
public class ReviewServiceHibernate implements ReviewService{
	
	@Autowired
	private ReviewDAO rvd;
	@Override
	public int addReview(Review rv) {
		int id = 0;
		id = rvd.addReview(rv);
		return id;
	}
	@Override
	public Review getReview(int id) {
		Review nrv = new Review();
		nrv = rvd.getReview(id);
		return nrv;
	}
	@Override
	public void updateReview(Review view) {
		rvd.updateReviews(view);	
	}

}
