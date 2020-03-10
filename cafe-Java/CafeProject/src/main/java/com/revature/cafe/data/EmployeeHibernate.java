package com.revature.data.hibernate;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.revature.cafe.beans.Employee;
import com.revature.cafe.data.EmployeeDAO;
import com.revature.cafe.util.HibernateUtil;
import com.revature.cafe.util.LogUtil;

public class EmployeeHibernate implements EmployeeDAO{
	private HibernateUtil hu = HibernateUtil.getInstance();
	private Logger log = Logger.getLogger(EmployeeHibernate.class);

	@Override
	public void addEmployee(Employee employee) {
		Session s = hu.getSession();
		Transaction t = null;
		try {
			t =s.beginTransaction();
			s.save(employee);
			t.commit();
		} catch (HibernateException e) {
			if(t != null)
				t.rollback();
			LogUtil.logException(e, EmployeeHibernate.class);
		} finally {
			s.close();
		}
	}

	@Override
	public Employee getEmployee(Employee emp) {
		Session s = hu.getSession();
		Employee e = null;
		if (emp !=null && emp.getId() != 0) {
			// this means we're going to retrieve by id
			e = s.get(Employee.class, emp.getId());
		} else {
			// this means we're getting by user/pass
			log.trace("can't find employee");
		}
		s.close();
		return e;
	}

	@Override
	public Set<Employee> getEmployees() {
		Session s = hu.getSession();
		String query = "FROM Employee";
		Query<Employee> q = s.createQuery(query, Employee.class);
		List<Employee> empList = q.getResultList();
		Set<Employee> empSet = new HashSet<Employee>();
		empSet.addAll(empList);
		s.close();
		return empSet;
	}

	@Override
	public void updateEmployee(Employee employee) {
		Session s = hu.getSession();
		Transaction t = null;
		try {
			t = s.beginTransaction();
			s.update(employee);
			t.commit();
		} catch (HibernateException e) {
			if(t != null)
				t.rollback();
			LogUtil.logException(e, EmployeeHibernate.class);
		} finally {
			s.close();
		}
	}
}
