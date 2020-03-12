package com.revature.cafe.services;

import com.revature.cafe.beans.User;

public interface UserService {
	
	
	public User getUser(String username, String password);
	
	public User getUserById(User u);

}
