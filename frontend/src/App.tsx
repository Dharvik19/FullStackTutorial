import { Container } from 'react-bootstrap';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import styles from './styles/NotesPage.module.css'
import {useEffect, useState} from 'react';
import { User } from './models/user';
import * as NotesApi from './network/notes_api'
import NotespageLoggedIn from './components/NotesPageLoggedIn';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';
function App() {

	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showsignUpModel, setShowsignUpModel] = useState(false);
  const [showLoginModel, setShowLoginModel] = useState(false);

  useEffect(()=>{
    async function fetchLoggedInUser(){
      try{
        const user = await NotesApi.getLogedInUser();
        setLoggedInUser(user);
      }catch(error){
        console.error(error);
      }
    }
    fetchLoggedInUser();
  },[])

  return (
    <div>
      <NavBar
				loggedInUser={loggedInUser}
				onLoginClicked={()=>setShowLoginModel(true)}
        onSignUpClicked={()=>setShowsignUpModel(true)}
        onLogOutSuccessful={()=>setLoggedInUser(null)}
			/>
    <Container className={styles.notesPage}>
      <h1>Full Stack Notes App</h1>
       
        <>
      {
      loggedInUser? 
        <NotespageLoggedIn/> 
        : <NotesPageLoggedOutView/>
      }
        </>
      
    </Container>
        {
          showsignUpModel && 
          <SignUpModal
            onDismiss={()=>setShowsignUpModel(false)}
            onSignUpSuccessful={(user)=>{
            setLoggedInUser(user)
            setShowsignUpModel(false)
            }}
          />
        }
        {showLoginModel && 
          <LoginModal
            onDismiss={()=>setShowLoginModel(false)}
            onLoginSuccessful={(user)=>{
              setLoggedInUser(user)
              setShowLoginModel(false)
            }}
          />
        }
    </div>
  );
}

export default App;
