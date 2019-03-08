insert into company (company_name, business_type, admin_username, admin_password)
values (${company_name}, ${business_type}, ${admin_username}, ${admin_password})
returning company_name, admin_username, company_id