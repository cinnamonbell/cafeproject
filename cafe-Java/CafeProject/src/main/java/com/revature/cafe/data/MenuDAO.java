package com.revature.cafe.data;

import com.revature.cafe.beans.MenuItem;
import java.util.Set;

public interface MenuDAO {
    public void addMenuItem(MenuItem menuItem);
    public MenuItem getMenu(MenuItem menuItem);
    public Set<MenuItem> getMenuList(MenuItem menuItem);
    public void updateMenu(MenuItem menuItem);
}
