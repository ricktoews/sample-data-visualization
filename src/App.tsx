import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NivoPieSample from './components/nivo/Pie';
import NivoBarSample from './components/nivo/Bar';
import NivoLineSample from './components/nivo/Line';
import VictoryPieSample from './components/victory/Pie';
import VictoryBarSample from './components/victory/Bar';
import VictoryLineSample from './components/victory/Line';

import './App.css';

function Main() {
  return <div style={{textAlign: 'center'}}>For displaying data visualization samples.</div>
}

function App() {

  const navigate = (e: any) => {
    let navItem = e.target;
    let navPath = navItem.dataset.path;
    console.log('navigation item', navItem, navPath);
  }

  return (
    <div className="App">
      <header className="App-header">Data Visualization</header>

      <nav>
        <ul>
          <li><a href="/nivo/pie">Pie Chart</a></li>
          <li><a href="/nivo/bar">Bar Chart</a></li>
          <li><a href="/nivo/line">Line Chart</a></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/victory/pie" element={<VictoryPieSample />} />
        <Route path="/victory/bar" element={<VictoryBarSample />} />
        <Route path="/victory/line" element={<VictoryLineSample />} />
        <Route path="/nivo/pie" element={<NivoPieSample />} />
        <Route path="/nivo/bar" element={<NivoBarSample />} />
        <Route path="/nivo/line" element={<NivoLineSample />} />
      </Routes>
    </div>
  );
}

export default App;
