import React, {useState} from 'react'
import LoginForm from './components/LoginForm'
import api from './services/api'
import './App.css';
import './Sidebar.css';
import './global.css'
import history from './services/history';

export default function LoginPage(){

    const[travel, setTravel] = useState([]); 

    async function loadTravel(data) {
  
      const {travel_number, date} = data;
      const response = await api.get('/travel', { 
       params:{
         travel_number,
         date
       },
     })
      console.log(response.status);
      setTravel(response.data);
      if(respose){
          history.push('/appPage')
      }
    }



    return (<div id="app">
    <aside>
      <strong>Seja bem-vindo!</strong>
      <LoginForm onSubmit={loadTravel} />
    </aside>
  </div>);
}