import React from 'react';

function Sidebar({ selectedDay, setSelectedDay }) {
  const totalDays = 100;
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="w-64 bg-blue-800 text-white p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">100 Days of Code</h1>
      <ul>
        {days.map(day => (
          <li key={day} className="mb-2">
            <button
              onClick={() => setSelectedDay(day)}
              className={`w-full text-left p-2 rounded hover:bg-blue-700 transition-colors ${
                selectedDay === day ? 'bg-blue-900' : ''
              }`}
            >
              Day {day.toString().padStart(2, '0')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;