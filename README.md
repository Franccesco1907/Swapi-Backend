# Swapi Backend

NestJS API for Star Wars people and planets, backed by PostgreSQL and SWAPI.

Configure `.env`: `PORT=3000`, `DB_HOST=localhost`, `DB_PORT=5432`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, and `SWAPI_URL` (API base URL, including `/api`). Use `NODE_ENV=development` for automatic schema synchronization.
Run `docker compose up --build` for API and database; Compose overrides `DB_HOST` to `db`. Swagger: http://localhost:3000/docs. Stop: `docker compose down`.
Checks: `docker compose run --rm backend npm test -- --runInBand` and `docker compose run --rm backend npm run build`.
Locally: `npm ci`, start PostgreSQL, then `npm run start:dev`. The e2e script requires the configured database.

## Independent SQL exercise

For `orders(orderid, customerid, orderdate)` and `order_details(orderid, productid, unitprice, quantity)`, find every customer tied for the highest monthly order value. This exercise is separate from the API schema.

```sql
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
