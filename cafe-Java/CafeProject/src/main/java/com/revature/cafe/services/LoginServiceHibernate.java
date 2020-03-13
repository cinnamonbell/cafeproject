package com.revature.cafe.services;

import java.util.Set;

import com.revature.cafe.beans.User;
import com.revature.cafe.data.UserDAO;
import com.revature.cafe.data.UserHibernate;

public class LoginServiceHibernate implements LoginService{
	private UserDAO ud = new UserHibernate();

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
