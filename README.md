# Swapi Backend

This project is a NestJS backend that utilizes the Star Wars public API (SWAPI) through https://swapi.dev/.

## Technologies Used

* **NestJS:** Node.js framework for building robust and scalable backend applications.
* **Docker Compose:** Tool for defining and running multi-container Docker applications.

## Running the Project with Docker Compose

To run the complete project, make sure you have Docker and Docker Compose installed on your system. Then, follow the steps below:

1. Clone this repository to your local machine.
2. Navigate to the root of the project where the `docker-compose.yml` file is located.
3. Run the following command to start the backend and frontend services:

```shell
docker-compose up
```

This will create and start Docker containers for the backend (NestJS).

4. Once all the containers are up and running, you can access the application through the following link:

* Backend (NestJS): `http://localhost:3000`

## Test Commands for NestJS

The backend project (NestJS) includes unit and integration tests to ensure code quality. You can run these tests inside Docker using the following command:

```shell
docker-compose run backend npm run test
```

This command will execute all the defined tests in the project and display the results in the console.

## API Documentation with Swagger

The backend (NestJS) is documented using Swagger, which provides an interactive interface to explore and test API endpoints. You can access the documentation at the following link:

* API Documentation (Swagger): `http://localhost:3000/docs`

The Swagger-generated documentation will show you the different endpoints available in the backend along with details about the required parameters and expected responses.

## Additional Notes

* If you want to stop the containers, you can press `Ctrl + C` in the terminal where the services are running and then execute the following command to stop and remove the containers:

```shell
docker-compose down
```

* If you encounter any issues while running the project or have any questions, feel free to contact me.

Thank you for checking out this project!

### TOP CUSTOMER QUERY EXAMPLE

This README provides an example of a SQL query to identify top customers based on their monthly order value. The query involves creating tables and inserting sample data, as well as querying for the top customers.


## Table Creation and Data Insertion

To begin, you can create tables `orders` and `order_details`, and insert sample data into them.

```pgsql
-- Create the orders table
CREATE TABLE orders (
	orderid int NOT NULL,
	customerid int NOT NULL,
	orderdate date NOT NULL
);

-- Create the order_details table
CREATE TABLE order_details (
	orderid int NOT NULL,
	productid int NOT NULL,
	unitprice int NOT NULL,
	quantity int NOT NULL
);

-- Insert sample data into the orders table
INSERT INTO orders (orderid, customerid, orderdate)
VALUES
(10248, 3, '1996-07-04'),
(10249, 1, '1996-07-05'),
(10253, 2, '1996-07-10'),
(10274, 3, '1996-08-06'),
(10275, 4, '1996-08-07'),
(10296, 5, '1996-09-03');

-- Insert sample data into the order_details table
INSERT INTO order_details(orderid, productid, unitprice, quantity)
VALUES
(10248, 11, 14, 12),
(10248, 42, 9, 10),
(10248, 72, 34, 5),
(10249, 14, 18, 9),
(10249, 51, 42, 40),
(10253, 31, 10, 20),
(10253, 39, 14, 42),
(10253, 49, 16, 40),
(10274, 71, 17, 20),
(10274, 72, 27, 7),
(10275, 24, 3, 12),
(10275, 59, 44, 6),
(10296, 11, 16, 12),
(10296, 16, 13, 30),
(10296, 69, 28, 15);
```

## Querying Top Customers

To identify the top customers based on their total monthly order value, you can execute the following query:

```pgsql
SELECT year, month, customerid, total_monthly_order_value
FROM (
    SELECT
        date_part('YEAR', o.orderdate) AS year,
        date_part('MONTH', o.orderdate) AS month,
        o.customerid,
        SUM(od.unitprice * od.quantity) AS total_monthly_order_value,
        RANK() OVER (PARTITION BY date_part('YEAR', o.orderdate), date_part('MONTH', o.orderdate) ORDER BY SUM(od.unitprice * od.quantity) DESC) AS customer_rank
    FROM
        orders o
    INNER JOIN
        order_details od ON o.orderid = od.orderid
    GROUP BY
        year,
        month,
        o.customerid
) ranked_orders
WHERE
    customer_rank = 1
ORDER BY
    year, month, customerid ASC;
```

This query calculates the total monthly order value for each customer, ranks them based on their order values, and then selects the top customer for each year and month combination.

Feel free to modify the sample data and the query to suit your specific use case and database schema.

## Contribution

Feel free to contribute to the project by opening issues or submitting pull requests.
