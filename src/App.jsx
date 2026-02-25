import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import TimelineIntegrated from './components/TimelineIntegrated';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category" element={<Category />} />
                <Route path="/timeline" element={<TimelineIntegrated />} />
            </Routes>
        </Router>
    );
}

export default App;
