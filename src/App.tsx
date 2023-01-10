import { useEffect, useRef, useState } from 'react'

import Calculator from './components/Calculator'
import Cube from './components/Cube'
import { useContext } from './context/AppContext'
import { Size } from './context/AppContext'

export type State = {
  screen: string
  previous: string
  operation: string
}
const initialState = { screen: '0', previous: '', operation: '' }

function App() {
  const [state, setState] = useState<State>(initialState)
  const { setSize } = useContext()
  const rotateAxis = useRef(0)

  useEffect(() => {
    const size =
      Number(String(state.screen)[String(state.screen).length - 1]) / 4
    setSize((prev) => {
      if (Number.isNaN(size)) return prev
      let newSize = [...prev] as Size
      const randomIndex = Math.floor(Math.random() * 10) % 3
      newSize[rotateAxis.current] = size
      rotateAxis.current = rotateAxis.current > 1 ? 0 : rotateAxis.current + 1
      console.log(newSize)
      return newSize
    })
  }, [state, setSize])
  return (
    <div className='grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 place-items-center min-h-screen'>
      <Cube />
      <Calculator {...{ state, setState, initialState }} />
    </div>
  )
}

export default App
