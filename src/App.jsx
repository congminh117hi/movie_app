//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  // moi thu return ve goi la jsx khong phai la html
  // can phai nam duoc kien thuc convert html => JSX

  return (
    <>
    {/* cu phap comment trong jsx */}
    {/* day la jsx ko phai html */}
      <h1> Hello word </h1>
      <p className='my-text'>Hi you</p>
      <input type='text' />
    </>
  )
}

export default App
