import React, {useState} from 'react';
import {Link} from 'react-router-dom';


function LoginForm ({ onSubmit }){

    const[travel_number, setTravelNumber] = useState('');
    const[date, setDate] = useState('');
    //const[travel, setTravel] = useState([]);

    async function handleSubmit(e){
        e.preventDefault();
           await onSubmit({
               travel_number,
               date,
           });
           setTravelNumber('');
           setDate('');
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <div  className="input-block">
                <label htmlFor="travel_number">Número da viagem</label>
                <input
                    name="travel_number"
                    id="travel_number"
                    required
                    value={travel_number}
                    onChange={e => setTravelNumber(e.target.value)}
                ></input>
            </div>

      <div className="input-block">
        <label htmlFor="date">Data</label>
        <input
          name="date"
          id="date"
          required
          value={date}
          onChange={e => setDate(e.target.value)}
        ></input>
      </div>
      <button type="submit">
          Buscar  
      </button>
    </form>
    )
}

export default LoginForm;