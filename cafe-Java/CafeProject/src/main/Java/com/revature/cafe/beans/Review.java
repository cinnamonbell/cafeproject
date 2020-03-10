
package com.revature.cafe.beans;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table
public class Review {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="review")
	@SequenceGenerator(name="review", sequenceName="review_seq", allocationSize=1)
	@Column(name = "review_id")
    private Integer id;
	@OneToOne
	@Column(name = "order_id")
    private Integer orderId;
	@Column(name = "good_rating")
    private boolean goodRating;
    private String comments;
    
    public Review() {
    	super();
    }
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getOrderId() {
		return orderId;
	}
	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}
	public boolean isGoodRating() {
		return goodRating;
	}
	public void setGoodRating(boolean goodRating) {
		this.goodRating = goodRating;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
    
    
    
}
