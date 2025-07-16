import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './components/AppRoutes'
import { Provider } from 'react-redux';         
import store from './redux/store'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}> 
    <AppRoutes />
     </Provider>
  </StrictMode>,
);
