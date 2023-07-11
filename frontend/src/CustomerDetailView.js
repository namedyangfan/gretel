import { useEffect, useState } from 'react';

import LoadingState from './LoadingState';
import api from './api';

function CustomerDetailView({ id }) {
  const [customer, setCustomer] = useState({});
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    api
      .getCustomerDetail(id)
      .then((response) => {
        setCustomer(response.data);
        setStatus('success');
      })
      .catch(function (error) {
        setStatus('failed');
      });
  }, [id]);

  function renderDetail() {
    switch (status) {
      case 'loading':
        return <LoadingState />;
      case 'success':
        return (
          <tr className='cursor-pointer'>
            <td>
              <i className='bi bi-person'>
                {`${customer.firstName} ${customer.lastName}`}
              </i>
            </td>
            <td>
              <i className='bi bi-house'> address: {customer.address}</i>
            </td>
            <td>
              <i className='bi bi-telephone'> phone: {customer.phoneNumber}</i>
            </td>
          </tr>
        );
      default:
        return <i className='bi bi-bug'>Sorry, something went wrong</i>;
    }
  }
  return renderDetail();
}

export default CustomerDetailView;
