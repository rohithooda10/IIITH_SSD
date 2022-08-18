select CONCAT(e.Fname," ",e.Lname) as "Full Name",e1.Super_ssn as "SSN",e.Dno as "Dept Id",count(*) as "Number of employees" from EMPLOYEE as e JOIN EMPLOYEE as e1 on e.Ssn=e1.Super_ssn group by e1.Super_ssn,e.Dno order by count(*) ASC;