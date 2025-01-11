import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function Machine() {
  const [data, setData] = useState({
    machines: [],
    molds: [],
    materials: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [type, setType] = useState(''); // State for the type filter
  const [name, setName] = useState(''); // State for the name filter

  const fetchData = useCallback(() => {
    setLoading(true);
    let url = 'http://localhost:3000/api/admin/search';

    if (type) {
      url += `?type=${type}`;  // Only append the type if it's provided
    }
    if (name) {
      url += `&name=${name}`; // Append the name filter if it's provided
    }

    axios
      .get(url)
      .then((response) => {
        const formattedData = type ? response.data.data : response.data.formattedResult[0];
        type ? setData({
            machines: {formattedData }
        }) : 
        setData({
          machines: formattedData.machines,
          molds: formattedData.molds,
          materials: formattedData.materials,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, [type, name]); // Dependencies that trigger the fetchData function

  useEffect(() => {
    fetchData(); // Call fetchData when `type` or `name` changes
  }, [fetchData]); // Add fetchData as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Search</h2>
      <div>
        <input
          placeholder="Type (e.g., machines, molds, materials)"
          value={type}
          onChange={(e) => setType(e.target.value)} // Update type filter
        />
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name filter
        />
        <button onClick={fetchData}>Search</button>
      </div>

      {type === '' && (
        <>
          <h2>Machines</h2>
          <ul>
            {data.machines.map((machine) => (
              <li key={machine.id}>{machine.name}</li>
            ))}
          </ul>

          <h2>Molds</h2>
          <ul>
            {data.molds.map((mold) => (
              <li key={mold.id}>{mold.name}</li>
            ))}
          </ul>

          <h2>Materials</h2>
          <ul>
            {data.materials.map((material) => (
              <li key={material.id}>{material.name}</li>
            ))}
          </ul>
        </>
      )}

      {type === 'machines' && (
        <>
          <h2>Machines</h2>
          <ul>
            {data.machines.map((machine) => (
              <li key={machine.id}>{machine.name}</li>
            ))}
          </ul>
        </>
      )}

      {type === 'molds' && (
        <>
          <h2>Molds</h2>
          <ul>
            {data.molds.map((mold) => (
              <li key={mold.id}>{mold.name}</li>
            ))}
          </ul>
        </>
      )}

      {type === 'materials' && (
        <>
          <h2>Materials</h2>
          <ul>
            {data.materials.map((material) => (
              <li key={material.id}>{material.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Machine;
