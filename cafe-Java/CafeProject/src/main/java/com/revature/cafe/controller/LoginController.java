package com.revature.cafe.controller;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.revature.cafe.beans.User;
import com.revature.cafe.services.CustomerService;
import com.revature.cafe.services.CustomerServiceHibernate;
import com.revature.cafe.services.LoginService;
import com.revature.cafe.services.LoginServiceHibernate;
import com.revature.cafe.services.UserService;
import com.revature.cafe.services.UserServiceHibernate;

@RestController
@RequestMapping(value = "/login")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class LoginController {
	@Autowired
	private LoginService ls;
	private Logger log = Logger.getLogger(LoginController.class);

	@GetMapping
	public ResponseEntity<String> getCust(@RequestParam("user") User user) {
		ls.getUser(user);
		System.out.println(user);

		return ResponseEntity.ok("Success");
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<User> custLogin(@RequestBody User user, HttpSession session) {
		log.trace(user);
		User u = new User();

		u = ls.getUser(user);

		if (u != null) {
			session.setAttribute("loggedUser", u);
			return ResponseEntity.ok(u);
		} else
			return ResponseEntity.status(401).build();
	}

}