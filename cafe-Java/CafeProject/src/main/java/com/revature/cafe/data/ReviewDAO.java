package com.revature.cafe.data;

import java.util.Set;

import com.revature.cafe.beans.Review;

public interface ReviewDAO {
	public void addReview(Review review);
	public Review getReview(Review review);
	public Set<Review> getReviews();
	public void updateReviews(Review review);
}
