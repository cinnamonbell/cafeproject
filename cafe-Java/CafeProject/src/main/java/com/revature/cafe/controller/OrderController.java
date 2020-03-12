package com.revature.cafe.controller;

import com.revature.cafe.beans.Order;
import com.revature.cafe.services.OrderService;

import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/order")
public class OrderController {
    private OrderService orderService;
    private Logger log = Logger.getLogger(OrderController.class);
    
    @GetMapping(value="/pending")
    public ResponseEntity<String> getPendingOrders(){
        log.trace("Received request to pending orders");
        return ResponseEntity.ok("success");
        // test code
    }
    
    @Autowired
    public OrderService getOrderService() {
        return orderService;
    }
    
    @Autowired
    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }
    
    
}
