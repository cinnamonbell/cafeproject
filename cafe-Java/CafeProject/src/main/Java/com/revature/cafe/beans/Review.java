
package com.revature.cafe.beans;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table
public class Review {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="review")
	@SequenceGenerator(name="review", sequenceName="review_seq", allocationSize=1)
    private Integer id;
    private Integer orderId;
    private boolean goodRating;
    private String comments;
    
}
