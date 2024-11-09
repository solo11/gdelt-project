import * as React from 'react';
import {MantineProvider } from '@mantine/core';

import { SelectActive } from './select-menu';
import { Segmented } from './segmented-menu';

function ControlPanel({eventValue,mapStyle}) {

  return (
    <MantineProvider>
    <div className="control-panel" style={{width:'20vw'}}>
      <h3>Daily Events across the world</h3>
<SelectActive mapStyle={mapStyle} eventValue={eventValue}/>
<div style={{paddingTop:'10px'}}><Segmented mapStyle={mapStyle}/></div>

      <p>
        Map showing daily events across the world extracted from the gdelt project. <br />
        Click on a marker to learn more. 
      </p>
      <p style={{fontSize:'10px'}}>      Event tile is extracted from the article and may not be completely accurate
      </p> 
      <p>
        Data source:{' '}
        <a href="https://www.gdeltproject.org/">
          The GDELT Project
        </a>
      </p>

      <div className="source-link">
        <a
          href="https://github.com/solo11/gdelt-project"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
    </MantineProvider>
  );
}

export default React.memo(ControlPanel);
