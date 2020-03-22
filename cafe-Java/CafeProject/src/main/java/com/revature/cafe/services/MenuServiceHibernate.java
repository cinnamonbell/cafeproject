package com.revature.cafe.services;

import com.revature.cafe.beans.MenuItem;
import com.revature.cafe.data.MenuDAO;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.persistence.Tuple;

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

    @Override
    public Map<Integer, Double> getPopularItems() {
        List<Tuple> itemRatings = menuDao.getPopularItems();
        if (itemRatings == null) return null;
        Map<Integer, Double> ratingMap = new HashMap<>();
        for (Tuple t : itemRatings){
            Integer item = t.get("item", Integer.class);
            Double rating = t.get("rating", Double.class);
            ratingMap.put(item, rating);
        }
        return ratingMap;
    }

        
        
}
