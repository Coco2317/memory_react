import './App.css';
import Card from './components/card/card';

import moonImage from './assets/image.jpg';

function App() {
  return (
    <div className="App">
      <Card 
        imageUrl={moonImage}
        title="Hello React Card"
        onClick={() => console.log('Card clicked!')}
      />
    </div>
  );
}

export default App;