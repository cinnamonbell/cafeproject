package com.revature.cafe.services;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.revature.cafe.beans.Customer;
import com.revature.cafe.data.CustomerDAO;
import org.springframework.beans.factory.annotation.Autowired;
@Service
public class CustomerServiceHibernate implements CustomerService{

	private CustomerDAO cd = null;

	@Override
	public void addCustomer(Customer customer) {
		cd.addCustomer(customer);
		
	}

	@Override
	public Customer getCustomer(Customer customer) {
		Customer cust = new Customer();
		cust = cd.getCustomer(customer);
		return cust;
	}

	@Override
	public Set<Customer> getCustomers() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateCustomer(Customer customer) {
		cd.updateCustomer(customer);
		
	}
	
	
	

}
