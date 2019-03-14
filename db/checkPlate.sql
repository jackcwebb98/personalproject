select users.real_name, users.car_make, users.plate_number, users.company_id, company.company_name, users.user_id
from users
inner join company on users.company_id = company.company_id
where users.plate_number = $1 and users.company_id = $2