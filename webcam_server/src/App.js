// import logo from './logo.svg';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './components/App.css';
import Popout from './components/popout';

function App() {
  return (
    <Container maxWidth="xxl">
      <Grid container spacing={0} justifyContent="center" width="100%">
        <Grid item xs={12} xl={6}>
          <img src="http://localhost:5000/video_feed/0" alt="cam_0" />
        </Grid>
        <Grid item xs={12} xl={6}>
          <img src="http://localhost:5000/video_feed/1" alt="cam_1" />
        </Grid>
        <Grid item xs={12} xl={6}>
          <img src="http://localhost:5000/video_feed/2" alt="cam_2" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
