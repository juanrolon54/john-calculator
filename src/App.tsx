import { useState } from 'react'

type State = {
  screen: string
  previous: string
  operation: string
}

function Calculator() {
  const initialState = { screen: '0', previous: '', operation: '' }
  const [state, setState] = useState<State>(initialState)

  const concat = (number: string) => () => {
    setState({
      ...state,
      screen:
        number === '.' || state.screen.includes('.')
          ? state.screen + number
          : String(Number(state.screen + number)),
      previous: state.previous
    })
  }

  const calculate = (): string =>
    String(eval(state.previous + state.operation + state.screen))

  const operate = (operator: string) => (): void => {
    const emptyScreen = state.screen === ''
    if (operator === state.operation && emptyScreen) return
    setState(
      emptyScreen
        ? { ...initialState, operation: operator }
        : {
            screen: '',
            previous: calculate(),
            operation: operator
          }
    )
  }
  const solve = () => {
    setState({ ...initialState, screen: calculate() })
  }
  const clear = () => {
    setState(initialState)
  }
  const erase = () => {
    setState({
      ...state,
      screen: state.screen.length <= 1 ? '0' : state.screen.slice(0, -1)
    })
  }
  const operations = '+-*/'
  return (
    <div>
      <small> &#8203;{state.previous}</small>
      <h2>
        <span>{state.operation}</span>
        <span>{state.screen}</span>
      </h2>
      {[...'0123456789.'].map((number, key) => (
        <button className='border border-black p-1' onClick={concat(number)}>
          {number}
        </button>
      ))}
      {[...operations].map((operation, index) => (
        <button
          className='border border-black p-1'
          onClick={operate(operation)}
        >
          {operation}
        </button>
      ))}
      <button onClick={solve}>=</button>
      <button onClick={erase}>D</button>
      <button onClick={clear}>C</button>
    </div>
  )
}

export default Calculator
