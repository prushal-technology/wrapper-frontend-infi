
import './App.css';
import WidgetWrapper from './WidgetWrapper';
import App2 from './components/test-wrapper.jsx';

function App() {
  return (
   <div
      className="App"
      style={{
        border: '2px solid red',
        height: '500px', // 👈 lowercase 'height'
        width: '300px',
        overflow: 'hidden',
      }}
    >
      <App2 />
    </div>
  );
}

export default App;
