
import './App.css';
import WidgetWrapper from './WidgetWrapper';
// import App2 from './components/test-wrapper.jsx';
import ChatVoiceBot from './components/finalWrapper.jsx';

function App() {
  return (
   <div
      className="App"
      style={{
        border: '2px solid red',
        height: '800px', // 👈 lowercase 'height'
        width: '500px',
        overflow: 'hidden',
      }}
    >
      {/* <App2 /> */}
    <ChatVoiceBot />
    </div>
  );
}

export default App;
