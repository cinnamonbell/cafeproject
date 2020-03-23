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
create sequence cust_seq start with 4 NOCACHE;

create table cust_t(
cust_id number(5) primary key,
cust_first varchar2(50),
cust_last varchar2(50),
reward_stars number(5)
);
create sequence emp_seq start with 5 NOCACHE;

create table employee_t(
emp_id number(5) primary key,
emp_first varchar2(50),
emp_last varchar2(50)
);

create sequence user_seq start with 5 NOCACHE;

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

create sequence rev_seq start with 200 NOCACHE;
create table review(
review_id number(5) primary key,
good_rating number(1), --true = 1
comments varchar2(500)
);

create sequence ord_seq start with 200 NOCACHE;

create table orders(
order_id number(5) primary key,
cust_id number(5),
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
create sequence menu_seq start with 14 NOCACHE;

create table menu(
menu_id number primary key,
item_name varchar(50),
item_price decimal(10,2),
inventory number(10,0) check (inventory >= 0)
);

create sequence ordI_seq start with 250 NOCACHE;

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



--inserting menu items into menu table
insert into menu(menu_id, item_name, item_price, inventory) values(1,'Coffee', 3.00, 1);
insert into menu(menu_id, item_name, item_price, inventory) values(2,'Espresso', 3.25, 22);
insert into menu(menu_id, item_name, item_price, inventory) values(3,'Latte', 3.50, 17);
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
insert into cust_t(cust_id, cust_first, cust_last, reward_stars)
    values (2, 'Dorian', 'Gray', 0);
insert into cust_t(cust_id, cust_first, cust_last, reward_stars)
    values (3, 'Suzie', 'Derkins', 3);


insert into orders(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action)
	values (1, 1, null, 7.75, 'READY', null, TO_TIMESTAMP('2020/02/18 14:39:16', 'YYYY/MM/DD HH24:MI:SS'),
		TO_TIMESTAMP('2020/02/18 14:41:57', 'YYYY/MM/DD HH24:MI:SS'));
insert into order_item(item_id, order_id, menu_item, quantity) values (1, 1, 4, 1);
insert into order_item(item_id, order_id, menu_item, quantity) values (2, 1, 10, 1);
		
insert into orders(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action)
	values (2, 1, null, 5.50, 'PENDING', null, TO_TIMESTAMP('2020/02/18 14:25:22', 'YYYY/MM/DD HH24:MI:SS'),
		TO_TIMESTAMP('2020/02/18 14:54:36', 'YYYY/MM/DD HH24:MI:SS'));
insert into order_item(item_id, order_id, menu_item, quantity) values (3, 2, 11, 2);
insert into order_item(item_id, order_id, menu_item, quantity) values (4, 2, 3, 1);

--review order tests have to create user to work
insert into orders(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action)
	values (3, 1, null, 7.75, 'READY', null, CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP);
insert into order_item(item_id, order_id, menu_item, quantity) values (5, 3, 4, 1);
insert into order_item(item_id, order_id, menu_item, quantity) values (6, 3, 10, 1);
		
insert into orders(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action)
	values (4, 1, null, 5.50, 'PENDING', null, TO_TIMESTAMP('2020/02/18 14:25:22', 'YYYY/MM/DD HH24:MI:SS'),
		TO_TIMESTAMP('2020/02/18 14:54:36', 'YYYY/MM/DD HH24:MI:SS'));
insert into order_item(item_id, order_id, menu_item, quantity) values (7, 4, 11, 2);
insert into order_item(item_id, order_id, menu_item, quantity) values (8, 4, 3, 1);

insert into review (review_id, good_rating, comments) values (1, 0, null);
insert into review (review_id, good_rating, comments) values (2, 1, null);
insert into review (review_id, good_rating, comments) values (3, 1, null);
insert into review (review_id, good_rating, comments) values (4, 0, null);

update orders set rev_id = 1 where order_id = 1;
update orders set rev_id = 2 where order_id = 2;
update orders set rev_id = 3 where order_id = 3;
update orders set rev_id = 4 where order_id = 4;


--GENERATOR FOR ORDERS/REVIEWS IN SQL

INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action)
VALUES (5, 2, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


--employees
insert into employee_t(emp_id, emp_first, emp_last) values (1, 'May', 'Love');
insert into employee_t(emp_id, emp_first, emp_last) values (2, 'David', 'Youn');
insert into employee_t(emp_id, emp_first, emp_last) values (3, 'Alexander', 'Bae');
insert into employee_t(emp_id, emp_first, emp_last) values (4, 'Jordan', 'Zech');

insert into user_t(user_id, cust_id, emp_id, user_name, user_pass) values (1, null, 1, 'may', 'pass');
insert into user_t(user_id, cust_id, emp_id, user_name, user_pass) values (2, null, 2, 'david', 'pass');
insert into user_t(user_id, cust_id, emp_id, user_name, user_pass) values (3, null, 3, 'alexb', 'pass');
insert into user_t(user_id, cust_id, emp_id, user_name, user_pass) values (4, null, 4, 'jzech', 'pass');

commit;

select * from menu;
select * from orders;
select * from user_t;
select * from orders;
select * from employee_t;
select * from cust_t;

select * from address;

select * from review;
select * from order_item;
select * from orders;
select * from user_t;
select * from orders;

insert into user_t(user_id, cust_id, emp_id, user_name, user_pass) values(5, 1, null, 'leeroy', 'pass');

-- how to select top 5 highest reviewed menu items
select menu.menu_id, avg(good_rating) as av from order_item 
inner join orders on orders.order_id = order_item.order_id
inner join menu on order_item.menu_item = menu.menu_id
inner join review on orders.rev_id = review_id
group by menu.menu_id
order by av desc;

--GENERATOR FOR ORDERS/REVIEWS IN SQL
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (5, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (9, 5, 5, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (10, 5, 9, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (11, 5, 6, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (5, 1, 'test review');
UPDATE orders
SET rev_id = 5
WHERE order_id = 5;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (6, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (12, 6, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (13, 6, 12, 6);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (6, 1, 'test review');
UPDATE orders
SET rev_id = 6
WHERE order_id = 6;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (7, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (14, 7, 11, 2);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (15, 7, 5, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (16, 7, 6, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (7, 1, 'test review');
UPDATE orders
SET rev_id = 7
WHERE order_id = 7;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (8, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (17, 8, 8, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (18, 8, 11, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (8, 1, 'test review');
UPDATE orders
SET rev_id = 8
WHERE order_id = 8;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (9, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (19, 9, 4, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (20, 9, 7, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (9, 1, 'test review');
UPDATE orders
SET rev_id = 9
WHERE order_id = 9;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (10, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (21, 10, 1, 3);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (22, 10, 5, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (23, 10, 13, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (10, 1, 'test review');
UPDATE orders
SET rev_id = 10
WHERE order_id = 10;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (11, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (24, 11, 4, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (11, 1, 'test review');
UPDATE orders
SET rev_id = 11
WHERE order_id = 11;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (12, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (25, 12, 12, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (26, 12, 9, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (27, 12, 2, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (12, 1, 'test review');
UPDATE orders
SET rev_id = 12
WHERE order_id = 12;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (13, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (28, 13, 1, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (13, 1, 'test review');
UPDATE orders
SET rev_id = 13
WHERE order_id = 13;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (14, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (29, 14, 1, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (14, 1, 'test review');
UPDATE orders
SET rev_id = 14
WHERE order_id = 14;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (15, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (30, 15, 12, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (15, 1, 'test review');
UPDATE orders
SET rev_id = 15
WHERE order_id = 15;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (16, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (31, 16, 10, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (16, 1, 'test review');
UPDATE orders
SET rev_id = 16
WHERE order_id = 16;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (17, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (32, 17, 6, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (33, 17, 11, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (17, 1, 'test review');
UPDATE orders
SET rev_id = 17
WHERE order_id = 17;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (18, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (34, 18, 1, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (35, 18, 5, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (36, 18, 12, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (37, 18, 4, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (18, 1, 'test review');
UPDATE orders
SET rev_id = 18
WHERE order_id = 18;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (19, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (38, 19, 6, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (39, 19, 4, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (40, 19, 10, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (19, 1, 'test review');
UPDATE orders
SET rev_id = 19
WHERE order_id = 19;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (20, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (41, 20, 11, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (20, 1, 'test review');
UPDATE orders
SET rev_id = 20
WHERE order_id = 20;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (21, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (42, 21, 8, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (43, 21, 6, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (21, 1, 'test review');
UPDATE orders
SET rev_id = 21
WHERE order_id = 21;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (22, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (44, 22, 5, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (45, 22, 13, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (46, 22, 9, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (22, 1, 'test review');
UPDATE orders
SET rev_id = 22
WHERE order_id = 22;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (23, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (47, 23, 2, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (23, 1, 'test review');
UPDATE orders
SET rev_id = 23
WHERE order_id = 23;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (24, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (48, 24, 1, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (24, 1, 'test review');
UPDATE orders
SET rev_id = 24
WHERE order_id = 24;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (25, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (49, 25, 10, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (25, 1, 'test review');
UPDATE orders
SET rev_id = 25
WHERE order_id = 25;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (26, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (50, 26, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (51, 26, 5, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (26, 1, 'test review');
UPDATE orders
SET rev_id = 26
WHERE order_id = 26;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (27, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (52, 27, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (53, 27, 1, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (27, 1, 'test review');
UPDATE orders
SET rev_id = 27
WHERE order_id = 27;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (28, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (54, 28, 2, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (28, 1, 'test review');
UPDATE orders
SET rev_id = 28
WHERE order_id = 28;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (29, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (55, 29, 10, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (29, 1, 'test review');
UPDATE orders
SET rev_id = 29
WHERE order_id = 29;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (30, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (56, 30, 6, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (57, 30, 12, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (58, 30, 2, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (59, 30, 11, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (60, 30, 1, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (61, 30, 3, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (30, 1, 'test review');
UPDATE orders
SET rev_id = 30
WHERE order_id = 30;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (31, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (62, 31, 4, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (63, 31, 12, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (31, 1, 'test review');
UPDATE orders
SET rev_id = 31
WHERE order_id = 31;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (32, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (64, 32, 9, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (32, 0, 'test review');
UPDATE orders
SET rev_id = 32
WHERE order_id = 32;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (33, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (65, 33, 1, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (33, 1, 'test review');
UPDATE orders
SET rev_id = 33
WHERE order_id = 33;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (34, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (66, 34, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (67, 34, 12, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (68, 34, 4, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (69, 34, 11, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (70, 34, 8, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (34, 1, 'test review');
UPDATE orders
SET rev_id = 34
WHERE order_id = 34;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (35, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (71, 35, 4, 2);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (35, 1, 'test review');
UPDATE orders
SET rev_id = 35
WHERE order_id = 35;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (36, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (72, 36, 13, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (73, 36, 2, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (36, 1, 'test review');
UPDATE orders
SET rev_id = 36
WHERE order_id = 36;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (37, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (74, 37, 2, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (75, 37, 3, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (76, 37, 8, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (77, 37, 1, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (37, 1, 'test review');
UPDATE orders
SET rev_id = 37
WHERE order_id = 37;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (38, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (78, 38, 1, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (38, 1, 'test review');
UPDATE orders
SET rev_id = 38
WHERE order_id = 38;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (39, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (79, 39, 7, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (39, 1, 'test review');
UPDATE orders
SET rev_id = 39
WHERE order_id = 39;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (40, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (80, 40, 13, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (40, 1, 'test review');
UPDATE orders
SET rev_id = 40
WHERE order_id = 40;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (41, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (81, 41, 6, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (41, 0, 'test review');
UPDATE orders
SET rev_id = 41
WHERE order_id = 41;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (42, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (82, 42, 5, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (42, 0, 'test review');
UPDATE orders
SET rev_id = 42
WHERE order_id = 42;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (43, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (83, 43, 13, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (43, 1, 'test review');
UPDATE orders
SET rev_id = 43
WHERE order_id = 43;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (44, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (84, 44, 3, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (85, 44, 12, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (86, 44, 8, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (44, 1, 'test review');
UPDATE orders
SET rev_id = 44
WHERE order_id = 44;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (45, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (87, 45, 12, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (88, 45, 3, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (45, 1, 'test review');
UPDATE orders
SET rev_id = 45
WHERE order_id = 45;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (46, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (89, 46, 13, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (90, 46, 6, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (91, 46, 9, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (92, 46, 3, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (93, 46, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (94, 46, 12, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (46, 1, 'test review');
UPDATE orders
SET rev_id = 46
WHERE order_id = 46;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (47, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (95, 47, 3, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (96, 47, 2, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (97, 47, 4, 2);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (98, 47, 12, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (47, 1, 'test review');
UPDATE orders
SET rev_id = 47
WHERE order_id = 47;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (48, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (99, 48, 7, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (100, 48, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (101, 48, 4, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (102, 48, 2, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (48, 1, 'test review');
UPDATE orders
SET rev_id = 48
WHERE order_id = 48;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (49, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (103, 49, 13, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (104, 49, 4, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (105, 49, 1, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (49, 1, 'test review');
UPDATE orders
SET rev_id = 49
WHERE order_id = 49;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (50, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (106, 50, 12, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (50, 1, 'test review');
UPDATE orders
SET rev_id = 50
WHERE order_id = 50;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (51, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (107, 51, 1, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (51, 1, 'test review');
UPDATE orders
SET rev_id = 51
WHERE order_id = 51;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (52, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (108, 52, 13, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (52, 1, 'test review');
UPDATE orders
SET rev_id = 52
WHERE order_id = 52;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (53, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (109, 53, 10, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (53, 1, 'test review');
UPDATE orders
SET rev_id = 53
WHERE order_id = 53;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (54, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (110, 54, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (111, 54, 4, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (54, 1, 'test review');
UPDATE orders
SET rev_id = 54
WHERE order_id = 54;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (55, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (112, 55, 1, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (113, 55, 2, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (55, 1, 'test review');
UPDATE orders
SET rev_id = 55
WHERE order_id = 55;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (56, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (114, 56, 12, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (115, 56, 1, 2);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (56, 1, 'test review');
UPDATE orders
SET rev_id = 56
WHERE order_id = 56;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (57, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (116, 57, 6, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (117, 57, 11, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (57, 1, 'test review');
UPDATE orders
SET rev_id = 57
WHERE order_id = 57;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (58, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (118, 58, 2, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (119, 58, 9, 2);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (58, 1, 'test review');
UPDATE orders
SET rev_id = 58
WHERE order_id = 58;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (59, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (120, 59, 3, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (59, 1, 'test review');
UPDATE orders
SET rev_id = 59
WHERE order_id = 59;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (60, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (121, 60, 3, 2);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (60, 1, 'test review');
UPDATE orders
SET rev_id = 60
WHERE order_id = 60;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (61, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (122, 61, 10, 2);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (61, 1, 'test review');
UPDATE orders
SET rev_id = 61
WHERE order_id = 61;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (62, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (123, 62, 1, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (62, 1, 'test review');
UPDATE orders
SET rev_id = 62
WHERE order_id = 62;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (63, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (124, 63, 3, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (125, 63, 2, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (126, 63, 1, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (127, 63, 4, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (63, 1, 'test review');
UPDATE orders
SET rev_id = 63
WHERE order_id = 63;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (64, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (128, 64, 11, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (129, 64, 6, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (130, 64, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (131, 64, 2, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (132, 64, 4, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (64, 1, 'test review');
UPDATE orders
SET rev_id = 64
WHERE order_id = 64;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (65, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (133, 65, 5, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (134, 65, 6, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (65, 1, 'test review');
UPDATE orders
SET rev_id = 65
WHERE order_id = 65;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (66, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (135, 66, 8, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (136, 66, 3, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (66, 1, 'test review');
UPDATE orders
SET rev_id = 66
WHERE order_id = 66;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (67, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (137, 67, 1, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (67, 0, 'test review');
UPDATE orders
SET rev_id = 67
WHERE order_id = 67;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (68, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (138, 68, 4, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (68, 0, 'test review');
UPDATE orders
SET rev_id = 68
WHERE order_id = 68;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (69, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (139, 69, 5, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (69, 1, 'test review');
UPDATE orders
SET rev_id = 69
WHERE order_id = 69;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (70, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (140, 70, 8, 2);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (141, 70, 11, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (142, 70, 4, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (70, 1, 'test review');
UPDATE orders
SET rev_id = 70
WHERE order_id = 70;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (71, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (143, 71, 7, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (71, 1, 'test review');
UPDATE orders
SET rev_id = 71
WHERE order_id = 71;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (72, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (144, 72, 4, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (145, 72, 12, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (72, 1, 'test review');
UPDATE orders
SET rev_id = 72
WHERE order_id = 72;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (73, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (146, 73, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (147, 73, 2, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (148, 73, 9, 2);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (73, 1, 'test review');
UPDATE orders
SET rev_id = 73
WHERE order_id = 73;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (74, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (149, 74, 1, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (150, 74, 5, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (74, 1, 'test review');
UPDATE orders
SET rev_id = 74
WHERE order_id = 74;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (75, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (151, 75, 8, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (75, 1, 'test review');
UPDATE orders
SET rev_id = 75
WHERE order_id = 75;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (76, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (152, 76, 7, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (153, 76, 6, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (76, 1, 'test review');
UPDATE orders
SET rev_id = 76
WHERE order_id = 76;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (77, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (154, 77, 4, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (77, 1, 'test review');
UPDATE orders
SET rev_id = 77
WHERE order_id = 77;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (78, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (155, 78, 8, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (156, 78, 9, 3);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (78, 1, 'test review');
UPDATE orders
SET rev_id = 78
WHERE order_id = 78;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (79, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (157, 79, 5, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (79, 1, 'test review');
UPDATE orders
SET rev_id = 79
WHERE order_id = 79;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (80, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (158, 80, 8, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (80, 1, 'test review');
UPDATE orders
SET rev_id = 80
WHERE order_id = 80;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (81, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (159, 81, 7, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (160, 81, 12, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (81, 1, 'test review');
UPDATE orders
SET rev_id = 81
WHERE order_id = 81;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (82, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (161, 82, 1, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (162, 82, 5, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (82, 1, 'test review');
UPDATE orders
SET rev_id = 82
WHERE order_id = 82;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (83, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (163, 83, 3, 2);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (164, 83, 12, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (165, 83, 8, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (83, 1, 'test review');
UPDATE orders
SET rev_id = 83
WHERE order_id = 83;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (84, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (166, 84, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (167, 84, 2, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (168, 84, 7, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (169, 84, 4, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (84, 1, 'test review');
UPDATE orders
SET rev_id = 84
WHERE order_id = 84;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (85, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (170, 85, 3, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (171, 85, 13, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (85, 1, 'test review');
UPDATE orders
SET rev_id = 85
WHERE order_id = 85;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (86, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (172, 86, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (173, 86, 4, 2);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (174, 86, 9, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (86, 1, 'test review');
UPDATE orders
SET rev_id = 86
WHERE order_id = 86;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (87, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (175, 87, 6, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (176, 87, 2, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (177, 87, 1, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (178, 87, 5, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (179, 87, 12, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (87, 1, 'test review');
UPDATE orders
SET rev_id = 87
WHERE order_id = 87;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (88, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (180, 88, 3, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (181, 88, 2, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (88, 1, 'test review');
UPDATE orders
SET rev_id = 88
WHERE order_id = 88;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (89, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (182, 89, 12, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (183, 89, 6, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (184, 89, 2, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (89, 1, 'test review');
UPDATE orders
SET rev_id = 89
WHERE order_id = 89;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (90, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (185, 90, 12, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (186, 90, 1, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (187, 90, 8, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (90, 1, 'test review');
UPDATE orders
SET rev_id = 90
WHERE order_id = 90;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (91, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (188, 91, 3, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (189, 91, 11, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (190, 91, 4, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (91, 1, 'test review');
UPDATE orders
SET rev_id = 91
WHERE order_id = 91;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (92, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (191, 92, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (192, 92, 13, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (92, 1, 'test review');
UPDATE orders
SET rev_id = 92
WHERE order_id = 92;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (93, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (193, 93, 11, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (194, 93, 9, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (93, 1, 'test review');
UPDATE orders
SET rev_id = 93
WHERE order_id = 93;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (94, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (195, 94, 11, 2);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (94, 1, 'test review');
UPDATE orders
SET rev_id = 94
WHERE order_id = 94;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (95, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (196, 95, 9, 2);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (197, 95, 8, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (198, 95, 4, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (199, 95, 2, 2);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (95, 1, 'test review');
UPDATE orders
SET rev_id = 95
WHERE order_id = 95;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (96, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (200, 96, 2, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (201, 96, 12, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (202, 96, 3, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (203, 96, 8, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (96, 1, 'test review');
UPDATE orders
SET rev_id = 96
WHERE order_id = 96;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (97, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (204, 97, 8, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (205, 97, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (206, 97, 1, 2);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (207, 97, 5, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (97, 1, 'test review');
UPDATE orders
SET rev_id = 97
WHERE order_id = 97;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (98, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (208, 98, 10, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (209, 98, 6, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (210, 98, 11, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (98, 1, 'test review');
UPDATE orders
SET rev_id = 98
WHERE order_id = 98;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (99, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (211, 99, 5, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (212, 99, 13, 2);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (99, 1, 'test review');
UPDATE orders
SET rev_id = 99
WHERE order_id = 99;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (100, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (213, 100, 1, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (100, 1, 'test review');
UPDATE orders
SET rev_id = 100
WHERE order_id = 100;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (101, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (214, 101, 3, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (215, 101, 13, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (216, 101, 7, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (217, 101, 10, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (101, 1, 'test review');
UPDATE orders
SET rev_id = 101
WHERE order_id = 101;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (102, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (218, 102, 2, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (102, 1, 'test review');
UPDATE orders
SET rev_id = 102
WHERE order_id = 102;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (103, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (219, 103, 11, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (220, 103, 3, 1);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (221, 103, 2, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (103, 1, 'test review');
UPDATE orders
SET rev_id = 103
WHERE order_id = 103;
INSERT INTO orders
(order_id, cust_id, rev_id, price, status, address_id, submitted_time, last_action) 
VALUES (104, 1, NULL, 0, 'COMPLETED', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO order_item
(item_id, order_id, menu_item, quantity) 
VALUES (222, 104, 10, 1);
INSERT INTO review
(review_id, good_rating, comments) 
VALUES (104, 1, 'test review');
UPDATE orders
SET rev_id = 104
WHERE order_id = 104;