import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContent from "./Componenets/MainContent";
import MailwithPhoto from "./Componenets/MailwithPhoto";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/EmailwithPhoto" element={<MailwithPhoto />}/>
      </Routes>
    </Router>
  );
};

export default App;
