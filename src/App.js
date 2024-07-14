import './App.css';
import AppRoutes from "./routes/AppRoutes";
import {persistor, store} from './store';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       <AppRoutes />
       </PersistGate>
       </Provider>
    </div>
  );
}

export default App;