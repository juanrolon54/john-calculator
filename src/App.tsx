import { useState } from 'react'
import Calculator from './components/Calculator'

export type State = {
  screen: string
  previous: string
  operation: string
}
const initialState = { screen: '0', previous: '', operation: '' }

function App() {
  const [state, setState] = useState<State>(initialState)

  return (
    <div className='grid place-items-center min-h-screen'>
      <Calculator {...{ state, setState, initialState }} />
    </div>
  )
}

export default App
