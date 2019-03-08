create table company (
    company_id serial primary key not null,
    company_name varchar,
    business_type varchar,
    admin_username varchar,
    admin_password varchar
)

create table users (
    user_id serial primary key not null,
    real_name varchar,
    car_make varchar,
    plate_number varchar,
    company_id int,
    FOREIGN KEY (company_id) REFERENCES company (company_id)
)
