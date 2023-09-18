import { Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import {useState, useEffect} from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import styles from './styles/NotesPage.module.css'
import styleUtils from './styles/utils.module.css'
import * as NotesApi from './network/notes_api';
import AddEditNoteDialog from './components/AddEditNotesDialog';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
function App() {

  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit,setNoteToEdit ] = useState<NoteModel | null>(null)
  useEffect(()=>{

    async function loadNotes(){
      try{
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      }catch(error){
        console.error(error);
        alert(error);
        setShowNotesLoadingError(true);
      }finally{
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);
  async function deleteNote(note: NoteModel) {
		try {
			await NotesApi.deleteNote(note._id);
			setNotes(notes.filter(existingNote => existingNote._id !== note._id));
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}
  const notesGrid = 
  <Row xs={1} md={2} lg={3} className={`g-4 ${styles.notesGrid}`}>

      {notes.map((note)=>(
        <Col>
        <Note 
            note = {note} 
            key={note._id} 
            className={styles.note}
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClicked={deleteNote}
            />
          
        </Col>
        ))}
        </Row>
  return (
    <Container className={styles.notesPage}>
      <h1>Full Stack Notes App</h1>
      <Button className={`mb-4 ${styleUtils.blockCenter}`} onClick={()=>setShowAddNoteDialog(true)}>
        Add Note
      </Button>
      {notesLoading && <Spinner animation='border' variant='primary'/>}
      {showNotesLoadingError && <p>Something went wrong, please refresh the page</p>}
      {!notesLoading && !showNotesLoadingError && 
        <>
          {notes.length > 0 
            ? notesGrid 
            : <p>You don't have any notes yet</p>
          }
        </>
      }
        { showAddNoteDialog && 
            <AddEditNoteDialog onDismiss={()=>setShowAddNoteDialog(false)} onNoteSaved={(newnote)=>{
              setNotes([...notes,newnote ])
              setShowAddNoteDialog(false)}}></AddEditNoteDialog>
        }
        {noteToEdit && 
            <AddEditNoteDialog
              noteToEdit={noteToEdit}
              onDismiss={()=> setNoteToEdit(null)}
              onNoteSaved={(updatedNote)=>{
                setNotes(notes.map(existinNote => existinNote._id === updatedNote._id ? updatedNote : existinNote))
                setNoteToEdit(null)
              }}  
            />
        }
        {
          false && 
          <SignUpModal
            onDismiss={()=>{}}
            onSignUpSuccessful={()=>{}}
          />
        }
        {false && 
          <LoginModal
            onDismiss={()=>{}}
            onLoginSuccessful={()=>{}}
          />
        }
    </Container>
  );
}

export default App;
