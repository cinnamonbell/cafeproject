package com.revature.cafe.services;

import java.util.Set;
import com.revature.cafe.beans.MenuItem;
import java.util.Map;

public interface MenuService {
	public void updateMenuItem(MenuItem mi);
	public void addMenuItem(MenuItem mi);
	public Set<MenuItem> getMenuItems();
	public MenuItem getMenuItemById(int id);
         public Map<Integer, Double> getPopularItems();
}
