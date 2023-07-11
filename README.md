## Live Demo

[live demo](https://gretel.azurewebsites.net/) 🚀

## Installation

### Clone Repo

```
git clone git@github.com:namedyangfan/gretel.git

```

### Start Backend

server running on port `3001`. The backend server is connect to Azure SQL database, so it should work out of the box.

```
cd api
npm install
npm start
```

### Start Frontend

start frontend server running on port `3000`

```
cd frontend
npm install
npm start
```

## Description

### Backend

The application is build using the [express](https://expressjs.com/) framework. It contains two endpoints, `/customers/page=?` and `/customers/:customerID`

#### Customers Enpoint

`/customers/page=?` is a paginated endpoint that accept `get` request.It suppose to return maximum of `10` customers for a given page number. Here is a sample response payload:

```JSON
{
    "customers": [
        {
            "customerID": "user_11010",
            "lastName": "Suarez",
            "firstName": "Jacquelyn"
        }...
    ],
    "pageNumber": 1,
    "numPages": 9
}
```

- `customers`: an array of customers

- `pageNumber`: current page number

- `numPages`: max number of pages

##### Q&A

**Q: What if page number is not provided?**

A: customers from the first page should be returned

**Q: What if page number exceed the max number of pages?**

A: customers from the max number of pages should be returned

**Q: What if page number is not a integer?**

A: customers from the max number of pages should be returned

#### Customer Detail Enpoint

`/customers/:customerID` is a paginated endpoint that accept `get` request.It suppose to return detail of a customer given by its ID. Here is a sample response payload:

```json
{
  "customerID": "user_11010",
  "lastName": "Suarez",
  "firstName": "Jacquelyn",
  "address": "7800 Corrinne Court",
  "phoneNumber": "1 (11) 500 555-0169"
}
```

##### Q&A

**Q: What if customer can not be found?**

A: Return status 404

**Q: What if multiple customers were found with the same ID?**

A: Return status 404. Although this is not likely to happend because `customerID` is set to be the primary key in the database

**Q: Sanitization?**
A: For the interest of time, input is not sanitized. The service is prone to SQL injection.😭

### Frontend

The application is build with [react-create-app](https://create-react-app.dev/) and [Bootstrap](https://getbootstrap.com/)
