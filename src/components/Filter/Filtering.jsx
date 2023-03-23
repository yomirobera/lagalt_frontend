import React from 'react';
import { Checkbox } from 'antd';
import { Icon } from '@iconify/react';
import './Filtering.css';
import { useDispatch,useSelector} from 'react-redux';
import { filterProjects, selectFilter, deselectFilter,clearFilter } from '../../redux/projectsReducer';
import { fetchProjectList } from '../../redux/actions'

const Filtering = () => {
  const dispatch = useDispatch();
  //const [filter, setFilter] = React.useState({});
  const selectedFilters = useSelector(state => state.projects.selectedFilters);
  const filterSelectedproject = (value) => {
    if (!selectedFilters.includes(value)) {
      dispatch(selectFilter(value));
    } else {
      dispatch(deselectFilter(value));
    }

    /* dispatch(filterProjects(value)) console.log('selectedFilters:', selectedFilters);*/
  }

  const fetchAllProjects = () => {
    dispatch(clearFilter());
    dispatch(fetchProjectList())
  }
  
  return (
    <div className='checkboxAside'>
      <h2>Filter</h2>
      <Checkbox className='checkbox-item' checked={selectedFilters.length === 1 && selectedFilters.includes('')}  onClick={fetchAllProjects}>
        <span>Vis populære</span>
      </Checkbox>
      <Checkbox className='checkbox-item' value='Musikk' checked={selectedFilters.includes('Musikk')}  onClick={() => filterSelectedproject('Musikk')}>
        <span>Musikk</span>
        <Icon icon="ph:music-notes-fill" className="catagory-icon" />
      </Checkbox>
      <Checkbox className='checkbox-item' value='Film' checked={selectedFilters.includes('Film')}  onClick={() => filterSelectedproject('Film')}>
        <span>Film</span>
        <Icon icon="icon-park:film" className="catagory-icon" />
      </Checkbox>
      <Checkbox className='checkbox-item' value='Spillutvikling' checked={selectedFilters.includes('Spillutvikling')}  onClick={() => filterSelectedproject('Spillutvikling')}>
        <span>Spillutvikling</span>
        <Icon icon="fa-solid:headset" className="catagory-icon" />
        </Checkbox>
      <Checkbox className='checkbox-item' value='Webutvikling' checked={selectedFilters.includes('Webutvikling')}  onClick={() => filterSelectedproject('Webutvikling')}>
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
  
};

export default Filtering;