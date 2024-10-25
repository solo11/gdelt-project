import * as React from 'react';
import {useState, useMemo,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';

import '@mantine/core/styles.css';

import ControlPanel from './control-panel';
import Pin from './pin';

import axios from "axios"

const TOKEN = 'pk.eyJ1IjoibHVjaWRiIiwiYSI6ImNtMmlmYjVydzBrcGsycW9mMnJwbnIxcGEifQ.CqRqKkpioUGxexYoMQTIHQ'; // Set your mapbox token here

export default function Home() {
  const [popupInfo, setPopupInfo] = useState(null);

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  const [eventValue, setEventValue] = useState('ALL')

  const [mapStyle, setMapStyle] = useState('light')

  function updateEventValue(val) {
    setEventValue(val)
  }

  function updateMapStyle(val) {
    setMapStyle(val)
  }
  useEffect(() => {

    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get('https://fastapi-app-solo117844-l17pf0r0.leapcell.dev/today');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    fetchData();

  },[])

  function get_color(event) {
   const colors = {
      AFFECT: '#d90824',
      ARREST: '#f77e25',
      EVACUATION: '#7d3c98',
      KIDNAP: '#34495e',
      POVERTY: '#515a5a',
      PROTEST: '#515a5a',
      KILL: '#e74c3c',
      SEIZE: '#1a5276',
      WOUND: '#641e16',
    };
    return colors[event];
  }

async function get_title(input) {
  article = await extract(input,{},{
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  return(article.title)
    }

    const pin_next = Object.keys(data).map((keyName, i) => (
      eventValue !== 'ALL' ? (eventValue == data[keyName]['event']  ? (
      <Marker
      key={i}
      longitude={data[keyName]['longitude']}
      latitude={data[keyName]['latitude']}
      anchor="bottom"
      onClick={e => {
        // If we let the click event propagates to the map, it will immediately close the popup
        // with `closeOnClick: true`
        e.originalEvent.stopPropagation();
        setPopupInfo(data[keyName]);
        
      }}
    >
      <Pin color={get_color(data[keyName]['event'])} />
    </Marker>) : null) : (
      <Marker
      key={i}
      longitude={data[keyName]['longitude']}
      latitude={data[keyName]['latitude']}
      anchor="bottom"
      onClick={e => {
        // If we let the click event propagates to the map, it will immediately close the popup
        // with `closeOnClick: true`
        e.originalEvent.stopPropagation();
        setPopupInfo(data[keyName]);
        
      }}
    >
      <Pin color={get_color(data[keyName]['event'])} />
    </Marker>)
    ));

  return (
 <>
      <Map
       initialViewState={{
         latitude: 40,
         longitude: 0,
         zoom: 2,
         bearing: 0,
         pitch: 0
       }}
     
       mapStyle=  {mapStyle == 'dark' ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11"}
       // "mapbox://styles/mapbox/dark-v11"
       mapboxAccessToken={TOKEN}
     >
       <GeolocateControl position="top-left" />
       <FullscreenControl position="top-left" />
       <NavigationControl position="top-left" />
       <ScaleControl />

       {pin_next}
       {console.log(mapStyle)}

       {popupInfo && (
         <Popup
           anchor="top"
           longitude={Number(popupInfo['longitude'])}
           latitude={Number(popupInfo['latitude'])}
           onClose={() => setPopupInfo(null)}
         >
           <h2>{popupInfo['title']}</h2>
          
             {console.log(() => {get_title(popupInfo['eventDocument'])})}
    
           <h2>{popupInfo['event']}</h2>
           <div>
             {popupInfo['region']} |{' '}
             <a
               target="_new"
               href={popupInfo['eventDocument']}
             >
               Article
             </a>
           </div>
           <img width="100%" src={popupInfo['image']} />
         </Popup>
       )}
     </Map>


     <ControlPanel mapStyle={updateMapStyle}  eventValue={updateEventValue}/>
   </>

  );
}

export function renderToDom(container) {
  createRoot(container).render(<Home />);
}