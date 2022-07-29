import React from 'react';
import Layout from '../components/Layout';
import OrderModal from '../components/OrderModal';

const SuccessPage = () => {
  return (
    <Layout>
      <OrderModal setOpened={() => {}} opened={true} paymentMethod={1} />
    </Layout>
  );
};

export default SuccessPage;
