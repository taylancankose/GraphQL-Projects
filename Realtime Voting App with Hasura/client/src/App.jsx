import { Routes, Route, Link } from "react-router-dom";
import Questions from "./pages/Questions";
import NewQuestion from "./pages/NewQuestion";
import Details from "./pages/Details";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Questions</Link>
        <Link to="/new">New Question</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="/new" element={<NewQuestion />} />
        <Route path="/q/:id" element={<Details />} />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
