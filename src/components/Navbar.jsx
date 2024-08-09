import '../css/navbar.css'
import { useNavigate } from "react-router-dom";


const Navbar = () => {


    
    const navigate = useNavigate()


    const handleNavigate = (e) => {
        const {name} = e.target
        navigate(name)
    }


    
    return ( 
        <nav className="nav-container">
            <h1>FinanceApp</h1>
            <div>
                <button onClick={handleNavigate} name="/">Home</button>
                <button onClick={handleNavigate} name="/finances">Finance Sheet</button>
                <button onClick={handleNavigate} name="/add">Add Expenses/Income</button>
            </div>
        </nav>
     );
}
 
export default Navbar;