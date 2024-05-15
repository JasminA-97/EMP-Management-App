
import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import View from './components/View'

function App() {
  const[addEmpResponse,setAddEmpResponse]=useState("")

  return (
    <>
     <Home setAddEmpResponse={setAddEmpResponse} />
     <View addEmpResponse={addEmpResponse}/>
    </>
  )
}

export default App
