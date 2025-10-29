import React, { useEffect, useState } from 'react';

const WidgetWrapper = () => {
  const [data, setData] = useState(null);
  const apiUrl = 'http://localhost:8000/api/widget/'; // replace with your API

  console.log("WidgetWrapper rendered"); // <--- Debug

  useEffect(() => {
    console.log("Fetching data from API:", apiUrl); // <--- Debug
    fetch(apiUrl)
      .then(res => res.json())
      .then((resData) => {
        console.log("Data received from API:", resData); // <--- Debug
        setData(resData);
      })
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
