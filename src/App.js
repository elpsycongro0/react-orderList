import * as React from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import MyOrders from './components/MyOrders';
import AddEdit from './components/AddEdit';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<MyOrders/>}/>
          <Route exact path="/add_edit" element={<AddEdit/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
