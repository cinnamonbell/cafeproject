package com.revature.cafe.data;



import com.revature.cafe.beans.Address;

public interface AddressDAO {

		public int addAddress(Address address);
		
		/**
		 * returns a login object from the database
		 * 
		 * @param id the id of the User
		 * @return the Address from the database that matches the id,
		 * null if no Address with said id exists.
		 */
		public Address getAddress(int id);
		
		/**
		 * updates a Address in the database
		 * 
		 * @param Address the Address to be updated
		 */
		public void updateAddress(Address address);

}
