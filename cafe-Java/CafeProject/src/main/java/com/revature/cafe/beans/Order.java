
package com.revature.cafe.beans;

import java.sql.Timestamp;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;


import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="orders")
public class Order {
    
    public enum OrderStatus{
        PENDING,
        READY,
        COMPLETED,
        CANCELLED
    }
    
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="orders")
    @SequenceGenerator(name="orders", sequenceName="ord_seq", allocationSize=1)
    @Column(name = "order_id")
    private int id;
    @ManyToOne
    @JoinColumn(name = "cust_id", nullable=true)
    private Customer customer;
    private double price;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    @OneToMany(mappedBy="order", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private List<OrderItem> orderItems;
    @OneToOne
    @JoinColumn(name="rev_id")
    private Review review;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="address_id")
    private Address address;
    @Column(name="submitted_time")
    Timestamp orderTime;
    @Column(name="last_action")
    Timestamp lastActionTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        if (orderItems != null){
            for (OrderItem o : orderItems){
                o.setOrder(this);
            }
        }
        this.orderItems = orderItems;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Timestamp getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Timestamp orderTime) {
        this.orderTime = orderTime;
    }

    public Timestamp getLastActionTime() {
        return lastActionTime;
    }

    public void setLastActionTime(Timestamp lastActionTime) {
        this.lastActionTime = lastActionTime;
    }
    
    

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 83 * hash + this.id;
        hash = 83 * hash + (int) (Double.doubleToLongBits(this.price) ^ (Double.doubleToLongBits(this.price) >>> 32));
        hash = 83 * hash + Objects.hashCode(this.status);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Order other = (Order) obj;
        if (this.id != other.id) {
            return false;
        }
        if (Double.doubleToLongBits(this.price) != Double.doubleToLongBits(other.price)) {
            return false;
        }
        if (!Objects.equals(this.customer, other.customer)) {
            return false;
        }
        if (this.status != other.status) {
            return false;
        }
        if (!Objects.equals(this.orderItems, other.orderItems)) {
            return false;
        }
        if (!Objects.equals(this.review, other.review)) {
            return false;
        }
        if (!Objects.equals(this.address, other.address)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Order{" + "id=" + id + ", customer=" + (customer == null ? "null" : customer.getId()) + ", price=" + price + ", status=" + status + ", orderItems=" + orderItems + ", review=" + review + ", address=" + address + '}';
    }
    

}
