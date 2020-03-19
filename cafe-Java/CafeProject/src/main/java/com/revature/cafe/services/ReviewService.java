package com.revature.cafe.services;

import com.revature.cafe.beans.Review;

public interface ReviewService {
	int addReview(Review rv);
	Review getReview(int id);
	void updateReview(Review view);
}
