
create user Project2Schema
identified by cafe
default tablespace users
temporary tablespace temp
quota 10m on users;

grant connect to Project2Schema;
grant resource to Project2Schema;
grant create session to Project2Schema;
grant create table to Project2Schema;
grant create view to Project2Schema;