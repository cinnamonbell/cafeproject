package com.revature.cafe.services;

import java.util.Set;

import com.revature.cafe.beans.User;

public interface LoginService {

	public void addUser(User user);
	public User getUser(User user);
	public Set<User> getUsers();
	public void updateUser(User user);
	
}
