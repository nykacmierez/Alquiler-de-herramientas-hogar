/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './hooks/useAppContext';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Rentals } from './pages/Rentals';
import { Tools } from './pages/Tools';
import { AddTool } from './pages/AddTool';
import { NewRental } from './pages/NewRental';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="tools" element={<Tools />} />
            <Route path="add-tool" element={<AddTool />} />
            <Route path="new-rental/:toolId" element={<NewRental />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}
