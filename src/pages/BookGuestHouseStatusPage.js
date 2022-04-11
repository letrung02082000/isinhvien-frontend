import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function BookGuestHouseStatusPage() {
  const { state } = useLocation();
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <button onClick={goBack}>Go back</button>
      <p>message: {state ? state.statusText : ''}</p>
    </div>
  );
}

export default BookGuestHouseStatusPage;
