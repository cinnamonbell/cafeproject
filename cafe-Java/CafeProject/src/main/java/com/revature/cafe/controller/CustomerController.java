package com.revature.cafe.controller;

import org.springframework.http.ResponseEntity;
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
public class CustomerController {
	private CustomerService cs = new CustomerServiceHibernate();
	private UserService us = new UserServiceHibernate();
	
	@PostMapping
	public ResponseEntity<String> cust(@RequestParam("user") User user) {
		cs.addCustomer(user.getCustomer());
		us.addUser(user);
		
		return ResponseEntity.ok("Success");
	}

}
