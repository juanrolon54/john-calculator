import { Dispatch, SetStateAction } from 'react'
import { State } from '../App'

type Props = {
  state: State
  setState: Dispatch<SetStateAction<State>>
  initialState: State
}

export default ({ state, setState, initialState }: Props) => {
  const concat = (number: string) => () => {
    setState({
      ...state,
      screen:
        number === '.' || state.screen.includes('.')
          ? number === '.' && state.screen.includes('.')
            ? state.screen
            : state.screen + number
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
        ? { ...state, operation: operator }
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
  return (
    <div className='p-2 w-64 h-fit rounded-xl shadow-xl text-4xl z-50'>
      <div
        className='p-2 mb-4 rounded-lg bg-black text-blue-500 w-full flex flex-col justify-end
      '
      >
        <small> &#8203;{state.previous}</small>
        <div>
          <span>{state.operation}</span>
          <span>{state.screen}</span>
        </div>
      </div>
      <div className='grid grid-cols-4 grid-ros-5 gap-2 font-semibold w-full'>
        <div className='button col-span-2'>
          <button
            onMouseDown={clear}
            className='bg-slate-300 col-span-2 w-full'
          >
            C
          </button>
        </div>
        <div className='button'>
          <button onMouseDown={erase} className='bg-slate-300'>
            D
          </button>
        </div>
        <div className='grid grid-cols-3 grid-rows-4 gap-2 col-span-3 row-span-4 row-start-2 row-end-5'>
          {[...'789654123.'].map((number, key) => (
            <div className='button'>
              <button className='bg-slate-500' onMouseDown={concat(number)}>
                {number}
              </button>
            </div>
          ))}
          <div className='button col-span-2'>
            <button
              className='bg-slate-500 col-span-2 w-full'
              onMouseDown={concat('0')}
            >
              {'0'}
            </button>
          </div>
        </div>
        <div className='grid grid-cols-1 grid-rows-5 gap-2 col-span-1 row-span-5 row-start-1 row-end-5 col-start-4 col-end-4'>
          {[...'+-*/'].map((operation, index) => (
            <div className='button'>
              <button className='bg-blue-400' onMouseDown={operate(operation)}>
                {operation}
              </button>
            </div>
          ))}
          <div className='button grid-rows-6'>
            <button onMouseDown={solve} className='bg-blue-400'>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
