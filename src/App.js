import React, {useState } from 'react'
import './App.css';
import { BrowserRouter as Router ,  Route , Switch} from 'react-router-dom'
import Freelancer from './views/freelancer';
import BusinessOwner from './views/BusinessOwner';
import FirstPage from './views/firstPage';
// import { authenticationService } from './services/authService';
import { LangContext } from './utils/langContext';

function App() {

  const [lang, setLang] = useState()


  return (
    <LangContext.Provider value={{ lang, setLang }}>
    <Router>
      <Switch>
        <Route path="/business">
          <BusinessOwner/>
        </Route>
        <Route path="/freelancer">
          <Freelancer />
        </Route>
        <Route path="/">
          <FirstPage/>
        </Route>    
      </Switch>
    </Router>
    </LangContext.Provider>
  );
}

export default App;
