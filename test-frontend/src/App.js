import React, { useEffect, useState } from 'react';
import Dashboard from './components/userList';
import PrecioManagement from './components/precioManagement';

const App = () => {
  return (
    <div>
      <h1>Welcome to Your Application</h1>
      <PrecioManagement />
    </div>
  );
};

export default App;
