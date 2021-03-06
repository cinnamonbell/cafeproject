package com.revature.cafe.data;

import java.util.Set;

import com.revature.cafe.beans.Review;

public interface ReviewDAO {
	public int addReview(Review review);
	public Review getReview(int id);
	public Set<Review> getReviews();
	public void updateReviews(Review review);
}
