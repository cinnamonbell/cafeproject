package com.revature.cafe.data;


import org.hibernate.Session;
import org.hibernate.Transaction;

import com.revature.cafe.beans.Address;
import com.revature.cafe.data.AddressDAO;
import com.revature.cafe.util.HibernateUtil;
import com.revature.cafe.util.LogUtil;


public class AddressHibernate implements AddressDAO {
	private HibernateUtil hu = HibernateUtil.getInstance();

	@Override
	public int addAddress(Address address) {
		Session s = hu.getSession();
		Transaction tx = null;
		try {
			tx = s.beginTransaction();
			s.save(address);
			tx.commit();
		} catch(Exception e) {
			if(tx != null) {
				tx.rollback();
			}
			LogUtil.logException(e, AddressHibernate.class);
		} finally {
			s.close();
		}
		return address.getId();
	}

	@Override
	public Address getAddress(int id) {
		Session s = hu.getSession();
		Address a = s.get(Address.class, id);
		s.close();
		return a;
	}


	@Override
	public void updateAddress(Address address) {
		Session s = hu.getSession();
		Transaction t = null;
		try{
			t = s.beginTransaction();
			s.update(address);
			t.commit();
		} catch(Exception e) {
			if(t != null) {
				t.rollback();
			}
			LogUtil.logException(e, AddressHibernate.class);
		} finally {
			s.close();
		}
	}


}
