package com.revature.cafe.services;

import com.revature.cafe.beans.MenuItem;
import com.revature.cafe.data.MenuDAO;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuServiceHibernate implements MenuService{
	@Autowired
	private MenuDAO menuDao;
	
	@Override
	public void updateMenuItem(MenuItem mi) {
		this.menuDao.updateMenu(mi);
		
	}

	@Override
	public MenuItem getMenuItemById(int id) {
		return null;
	}


	@Override
	public void addMenuItem(MenuItem mi) {
		this.menuDao.addMenuItem(mi);
		
	}

	@Override
	public Set<MenuItem> getMenuItems() {
		return menuDao.getMenuList();
	}

}
