import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './HomeComponent';
import CatsComponent from './CatsComponent';
import AboutComponent from './AboutComponent';
import CatsFormComponent from './CatsFormComponent';


function NavigatorComponent() {

    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "left", position: "static" }}>
                <NavLink to="/" className="standard-link">
                    <button className="standard-button">Home</button>
                </NavLink>
                <NavLink to="/about" className="standard-link">
                    <button className="standard-button">About</button>
                </NavLink>
                <NavLink to="/cats" className="standard-link">
                    <button className="standard-button">Cat Facts</button>
                </NavLink>
                <NavLink to="/form" className="standard-link">
                    <button className="standard-button">Cat Form</button>
                </NavLink>
            </ul>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<AboutComponent />} />
                <Route path="/cats" element={<CatsComponent />} />
                <Route path="/form" element={<CatsFormComponent />} />
            </Routes>
        </nav>
    );
}

export default NavigatorComponent;