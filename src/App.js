import './App.css';
import HOCModal from './HOC/HOCModal';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="appBody">
      <HOCModal />
      <Homepage />
    </div>
  );
}

export default App;
