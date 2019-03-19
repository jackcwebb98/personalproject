select * 
from users 
where $1 ~ plate_number and company_id = $2