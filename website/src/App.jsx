import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Content from './Content.jsx';

function App() {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <Content selectedDay={selectedDay} />
    </div>
  );
}

export default App;