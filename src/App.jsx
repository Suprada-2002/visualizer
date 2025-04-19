import { NavLink, Routes, Route } from 'react-router-dom';
import './App.css';
import { Squirrel } from 'lucide-react';

import Home from './pages/Home';
import SortVisualizer from './pages/sortingComponents/Visualizer';
import SearchVisualizer from './pages/searchComponents/Visualizer';
import PathFindingVisualizer from './pages/pathFinderComponents/Visualizer';

function App() {

  return (
    <>
      <div className='app'>

        <nav>
          <div className='logo'>
            <Squirrel size={55} color='#c45050' /> <p style={{ "fontWeight": 900, "fontSize": "35px" }} > Visualizer</p>
          </div>
          <div className='links'>
            {/* <ul>
          <li><NavLink className="NavLink" to="/" style={({ isActive }) => { return isActive ? { borderBottom: "3px solid #c45050" } : {}}}>Back to Home</NavLink></li>
          <li><NavLink className="NavLink" to="/sorting" style={({ isActive }) => { return isActive ? { borderBottom: "3px solid #c45050" } : {}}}>About Me</NavLink></li>
        </ul> */}
            <div className='link'>
              <NavLink className="NavLink" to="/" style={({ isActive }) => { return isActive ? { borderBottom: "3px solid #c45050" } : {} }}>Back to Home</NavLink>
              <NavLink className="NavLink" to="/sorting" style={({ isActive }) => { return isActive ? { borderBottom: "3px solid #c45050" } : {} }}>About Me</NavLink>
            </div>

          </div>

        </nav>

        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path="/sorting" element={<SortVisualizer />} />
          <Route path="/searching" element={<SearchVisualizer />} />
          <Route path="/pathfinding" element={<PathFindingVisualizer />} />
        </Routes>

      </div>

    </>
  )
}

export default App;
