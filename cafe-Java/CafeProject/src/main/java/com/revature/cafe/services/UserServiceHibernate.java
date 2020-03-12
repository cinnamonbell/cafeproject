package com.revature.cafe.services;

import com.revature.cafe.beans.User;
import com.revature.cafe.data.UserDAO;
import com.revature.cafe.data.UserHibernate;

public class UserServiceHibernate implements UserService{
	private UserDAO ud = new UserHibernate();


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
	
}
