package com.revature.cafe.controller;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.cafe.beans.User;
import com.revature.cafe.services.LoginService;

@RestController
@RequestMapping(value = "/login")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class LoginController {
	@Autowired
	private LoginService ls;
        
	private Logger log = Logger.getLogger(LoginController.class);
        
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> custLogin(@RequestBody User user) {
		User u = ls.getUser(user);
		
		if (u != null) {
			return ResponseEntity.ok(u);			
		} else
			return ResponseEntity.status(401).build();
	}

}
