import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from "./redux/store.jsx"
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null} >
     <App />
     </PersistGate>
    </Provider>
   
  </StrictMode>,
)
