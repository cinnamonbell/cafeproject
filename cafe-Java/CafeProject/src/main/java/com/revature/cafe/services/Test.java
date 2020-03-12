package com.revature.cafe.services;

import com.revature.cafe.beans.User;
import com.revature.cafe.data.UserDAO;
import com.revature.cafe.data.UserHibernate;

public class Test {
	public static void main(String[] args) {
		User u1 = new User();
		User u = new User(null, null, "alex", "pass");
		UserDAO ud = new UserHibernate();
		u1 = ud.getUser("dav", "pass");
		ud.addUser(u);
		System.out.println(u1);
	}

}
