package com.revature.cafe.data;

import java.util.Set;

import com.revature.cafe.beans.Employee;

public interface EmployeeDAO {
	
	public void addEmployee(Employee employee);
	

	public Employee getEmployee(Employee emp);
	

	public Set<Employee> getEmployees();
	

	public void updateEmployee(Employee employee);

}
