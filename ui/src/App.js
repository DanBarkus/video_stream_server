// import logo from './logo.svg';
import * as React from 'react';
import Container from '@mui/material/Container';
import {Responsive, WidthProvider} from "react-grid-layout";

import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import VideoMenu from './components/videoMenu';
import './components/App.css';

import { useEffect } from 'react';


function App() {

  const ResponsiveGridLayout = WidthProvider(Responsive);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [cameras, setcameras] = React.useState([]);
  const breakpoints = { lg: 2400, md: 1800, sm: 900, xs:600};
  const cols = { lg: 8, md: 6, sm: 4, xs: 2};
  // const height = { md: 900, sm: 600, xs: 300 };

  useEffect(() => {
    if (!isLoaded) {
      fetch('http://localhost:5001/cameras')
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        setcameras(result);
      });
    }
  })

  if (isLoaded) {
    console.log(cameras);
    return (
      <Container maxWidth="xxl">
        <ResponsiveGridLayout cols={cols} breakpoints={breakpoints} compactionType={'horizantal'}>
          {
            cameras.map((camera) => {
              return (
                <div key={camera.ID} data-grid={{w:2, h:4, x:0, y:0}}>
                  <img src={'http://localhost:5001/video_feed/'+camera.ID} alt={'cam_'+camera.ID} className='image-frame'/>
                  {/* <>
                    {isShow ?
                      <VideoMenu cameraConfig={camera.Config}/>
                    :
                      <></>
                    }
                  </> */}
                </div>
              )
            })
          }
        </ResponsiveGridLayout>
      </Container>
    );
  }
}

export default App;