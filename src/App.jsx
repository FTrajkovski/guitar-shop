
import "./App.css";
import BrandComponent from "./pages/BrandComponent";
import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
function Home(){
  return <h1>Home</h1>;
}
function Brands(){
  return (<>
  <h1>Brands</h1>
  <BrandComponent />
  </>)
}

function App() {

  return (
    <Router>
        <nav>
          <Link to="/">Home | </Link>
          <Link to="/brands">Brands</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brands" element={<Brands />} />

        </Routes>
    </Router>
    
  );
}

export default App;
