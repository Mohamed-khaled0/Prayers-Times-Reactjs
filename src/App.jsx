/* eslint-disable no-unused-vars */
import './App.css'
import Button from '@mui/material/Button';
import { Container, Stack } from '@mui/material';
import Main from './components/Main';

function App() {

  return (
    <div style={ {display:"flex" , justifyContent:"center" , width: "100vw"}}>
      <Container maxWidth="xl">
      <Main />
      </Container>
    </div>
  )
}

export default App
