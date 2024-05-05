import { Route, Routes } from 'react-router-dom';
import SignIn from './SignIn/SignIn';
import Channels from './Channels/Channels';
import { useSelector } from 'react-redux';
import NewChannel from './Channels/NewChannel/NewChannel';
import NewMessage from './Messages/NewMessage/NewMessage'

function App() {
  const isLogedin = useSelector((state) => state.auth.isLogedin)



  return (
    <div>
      <Routes>
        <Route path='/' element={!isLogedin? <SignIn />:  <Channels />} />
        { isLogedin && <Route path='/newChannel' element = {<NewChannel />} />}
        { isLogedin && <Route path='/NewMessage' element = {<NewMessage />} />}
      </Routes>
    </div>
  );
}

export default App;
