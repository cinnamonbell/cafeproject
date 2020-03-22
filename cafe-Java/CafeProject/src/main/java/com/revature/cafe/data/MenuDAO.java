package com.revature.cafe.data;

import com.revature.cafe.beans.MenuItem;
import java.util.List;
import java.util.Set;
import javax.persistence.Tuple;

public interface MenuDAO {
    public void addMenuItem(MenuItem menuItem);
    public MenuItem getMenu(MenuItem menuItem);
    public void updateMenu(MenuItem menuItem);
    public Set<MenuItem> getMenuList();
    public List<Tuple> getPopularItems();
}
