package com.revature.cafe.controller;

import com.revature.cafe.beans.Order;
import com.revature.cafe.beans.User;
import com.revature.cafe.services.OrderService;

import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/order")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {
	private OrderService orderService;
	private Logger log = Logger.getLogger(OrderController.class);

	@GetMapping(value = "/pending")
	public ResponseEntity<List<Order>> getPendingOrders() {
		List<Order> list = orderService.getPendingOrders();
		for (Order o : list)
			log.trace(o.toString());
		if (list != null)
			return ResponseEntity.ok(list);
		else
			return ResponseEntity.notFound().build();
	}

	@GetMapping(value = "/all")
	public ResponseEntity<List<Order>> getAllOrders() {
		List<Order> allOrders = orderService.getAllOrders();
		for (Order o : allOrders)
			log.trace(o.toString());
		if (allOrders != null)
			return ResponseEntity.ok(allOrders);
		else
			return ResponseEntity.notFound().build();
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Order> updateOrder(@PathVariable int id, @RequestBody Order order) {
		if (order == null || order.getId() != id) {
			log.trace("Request URI " + id + " does not match order's ID");
			log.trace("Order " + order);
			return ResponseEntity.badRequest().build();
		}
		order = orderService.updateOrder(order);
		return ResponseEntity.ok(order);
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Order> addOrder(@RequestBody Order order) {
		System.out.println("yoyo");
		log.trace(order);
		try {
			orderService.addOrder(order);
			return ResponseEntity.ok(order);
		} catch (RuntimeException e) {
			log.trace(e);
			return ResponseEntity.ok(null);
		}
	}

	@Autowired
	public void setOrderService(OrderService orderService) {
		this.orderService = orderService;
	}

}
