package com.revature.cafe.services;

import com.revature.cafe.beans.User;
import com.revature.cafe.data.UserDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceHibernate implements UserService{
	
	@Autowired
	private UserDAO ud;


	@Override
	public User getUser(String username, String password) {
		User u = new User();
		u = ud.getUser(username, password);
		return u;
	}

	@Override
	public User getUserById(User u) {
		// TODO Auto-generated method stub
		return null;
	}

	public void addUser(User u) {
		ud.addUser(u);
		
	}
	
}
