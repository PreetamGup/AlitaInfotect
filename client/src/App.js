import LoginForm from './pages/Login';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <ProtedtedRoute>
              {/* <HomePage /> */}
            </ProtedtedRoute>
          }
        />
        
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          }
        />
       
      </Routes>
  </BrowserRouter>
  </div>
   
  );
}


const PublicRoute = ({children}) => {
  if(localStorage.getItem('token')){
    return <Navigate to='/' />
  }else{
    return children
  }
}


const ProtedtedRoute = ({children}) => {
  
  if(localStorage.getItem('token')){
    return children
  }else{
    return <Navigate to='/login' />
  }
}

export default App;


