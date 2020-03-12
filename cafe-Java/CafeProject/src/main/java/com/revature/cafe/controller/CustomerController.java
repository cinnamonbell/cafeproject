package com.revature.cafe.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.revature.cafe.beans.User;
import com.revature.cafe.services.CustomerService;
import com.revature.cafe.services.CustomerServiceHibernate;
import com.revature.cafe.services.UserService;
import com.revature.cafe.services.UserServiceHibernate;

@RestController
@RequestMapping(value="/customer")
@CrossOrigin(origins="http://localhost:4200")
public class CustomerController {
	@Autowired
	private CustomerService cs;
	@Autowired
	private UserService us;
	private Logger log = Logger.getLogger(CustomerController.class);
	
	@PostMapping
	public ResponseEntity<String> cust(@RequestParam("user") User user) {
		cs.addCustomer(user.getCustomer());
		us.addUser(user);
		log.trace("user? " + user);
		
		return ResponseEntity.ok("Success");
	}

}
