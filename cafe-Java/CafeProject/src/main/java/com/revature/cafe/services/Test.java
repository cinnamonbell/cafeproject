package com.revature.cafe.services;

import com.revature.cafe.beans.User;
import com.revature.cafe.data.UserDAO;
import com.revature.cafe.data.UserHibernate;

public class Test {
	public static void main(String[] args) {
		User u1 = new User();
		User u = new User(null, null, "may", "pass");
		User u3 = new User("jzzzz25", "pass");
		
		UserService ud = new UserServiceHibernate();
		
		u1 = ud.getUser("jordan", "pass");
		System.out.println(u1);
	}

}
