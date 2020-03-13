package com.revature.cafe.controller;

import com.revature.cafe.beans.User;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.cafe.services.CustomerService;
import com.revature.cafe.services.UserService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(value="/customer")
@CrossOrigin(origins="http://localhost:4200")
public class CustomerController {
	@Autowired
	private CustomerService cs;
	@Autowired
	private UserService us;
	private Logger log = Logger.getLogger(CustomerController.class);
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> cust(@RequestBody User user ) {
                 log.trace("user? " + user);
		//cs.addCustomer(user.getCustomer());
		//us.addUser(user);
		
		
		return ResponseEntity.ok("Success");
	}

}
