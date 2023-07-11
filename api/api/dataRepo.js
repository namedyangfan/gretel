const runQuery = require('./azureSQL');

const defaultPageSize = 10;

const getNumPages = async (pageSize = defaultPageSize) => {
  query = `SELECT COUNT(CustomerID) as nc
  FROM [dbo].[GretelCustomer]
  WHERE (LOWER(CountryRegionName) != 'germany')`;

  const resultSet = await runQuery(query);
  const numPages = Math.ceil(resultSet.recordset[0].nc / pageSize);
  return numPages;
};

const getPaginatedCustomers = async (
  pageNumber,
  pageSize = defaultPageSize
) => {
  offSet = (pageNumber - 1) * pageSize;

  query = `SELECT CustomerID, LastName, FirstName, CountryRegionName
  FROM [dbo].[GretelCustomer]
  WHERE (LOWER(CountryRegionName) != 'germany')
  ORDER BY CustomerID
  OFFSET ${offSet} ROWS FETCH NEXT ${pageSize} ROWS ONLY;`;

  const resultSet = await runQuery(query);
  const customers = resultSet.recordset.map((customer) => {
    return {
      customerID: customer.CustomerID,
      lastName: customer.LastName,
      firstName: customer.FirstName,
    };
  });

  return customers;
};

const getCustomerDetail = async (customerId) => {
  query = `SELECT CustomerID, FirstName, LastName, AddressLine1 + COALESCE(' ' + AddressLine2,'') AS Address, PhoneNumber
  FROM [dbo].[GretelCustomer]
  WHERE CustomerID = '${customerId}'`;

  const resultSet = await runQuery(query);

  if (resultSet.recordset.length === 0) {
    throw `customer with ID ${customerId} can not be found`;
  }

  const customer = resultSet.recordset[0];

  return {
    customerID: customer.CustomerID,
    lastName: customer.LastName,
    firstName: customer.FirstName,
    address: customer.Address,
    phoneNumber: customer.PhoneNumber,
  };
};

module.exports = { getNumPages, getPaginatedCustomers, getCustomerDetail };
