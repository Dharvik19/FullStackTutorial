import { Button, Container, Row, Col } from 'react-bootstrap'
import {useState, useEffect} from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import styles from './styles/NotesPage.module.css'
import styleUtils from './styles/utils.module.css'
import * as NotesApi from './network/notes_api';
import AddEditNoteDialog from './components/AddEditNotesDialog';
function App() {

  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit,setNoteToEdit ] = useState<NoteModel | null>(null)
  useEffect(()=>{

    async function loadNotes(){
      try{
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      }catch(error){
        console.error(error);
        alert(error);
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
  return (
    <Container >
      <Button className={`mb-4 ${styleUtils.blockCenter}`} onClick={()=>setShowAddNoteDialog(true)}>
        Add Note
      </Button>
      <Row xs={1} md={2} lg={3} className='g-4'>

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
    </Container>
  );
}

export default App;
