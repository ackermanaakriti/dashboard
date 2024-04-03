
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { MainLayoutProvider } from './Context/MainLayoutContext';

import HomeMenu from './Menus/HomeMenu';

function App() {
  return (
   <>
   <MainLayoutProvider>
  
    
   
   <HomeMenu/>
    
   </MainLayoutProvider>
   </>
  );
}

export default App;
