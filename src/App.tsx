import Home from './pages/Home'
import { FilterProvider } from './FilterContext'

function App() {

  return (
    <FilterProvider>
      <Home/>
    </FilterProvider>
  )
}

export default App
