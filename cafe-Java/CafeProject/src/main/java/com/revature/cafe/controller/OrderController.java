package com.revature.cafe.controller;

import com.revature.cafe.beans.Order;
import com.revature.cafe.services.OrderService;

import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/order")
@CrossOrigin(origins="http://localhost:4200", allowedHeaders="*")
public class OrderController {
    private OrderService orderService;
    private Logger log = Logger.getLogger(OrderController.class);
    
    @GetMapping(value="/pending")
    public ResponseEntity<List<Order>> getPendingOrders(){
        List<Order> list = orderService.getPendingOrders();
        for ( Order o : list ) log.trace(o.toString());
        if (list != null) return ResponseEntity.ok(list);
        else return ResponseEntity.notFound().build();
    }
    
    @PutMapping(value="/{orderId}")
    public ResponseEntity<Order> updateOrder(@PathVariable String orderId, 
            @RequestBody Order order){
        int id;
        try {
            id = Integer.parseInt(orderId);
        }
        catch (NumberFormatException nfe){
            log.trace("Request to invalid URI "+orderId);
            return ResponseEntity.badRequest().build();
        }
        if (order == null || order.getId() != id){
            log.trace("Request URI "+orderId+" does not match order's ID");
            log.trace("Order "+order);
            return ResponseEntity.badRequest().build();
        }
        order = orderService.updateOrder(order);
        return ResponseEntity.ok(order);
    }
    
    @Autowired
    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }
    
    
}
