import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate('/login')
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light"  style={{backgroundColor: "#e3f2fd",opacity:"70%"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">HabiTrack</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/notes" className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} aria-current="page" >Your Habits</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" >Add Habit</Link>
                            </li>

                            <li className="nav-item" >
                                <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} >About</Link>
                            </li>
                            <li className="nav-item" >
                                <Link to="/suggestions" className={`nav-link ${location.pathname === "/suggestions" ? "active" : ""}`} >Suggestions</Link>
                            </li>
                            <li className="nav-item" >
                                <Link to="/progress" className={`nav-link ${location.pathname === "/suggestions" ? "active" : ""}`} >Progress</Link>
                            </li>
                        </ul>


                        {!localStorage.getItem('token') ?
                            <form className='d-flex'>
                                <Link to="/login" className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} >Login</Link>
                                <Link to="/signup" className={`nav-link ${location.pathname === "/signup" ? "active" : ""}`} >SignUp</Link>
                            </form> :
                            <Link to="/login" onClick={handleLogout} className={`nav-link ${location.pathname === "/logout" ? "active" : ""}`} >Logout</Link>
                        }

                    </div>
                </div>
            </nav>


        </div>
    )
}
export default Navbar