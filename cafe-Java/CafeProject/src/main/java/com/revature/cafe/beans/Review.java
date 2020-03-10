
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
@Table(name="review")
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
		// TODO Auto-generated constructor stub
	}
	public Review(Integer id, Integer orderId, boolean goodRating, String comments) {
		super();
		this.id = id;
		this.orderId = orderId;
		this.goodRating = goodRating;
		this.comments = comments;
	}
	@Override
	public String toString() {
		return "Review [id=" + id + ", orderId=" + orderId + ", goodRating=" + goodRating + ", comments=" + comments
				+ "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((comments == null) ? 0 : comments.hashCode());
		result = prime * result + (goodRating ? 1231 : 1237);
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((orderId == null) ? 0 : orderId.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Review other = (Review) obj;
		if (comments == null) {
			if (other.comments != null)
				return false;
		} else if (!comments.equals(other.comments))
			return false;
		if (goodRating != other.goodRating)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (orderId == null) {
			if (other.orderId != null)
				return false;
		} else if (!orderId.equals(other.orderId))
			return false;
		return true;
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
