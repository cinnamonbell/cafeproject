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
create sequence cust_seq NOCACHE;

create table cust_t(
cust_id number(5) primary key,
cust_first varchar2(50),
cust_last varchar2(50),
rewards_id number(5), 
reward_stars number(5)
);
create sequence emp_seq NOCACHE;

create table employee_t(
emp_id number(5) primary key,
emp_first varchar2(50),
emp_last varchar2(50)

);
create sequence user_seq NOCACHE;

create table user_t(
user_id number(5) primary key,
cust_id number(5),
emp_id number(5),
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

create sequence ord_seq NOCACHE;

create table orders(
order_id number(5) primary key,
cust_id number(5),
price decimal(10,2),
status varchar2(15),
address_id number(5),
submittedTime TIMESTAMP,
lastAction TIMESTAMP,
CONSTRAINT fk_addressId FOREIGN KEY (address_id) REFERENCES address(address_id),
CONSTRAINT fk_oCustId FOREIGN KEY (cust_id) REFERENCES cust_t(cust_id)
);

--cust_id references customer
--status references order_status table
create sequence menu_seq NOCACHE;

create table menu(
menu_id number primary key,
item_name varchar(50),
item_price decimal(10,2),
inventory number(10,0) check (inventory > 0)
);

create sequence ordI_seq NOCACHE;

create table order_item(
item_id number(5) primary key,
order_id number(5) not null unique,
menu_item number(5) not null unique,
quantity number(5) check (quantity > 0),
CONSTRAINT fk_order_item FOREIGN KEY (order_id) REFERENCES orders(order_id),
CONSTRAINT fk_menu_item FOREIGN KEY (menu_item) REFERENCES menu(menu_id)
); -- many to one relationship to an order

create sequence rev_seq NOCACHE;

create table review(
review_id number(5) primary key,
order_id number(5),
good_rating varchar2(100),
comments varchar2(500),
CONSTRAINT fk_orderId FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
--order_id references orders
--insert into employee_t (emp_id, emp_first, emp_last) values (1, 'david', 'youn');
--insert into user_t (user_id, cust_id, emp_id, user_name, user_pass) values (1, null, 1, 'dav', 'pass');
select * from user_t;


--inserting menu items into menu table
insert into menu(menu_id, item_name, item_price, inventory) values(1,'Coffee', 3.00, 13);
insert into menu(menu_id, item_name, item_price, inventory) values(2,'Espresso', 3.25, 22);
insert into menu(menu_id, item_name, item_price, inventory) values(3,'Latté', 3.50, 17);
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
commit;
