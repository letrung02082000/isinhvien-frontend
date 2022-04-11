import React from 'react';
// import { useHistory } from 'react-router-dom';
// import styles from './swimmingPoolTicketPage.module.css';
import TicketForm from '../components/SwimmingPoolTicketPage/TicketForm';
import SwimmingPoolLayout from '../layouts/SwimmingPoolLayout';

function SwimmingPoolTicketPage() {
  // const history = useHistory();

  return (
    <SwimmingPoolLayout route='/ticket'>
      <TicketForm />
    </SwimmingPoolLayout>
  );
}

export default SwimmingPoolTicketPage;
