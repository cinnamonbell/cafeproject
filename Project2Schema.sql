drop table user_t CASCADE CONSTRAINTS;
drop table cust_t CASCADE CONSTRAINTS;
drop table employee_t CASCADE CONSTRAINTS;
drop table address CASCADE CONSTRAINTS;
drop table orders CASCADE CONSTRAINTS;
drop table order_item CASCADE CONSTRAINTS;
drop table menu CASCADE CONSTRAINTS;
drop table review CASCADE CONSTRAINTS;

drop sequence cust_seq;
drop sequence emp_seq;
drop sequence user_seq;
drop sequence add_seq;
drop sequence ord_seq;
drop sequence menu_seq;
drop sequence ordI_seq;
drop sequence rev_seq;
--customers, menu, inventory, rewards, orders, employee, review

--cust id references customer table
--emp id references employee table
create sequence cust_seq NOCACHE start with 2;

create table cust_t(
cust_id number(5) primary key,
cust_first varchar2(50),
cust_last varchar2(50),
reward_stars number(5)
);
create sequence emp_seq NOCACHE start with 2;

create table employee_t(
emp_id number(5) primary key,
emp_first varchar2(50),
emp_last varchar2(50)

);
create sequence user_seq NOCACHE start with 2;

create table user_t(
user_id number(5) primary key,
cust_id number(5) unique,
emp_id number(5) unique,
user_name varchar2(50) unique,
user_pass varchar2(50) not null,
CONSTRAINT fk_uCustId FOREIGN KEY (cust_id) REFERENCES cust_t(cust_id),
CONSTRAINT fk_uEmpId FOREIGN KEY (emp_id) REFERENCES employee_t(emp_id)
);

create sequence add_seq NOCACHE;

create table address(
address_id number(5) primary key,
address varchar2(100) not null,
city varchar2(100) not null,
states varchar2(100) not null,
zipcode varchar2(100) not null
);

create sequence rev_seq NOCACHE;
create table review(
review_id number(5) primary key,
good_rating varchar2(100),
comments varchar2(500)
);

create sequence ord_seq NOCACHE start with 3;

create table orders(
order_id number(5) primary key,
cust_id number(5) not null,
rev_id number(5),
price decimal(10,2),
status varchar2(15),
address_id number(5),
submitted_time TIMESTAMP,
last_action TIMESTAMP,
CONSTRAINT fk_addressId FOREIGN KEY (address_id) REFERENCES address(address_id),
CONSTRAINT fk_rev_id FOREIGN KEY (rev_id) REFERENCES review(review_id),
CONSTRAINT fk_cust_id FOREIGN KEY (cust_id) REFERENCES cust_t(cust_id)
);



--cust_id references customer
--status references order_status table
create sequence menu_seq NOCACHE start with 14;

create table menu(
menu_id number primary key,
item_name varchar(50),
item_price decimal(10,2),
inventory number(10,0) check (inventory > 0)
);

create sequence ordI_seq NOCACHE start with 5;

create table order_item(
item_id number(5) primary key,
order_id number(5) not null,
menu_item number(5) not null,
quantity number(5) check (quantity > 0),
CONSTRAINT fk_order_item FOREIGN KEY (order_id) REFERENCES orders(order_id),
CONSTRAINT fk_menu_item FOREIGN KEY (menu_item) REFERENCES menu(menu_id),
CONSTRAINT unique_menu_item UNIQUE (order_id, menu_item)
-- the combination of both columns must be unique, not each column individually
); -- many to one relationship to an order


--order_id references orders
--insert into employee_t (emp_id, emp_first, emp_last) values (1, 'david', 'youn');
--insert into user_t (user_id, cust_id, emp_id, user_name, user_pass) values (1, null, 1, 'dav', 'pass');
select * from user_t;


--inserting menu items into menu table
insert into menu(menu_id, item_name, item_price, inventory) values(1,'Coffee', 3.00, 13);
insert into menu(menu_id, item_name, item_price, inventory) values(2,'Espresso', 3.25, 22);
insert into menu(menu_id, item_name, item_price, inventory) values(3,'Latt?', 3.50, 17);
insert into menu(menu_id, item_name, item_price, inventory) values(4,'Hot Chocolate', 2.75, 33);
insert into menu(menu_id, item_name, item_price, inventory) values(5,'Hot Tea', 3.00, 30);
insert into menu(menu_id, item_name, item_price, inventory) values(6,'Iced Tea', 3.50, 16);
insert into menu(menu_id, item_name, item_price, inventory) values(7,'Orange Juice', 2.00, 9);
insert into menu(menu_id, item_name, item_price, inventory) values(8,'Milk', 1.50, 33);
insert into menu(menu_id, item_name, item_price, inventory) values(9,'Croissant', 2.00, 22);
insert into menu(menu_id, item_name, item_price, inventory) values(10,'Bagel', 5.00, 15);
insert into menu(menu_id, item_name, item_price, inventory) values(11,'Glazed Donut', 1.00, 5);
insert into menu(menu_id, item_name, item_price, inventory) values(12,'Egg Sandwich', 3.50, 37);
insert into menu(menu_id, item_name, item_price, inventory) values(13,'Fruit Cup', 2.75, 20);

-- insert test orders into order table
insert into cust_t(cust_id, cust_first, cust_last, reward_stars)
    values (1, 'Leeroy', 'Jenkins', 2);

insert into orders(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action)
	values (1, 1, null, 7.75, 'READY', null, TO_TIMESTAMP('2020/02/18 14:39:16', 'YYYY/MM/DD HH24:MI:SS'),
		TO_TIMESTAMP('2020/02/18 14:41:57', 'YYYY/MM/DD HH24:MI:SS'));
insert into order_item(item_id, order_id, menu_item, quantity) values (1, 1, 4, 1);
insert into order_item(item_id, order_id, menu_item, quantity) values (2, 1, 10, 1);
		
insert into orders(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action)
	values (2, 1, null, 5.50, 'PENDING', null, TO_TIMESTAMP('2020/02/18 14:50:22', 'YYYY/MM/DD HH24:MI:SS'),
		TO_TIMESTAMP('2020/02/18 14:54:36', 'YYYY/MM/DD HH24:MI:SS'));
insert into order_item(item_id, order_id, menu_item, quantity) values (3, 2, 11, 2);
insert into order_item(item_id, order_id, menu_item, quantity) values (4, 2, 3, 1);
commit;

select * from orders;
