import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Error404 from './pages/Error404';

import { useAuth } from './context/AuthContext';

function App() {
  console.log('useAuth isLoggedIn:', useAuth()?.isLoggedIn);
  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </main>
  );
}

export default App;
