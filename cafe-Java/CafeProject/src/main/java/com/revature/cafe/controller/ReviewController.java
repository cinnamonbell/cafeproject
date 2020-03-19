package com.revature.cafe.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.cafe.beans.Order;
import com.revature.cafe.beans.Review;
import com.revature.cafe.services.OrderService;
import com.revature.cafe.services.ReviewService;

@RestController
@RequestMapping(value = "/review")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class ReviewController {
	private Logger log = Logger.getLogger(ReviewController.class);

	@Autowired
	ReviewService rs;
	@Autowired
	OrderService os;

	@PostMapping(value = "/good")
	public ResponseEntity<Order> goodReview(@RequestBody Order ord) {
		log.trace("we in goodReview?");
		log.trace(ord.toString());
		int id = 0;
		Review rv = new Review();
		rv.setGoodRating(true);
		log.trace(ord.getReview().toString());
		if (ord.getReview() == null) {
			log.trace("creating a new review");
			id = rs.addReview(rv);
			Review nrv = new Review();
			nrv = rs.getReview(id);
			ord.setReview(nrv);
			os.updateReview(ord);
		} else {
			log.trace("already have a review");
			ord.getReview().setGoodRating(true);
			//rs.updateReview(ord.getReview());
			os.updateReview(ord);

		}
		log.trace(id);

		return ResponseEntity.ok(ord);
	}

	@PostMapping(value = "/bad")
	public ResponseEntity<Order> badReview(@RequestBody Order ord) {
		log.trace("we in badReview?");
		log.trace(ord.toString());
		int id = 0;
		Review rv = new Review();
		rv.setGoodRating(false);
		log.trace(ord.getReview().toString());
		if (ord.getReview() == null) {
			log.trace("creating a new review");
			id = rs.addReview(rv);
			Review nrv = new Review();
			nrv = rs.getReview(id);
			ord.setReview(nrv);
			os.updateReview(ord);
		} else {
			log.trace("already have a review");
			ord.getReview().setGoodRating(false);
			//rs.updateReview(ord.getReview());
			os.updateReview(ord);

		}
		log.trace(id);

		return ResponseEntity.ok(ord);
	}

	@PostMapping(value = "/comment")
	public ResponseEntity<Order> commentReview(@RequestBody Order ord) {
		log.trace("we in commentReview?");
		log.trace(ord.toString());
		int id = 0;
		Review rv = new Review();
		rv.setComments("food was amazing");
		log.trace(ord.getReview().toString());
		if (ord.getReview() == null) {
			log.trace("creating a new review");
			id = rs.addReview(rv);
			Review nrv = new Review();
			nrv = rs.getReview(id);
			ord.setReview(nrv);
			os.updateReview(ord);
		} else {
			log.trace("already have a review");
			ord.getReview().setComments("somethingdif");
			//rs.updateReview(ord.getReview());
			os.updateReview(ord);
		}
		log.trace(id);

		return ResponseEntity.ok(ord);
	}

}
