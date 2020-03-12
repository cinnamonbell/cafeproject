
package com.revature.cafe.beans;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity
@Table(name="order_item")
public class OrderItem {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="order_item")
	@SequenceGenerator(name="order_item", sequenceName="ordI_seq", allocationSize=1)
	@Column(name = "item_id")
    private int id;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "menu_id")
    private MenuItem menuItem;
    
    public OrderItem() {
    	super();
    }
    
    public int getId() {
            return id;
    }
    public void setId(int id) {
            this.id = id;
    }
    public int getQuantity() {
            return quantity;
    }
    public void setQuantity(int quantity) {
            this.quantity = quantity;
    }
    public MenuItem getMenuItem() {
            return menuItem;
    }
    public void setMenuItem(MenuItem menuItem) {
            this.menuItem = menuItem;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		result = prime * result + ((menuItem == null) ? 0 : menuItem.hashCode());
		result = prime * result + quantity;
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
		OrderItem other = (OrderItem) obj;
		if (id != other.id)
			return false;
		if (menuItem == null) {
			if (other.menuItem != null)
				return false;
		} else if (!menuItem.equals(other.menuItem))
			return false;
		if (quantity != other.quantity)
			return false;
		return true;
	}

    @Override
    public String toString() {
        return "OrderItem{" + "id=" + id + ", order=" + order + ", quantity=" + quantity + ", menuItem=" + menuItem + '}';
    }	
    
}
