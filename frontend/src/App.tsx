import { Button, Container, Row, Col } from 'react-bootstrap'
import {useState, useEffect} from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import styles from './styles/NotesPage.module.css'
import styleUtils from './styles/utils.module.css'
import * as NotesApi from './network/notes_api';
import AddNoteDialog from './components/AddNoteDiaog';
function App() {

  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
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

  return (
    <Container >
      <Button className={`mb-4 ${styleUtils.blockCenter}`} onClick={()=>setShowAddNoteDialog(true)}>
        Add Note
      </Button>
      <Row xs={1} md={2} lg={3} className='g-4'>

      {notes.map((note)=>(
        <Col>
        <Note note = {note} key={note._id} className={styles.note}></Note>
        </Col>
        ))}
        </Row>
        { showAddNoteDialog && 
            <AddNoteDialog onDismiss={()=>setShowAddNoteDialog(false)} onNoteSaved={(newnote)=>{
              setNotes([...notes,newnote ])
              setShowAddNoteDialog(false)}}></AddNoteDialog>
        }
    </Container>
  );
}

export default App;
