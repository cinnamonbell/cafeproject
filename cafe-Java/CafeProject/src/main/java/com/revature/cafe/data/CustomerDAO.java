package com.revature.cafe.data;

import java.util.Set;

import com.revature.cafe.beans.Customer;

public interface CustomerDAO {
	public void addCustomer(Customer customer);
	public Customer getCustomer(Customer customer);
	public Set<Customer> getCustomers();
	public void updateCustomer(Customer customer);
}
