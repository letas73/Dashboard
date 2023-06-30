import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout';
import Board from './pages/board/Board';
import Calendar from './pages/calendar/Calendar';
import Dashboard from './pages/dashboard/Dashboard';
import DataGrid from './pages/data-grid/DataGrid';

function App() {
  return (
    <div id="dashboard" className="app">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='calendar' element={<Calendar />} />
          <Route path='board' element={<Board />} />
          <Route path='users' element={<DataGrid />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
