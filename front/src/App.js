import './App.css';
import { Routes, Route} from 'react-router-dom';
import ListUser from './components/ListUser';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import MessageError from './components/MessageError';
import MessageSuccess from './components/MessageSuccess';
import 'bootstrap/dist/css/bootstrap.min.css'
import { MessegeContext } from './context/MessageContext';
import { useState } from 'react';

function App() {
  const [isVisible, setIsVisible] = useState("none");
  const [message, setMessage] = useState('');
  console.log(isVisible)
  
  function closeMessege(){
    console.log("close")
    setIsVisible('none');
  }

  function openMessageError(m){
      setIsVisible('error');
      setMessage(m);
  }

  function openMessageSuccess(){
      setIsVisible('success');
  }
  return (
    <>
      <MessegeContext.Provider value = {{closeMessege, openMessageError, openMessageSuccess, isVisible}}>
        <Routes>
          <Route path='/' element = {<ListUser/>}/>
          <Route path='/create' element = {<CreateUser/>}/>
          <Route path='/edit/:id' element = {<EditUser/>}/>
          <Route path='*' element = {<p>СТРАНИЦА НЕ НАЙДЕНА</p>}/>
        </Routes>
        <div className={`position-absolute top-10 start-50 translate-middle ${isVisible === 'error' ? '' : 'd-none'}`}>
          <MessageError message={message} />
        </div>
        <div className={`position-absolute top-10 start-50 translate-middle ${isVisible === 'success' ? '' : 'd-none'}`}>
            <MessageSuccess />
        </div>
      </MessegeContext.Provider>
    </>
  );
}

export default App;
