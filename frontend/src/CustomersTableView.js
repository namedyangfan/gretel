import { useEffect, useState } from 'react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Paginator from './Paginator';
import CustomerDetailView from './CustomerDetailView';
import LoadingState from './LoadingState';
import api from './api';

function Row({ customerID, firstName, lastName }) {
  const [toggleDetailView, setToggleDetailView] = useState(false);

  return (
    <React.Fragment>
      <tr
        onClick={() => setToggleDetailView(!toggleDetailView)}
        className='cursor-pointer'
      >
        <th scope='row' className='col-md-4'>
          {customerID}
        </th>
        <td className='col-md-4'>{firstName}</td>
        <td className='col-md-4'>{lastName}</td>
      </tr>
      {toggleDetailView && <CustomerDetailView id={customerID} />}
    </React.Fragment>
  );
}

function CustomersTableView() {
  const [customers, setCustomers] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [status, setStatus] = useState('loading');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page'), 0) || 1;

  useEffect(() => {
    setStatus('loading');
    api
      .getPaginatedCustomers(currentPage)
      .then((response) => {
        setCustomers(response.data.customers);
        setNumPages(response.data.numPages);
        setStatus('success');
      })
      .catch(function (error) {
        setStatus('failed');
      });
  }, [currentPage]);

  function renderErrorState() {
    return <i className='bi bi-bug'>Sorry, something went wrong</i>;
  }
  return (
    <div className='container'>
      <div className='row'>
        <table className='table table-hover'>
          <thead>
            <tr className='table-primary'>
              <th scope='col col-md-4'>#</th>
              <th scope='col col-md-4'>First Name</th>
              <th scope='col col-md-4'>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {status === 'success' &&
              customers.map((customer) => (
                <Row
                  customerID={customer.customerID}
                  firstName={customer.firstName}
                  lastName={customer.lastName}
                  key={customer.customerID}
                />
              ))}
          </tbody>
        </table>
      </div>
      {status === 'loading' && <LoadingState />}
      {status === 'failed' && renderErrorState()}
      <div className='row p-3'>
        <Paginator
          numPages={numPages}
          currentPage={currentPage}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
}

export default CustomersTableView;
