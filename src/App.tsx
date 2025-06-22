import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForecastByDays from './pages/ForecastByDays';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/previsao/:cidade" element={<ForecastByDays />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

