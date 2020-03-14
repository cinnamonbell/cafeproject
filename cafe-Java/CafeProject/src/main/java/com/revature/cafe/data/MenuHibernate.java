package com.revature.cafe.data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.revature.cafe.beans.MenuItem;
import com.revature.cafe.util.HibernateUtil;
import com.revature.cafe.util.LogUtil;
@Repository
public class MenuHibernate implements MenuDAO {

	private HibernateUtil hu = HibernateUtil.getInstance();
	private Logger log = Logger.getLogger(MenuHibernate.class);

	@Override
	public void addMenuItem(MenuItem menuItem) {
		Session s = hu.getSession();
		Transaction t = null;
		try {
			t = s.beginTransaction();
			s.save(menuItem);
			t.commit();
		} catch (HibernateException e) {
			if (t != null)
				t.rollback();
			LogUtil.logException(e, MenuHibernate.class);
		} finally {
			s.close();
		}

	}

	@Override
	public MenuItem getMenu(MenuItem menuItem) {
		Session s = hu.getSession();
		MenuItem item = s.get(MenuItem.class, menuItem.getId());
		s.close();
		return item;
	}

	@Override
	public Set<MenuItem> getMenuList(MenuItem menuItem) {
		Session s = hu.getSession();
		String query = "FROM MenuItem";
		Query<MenuItem> q = s.createQuery(query, MenuItem.class);
		List<MenuItem> menuList = q.getResultList();
		s.close();
		return new HashSet<MenuItem>(menuList);
	}

	@Override
	public void updateMenu(MenuItem menuItem) {
		Session s = hu.getSession();
		Transaction t = null;
		try {
			t = s.beginTransaction();
			s.update(menuItem);
			t.commit();
		} catch (HibernateException e) {
			if (t != null)
				t.rollback();
			LogUtil.logException(e, MenuHibernate.class);
		} finally {
			s.close();
		}

	}

	@Override
	public Set<MenuItem> getMenuList() {
		Session s = hu.getSession();
		String query = "FROM MenuItem";
		Query<MenuItem> q = s.createQuery(query, MenuItem.class);
		List<MenuItem> menuList = q.getResultList();
		s.close();
		return new HashSet<MenuItem>(menuList);
	}

}
