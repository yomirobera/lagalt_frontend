import React from 'react';
import { Checkbox } from 'antd';
import { Icon } from '@iconify/react';
import './Filtering.css';
import { useDispatch } from 'react-redux';
import { filterProjects } from '../../redux/projectsReducer';
import { fetchProjectList } from '../../redux/actions'

const Filtering = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = React.useState({});

  const filterSelectedproject = (value) => {
    dispatch(filterProjects(value))
  }

  const fetchAllProjects = () => {
    dispatch(fetchProjectList())
  }
  return (
    <div className='checkboxAside'>
      <h2>Filter</h2>
      <Checkbox className='checkbox-item' onClick={fetchAllProjects}>
        <span>Vis populære</span>
        <div className='populærItems'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Checkbox>
      <Checkbox className='checkbox-item' onClick={() => filterSelectedproject('music')}>
          <span>Musikk</span>
          <Icon icon="ph:music-notes-fill" className="catagory-icon" />
      </Checkbox>
      <Checkbox className='checkbox-item' onClick={() => filterSelectedproject('Film')}>
        <span>Film</span>
        <Icon icon="icon-park:film" className="catagory-icon" />
      </Checkbox>
      <Checkbox className='checkbox-item' onClick={() => filterSelectedproject('Spillutvikling')}>
        <span>Spillutvikling</span>
        <Icon icon="fa-solid:headset" className="catagory-icon" />
        </Checkbox>
      <Checkbox className='checkbox-item' onClick={() => filterSelectedproject('Webutvikling')}>
        <span>Webutvikling</span>
        <Icon icon="mdi:code" className="catagory-icon"/>
      </Checkbox>
      <h3>Dette er lagAlt</h3>
      <p>lagAlt er den enkleste måten å finne folk til dine kreative prosjekter. 
       Det enste du trenger å gjøre for å komme i gang er å opprette et prosjekt med
       beskrivelse og ønskede ferdighter, så er søke-prosessen etter kreative og flinke folk igangsatt.<br/>
      <strong>Tjenesten er gratis og uforpliktende!</strong> 
       
       </p>
    </div>
  ); 
  
  /* return (
    <div>
      <h2>Filter By:</h2>
      <button onClick={() => fetchAllProjects()}>Vis populære</button>
      <button onClick={() => filterSelectedproject('music')}>Music</button>
      <button onClick={() => filterSelectedproject('Film')}>Film</button>
      <button onClick={() => filterSelectedproject('Sillutvikling')}>Spillutvikling</button>
      <button onClick={() => filterSelectedproject('Webutvikling')}>Webutvikling</button>
    </div>
  ); */
};

export default Filtering;