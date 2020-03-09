
package com.revature.cafe.beans;

import java.util.List;


public class Order {
    
    public enum OrderStatus{
        
    }
    
    private Customer customer;
    private double price;
    private OrderStatus status;
    private List<OrderItem> orderItems;
    private Review review;
    private Address address;
}
