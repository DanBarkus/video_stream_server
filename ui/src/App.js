// import logo from './logo.svg';
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import {Responsive, WidthProvider} from "react-grid-layout";

import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import VideoMenu from './components/videoMenu';
import './components/App.css';

import { useEffect } from 'react';

function App() {

  const ResponsiveGridLayout = WidthProvider(Responsive);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cameras, setcameras] = useState([]);
  const [layout, setLayout] = useState([]);
  const breakpoints = { lg: 2400, md: 1800, sm: 900, xs:600};
  const cols = { lg: 8, md: 6, sm: 4, xs: 2};

  const getFromLS = (key) => {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
        // console.log(ls);
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }
  
  const saveToLS = (key, value) => {
    if (global.localStorage) {
      // console.log(value);
      global.localStorage.setItem(
        "rgl-7",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }
  
  const onLayoutChange = (layout) => {
    saveToLS("layout", layout);
  }

  const originalLayout = getFromLS("layout") || [];

  const setup = () => {
    console.log("doing setup");
    fetch('http://localhost:5001/cameras')
      .then(res => res.json())
      .then((result) => {
        setcameras(result);
        // setIsLoaded(true);
        console.log(result);
    });
    setLayout(JSON.parse(JSON.stringify(originalLayout)));
  }

  useEffect(() => {
    setup()
  }, [])

  
  return (
    <Container maxWidth="xxl">
      <ResponsiveGridLayout 
        cols={cols}
        breakpoints={breakpoints}
        compactionType={'horizantal'}
        layout={layout}
        onLayoutChange={onLayoutChange}
      >
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



export default App;