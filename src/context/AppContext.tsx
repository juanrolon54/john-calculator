import {
  createContext,
  useContext as useReactContext,
  ReactNode,
  useState
} from 'react'
export type Size = [number, number, number]
export type ContextValue = {
  size: Size
  setSize: React.Dispatch<React.SetStateAction<Size>>
}

const Context = createContext<ContextValue | null>(null)

export type ContextProviderProps = {
  children: ReactNode
}
export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [size, setSize] = useState<Size>([1, 1, 1])
  return (
    <Context.Provider value={{ size, setSize }}>{children}</Context.Provider>
  )
}

export const useContext = () => {
  const context = useReactContext(Context)
  return context as ContextValue
}
