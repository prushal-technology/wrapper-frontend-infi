import React, { useEffect, useState } from 'react';

const WidgetWrapper = () => {
  const [data, setData] = useState(null);

  // Internal API URL — no need to pass externally
  const apiUrl = 'http://localhost:8000/api/widget/'; // replace with live API URL

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Widget fetch error:', err));
  }, [apiUrl]);

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
      <h3>{data.title}</h3>
      <p>{data.content}</p>
    </div>
  );
};

export default WidgetWrapper;
