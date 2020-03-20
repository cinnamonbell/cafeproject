package com.revature.cafe.controller;

import com.revature.cafe.beans.Customer;
import com.revature.cafe.beans.MenuItem;
import com.revature.cafe.beans.Order;
import com.revature.cafe.beans.User;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.cafe.services.CustomerService;
import com.revature.cafe.services.OrderService;
import com.revature.cafe.services.UserService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(value = "/customer")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CustomerController {

	@Autowired
	private OrderService os;
	@Autowired
	private CustomerService cs;
	@Autowired
	private UserService us;
	private Logger log = Logger.getLogger(CustomerController.class);

	@PostMapping(value = "/orders")
	public ResponseEntity<List<Order>> custOrders(@RequestBody Customer cust) {
		log.trace("we in customer?");
		log.trace(cust);
		List<Order> ol = os.getCustOrders(cust);
		//log.trace(ol.toString());
		

		if (ol != null)
			return ResponseEntity.ok(ol);
		else
			return ResponseEntity.notFound().build();

	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE) // , produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<User> cust(@RequestBody User user) {

		log.trace("user? " + user);

		log.trace("customer: " + user.getCustomer());
		try {
			cs.addCustomer(user.getCustomer());
			us.addUser(user);
			return ResponseEntity.ok(user);
		} catch (RuntimeException e) {
			log.trace(e);
			return ResponseEntity.ok(null);
		}
	}
	
	@PutMapping(value="/stars") //same deal as above
	public ResponseEntity<Customer> updateMenuItem(@RequestBody Customer cust) {
		log.trace("removing stars");
		log.trace(cust);
		cs.updateCustomer(cust);
		return ResponseEntity.ok(cust);
	}

}
