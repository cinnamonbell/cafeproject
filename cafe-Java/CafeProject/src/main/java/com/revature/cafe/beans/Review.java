
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
	@SequenceGenerator(name="review", sequenceName="rev_seq", allocationSize=1)
	@Column(name = "review_id")
    private int id;
	@Column(name = "good_rating")
    private boolean goodRating;
    private String comments;
	public Review() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Review(int id, boolean goodRating, String comments) {
		super();
		this.id = id;
		this.goodRating = goodRating;
		this.comments = comments;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((comments == null) ? 0 : comments.hashCode());
		result = prime * result + (goodRating ? 1231 : 1237);
		result = prime * result + id;
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
		if (id != other.id)
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Review [id=" + id + ", goodRating=" + goodRating + ", comments=" + comments + "]";
	}

}
