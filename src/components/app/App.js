import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../header/Header'
import Filter from '../filter/Filter'
import Map from '../map/Map'
import './globalStyles/StyleVariables.css'
import './App.css'

function App() {
  const [states, setStates] = useState([])

  useEffect(() => {
    if (states.length < 1) {
      axios.get('http://localhost:8080/states').then((response) => {
        setStates(response.data)
      })
    }
  }, [states.length])

  return (
    <div className='app'>
      <Header />
      <div className='map-container'>
        <Filter data={states} />
        <Map />
      </div>
    </div>
  )
}

export default App
