import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import api from './services/api';
import './App.css';
import './Sidebar.css';
import './global.css';
import history from './services/history';

export default function LoginPage() {
  const [travel, setTravel] = useState({});

  useEffect(() => {
    async function loadTravel() {
      const response = await api.get('/travel', {
        params: {
          travel_number: travel.travel_number,
          date: travel.date,
        },
      });

      if (response.data) {
        goToTravel(response.data);
      }
    }
    loadTravel();
  }, [travel]);

  function handleSubmit(data) {
    setTravel(data);
  }

  function goToTravel({ travel }) {
    if (travel.length > 0) {
      const traveled = travel[0];

      history.push({
        pathname: '/appPage',
        travel: traveled,
      });
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Informe sua viagem!</strong>
        <LoginForm onSubmit={handleSubmit} />
      </aside>
    </div>
  );
}
