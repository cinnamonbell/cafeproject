package com.revature.cafe.beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity
@Table(name="user_t")

public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="user_t")
	@SequenceGenerator(name="user_t", sequenceName="user_seq", allocationSize=1)

	@Column(name="user_id")
	private Integer id;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="cust_id")
	private Customer customer;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="emp_id")
	private Employee employee;
	
	@Column(name="user_name")
	private String username;
	
	@Column(name="user_pass")
	private String password;
	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public User(Integer id, Customer customer, Employee employee, String username, String password) {
		super();
		this.id = id;
		this.customer = customer;
		this.employee = employee;
		this.username = username;
		this.password = password;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", customer=" + customer + ", employee=" + employee + ", username=" + username
				+ ", password=" + password + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((customer == null) ? 0 : customer.hashCode());
		result = prime * result + ((employee == null) ? 0 : employee.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (customer == null) {
			if (other.customer != null)
				return false;
		} else if (!customer.equals(other.customer))
			return false;
		if (employee == null) {
			if (other.employee != null)
				return false;
		} else if (!employee.equals(other.employee))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
