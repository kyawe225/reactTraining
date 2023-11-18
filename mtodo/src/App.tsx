import { useState } from 'react'
import {TodoPage} from './pages/TodoPage';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function btnCountClick(){
    setCount((value)=> value+1);
  }

  return (
    <>
      <button onClick={btnCountClick} >Increment {count}</button>
      <TodoPage />
    </>
  )
}

export default App
