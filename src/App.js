import './App.css';
import ModalHOC from './HOC/ModalHOC';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="appBody">
      <ModalHOC />
      <Homepage />
    </div>
  );
}

export default App;
