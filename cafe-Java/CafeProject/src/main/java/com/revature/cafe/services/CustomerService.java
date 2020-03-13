package com.revature.cafe.services;

import java.util.Set;

import com.revature.cafe.beans.Customer;

public interface CustomerService {
	
	public void addCustomer(Customer customer);
	public Customer getCustomer(Customer customer);
	public Set<Customer> getCustomers();
	public void updateCustomer(Customer customer);

}
