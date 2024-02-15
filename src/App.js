import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import './App.css';
import { InstrumentCreatePage } from "./InstrumentCreatePage";
import { InstrumentListPage } from "./InstrumentListPage";
import { InstrumentSinglePage } from "./InstrumentSinglePage";
import { InstrumentModPage } from "./InstrumentModPage";
import { InstrumentDeletePage } from "./InstrumentDeletePage";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={`/`} className="active">
                <span className="nav-link">Hangszerek</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/uj-hangszer`} className="active">
                <span className="nav-link">Új hangszer</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      
      <Routes>
        <Route path="/"element ={<InstrumentListPage />} />

        <Route path="/hangszer/:hangszerId" element ={<InstrumentSinglePage />} />

        <Route path="/uj-hangszer" element={<InstrumentCreatePage/>} />

        <Route path = "mod-hangszer/:hangszerId" element = {<InstrumentModPage/>}/>

        <Route path ="del-hangszer/:hangszerId" element = {<InstrumentDeletePage/>}/>
    </Routes>
    </Router>

    
  );
}

export default App;
 

    