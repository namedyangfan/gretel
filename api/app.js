const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
  getNumPages,
  getPaginatedCustomers,
  getCustomerDetail,
} = require('./api');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/customers/:customerID', async (req, res) => {
  const { customerID } = req.params;
  try {
    const customer = await getCustomerDetail(customerID);
    res.json(customer);
  } catch (error) {
    if (error.name === 'ConnectionError') {
      res.status(500).send('Failed to connect server');
      return;
    }
    res.status(404).send({ error });
  }
  return;
});

app.get('/customers', async (req, res) => {
  let pageNumber = parseInt(req.query.page, 0) || 1;
  try {
    numPages = await getNumPages();

    if (pageNumber > numPages) pageNumber = numPages;

    customers = await getPaginatedCustomers(pageNumber);

    res.json({
      customers,
      pageNumber,
      numPages,
    });
  } catch (error) {
    if (error.name === 'ConnectionError') {
      res.status(500).send('Failed to connect server');
      return;
    }
    res.status(404).send({ error });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

module.exports = app;
