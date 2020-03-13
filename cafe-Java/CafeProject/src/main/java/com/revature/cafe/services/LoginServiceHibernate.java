package com.revature.cafe.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.cafe.beans.User;
import com.revature.cafe.data.UserDAO;
import com.revature.cafe.data.UserHibernate;


@Service
public class LoginServiceHibernate implements LoginService{
	
	@Autowired
	private UserDAO ud;

	@Override
	public void addUser(User user) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public User getUser(User user) {
		User u = new User();
		u = ud.getUser(user);
		return u;
	}

	@Override
	public Set<User> getUsers() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateUser(User user) {
		// TODO Auto-generated method stub
		
	}
	
	

}
