import { NavLink, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import SortVisualizer from './pages/sortingComponents/Visualizer';
import SearchVisualizer from './pages/searchComponents/Visualizer';

function App() {

  return (
    <>
    <div className='app'>

      <nav>
      <h3>Visualizer</h3>
        <ul>
          <li><NavLink className="NavLink" to="/" style={({ isActive }) => { return isActive ? { borderBottom: "3px solid green" } : {}}}>Home</NavLink></li>
          <li><NavLink className="NavLink" to="/sorting" style={({ isActive }) => { return isActive ? { borderBottom: "3px solid green" } : {}}}>Sorting</NavLink></li>
          <li><NavLink className="NavLink" to="/searching" style={({ isActive }) => { return isActive ? { borderBottom: "3px solid green" } : {}}}>Searching</NavLink></li>
        </ul>
      </nav>

      <Routes>
      <Route path='/' element={  <Home /> } exact />
      <Route path="/sorting" element={  <SortVisualizer />} />
      <Route path="/searching" element={  <SearchVisualizer />} />
     </Routes>

    </div>
       
    </>
  )
}

export default App;
