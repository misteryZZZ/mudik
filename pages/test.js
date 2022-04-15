import React, { useState, useRef } from 'react';

// This holds a list of some fiction people
// Some  have the same name but different age and id
const USERS = [
  { id: 1, name: 'Andy', age: 32 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Tom Hulk', age: 40 },
  { id: 4, name: 'Tom Hank', age: 50 },
  { id: 5, name: 'Audra', age: 30 },
  { id: 6, name: 'Anna', age: 68 },
  { id: 7, name: 'Tom', age: 34 },
  { id: 8, name: 'Tom Riddle', age: 28 },
  { id: 9, name: 'Bolo', age: 23 },
];

const selected = 'Anna'

function App() {
  // the value of the search field 
  const [value, setValue] = useState(selected);
  const [fitlered, setFiltered] = useState('');

  // the search result
  const [foundUsers, setFoundUsers] = useState(USERS);
  const [showList, setShowList] = useState(false);
  const input = useRef(null);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = USERS.filter((user) => {
        return user.name.toLowerCase().includes(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(USERS);
      // If the text field is empty, show all users
    }

    setFiltered(keyword);
  };

  const handleClick = () => {
    setShowList(true)
    // input.current.focus()
  }

  return (
    <div className="container">
      <button onClick={handleClick}>{value}</button>
      {showList && (
      <div>
        <input
        ref={input}
        autoFocus
          type="search"
          value={fitlered}
          onChange={filter}
          className="input"
          placeholder="Filter"
        />

        <div className="user-list">
          {foundUsers && foundUsers.length > 0 ? (
            foundUsers.map((user) => (
              <li key={user.id} className="user" onClick={() => {setValue(user.name); setShowList(false)}}>
                <span className="user-name">{user.name}</span>
              </li>
            ))
          ) : (
            <h1>No results found!</h1>
          )}
        </div>
      </div>
        )}
    </div>
  );
}

export default App;
