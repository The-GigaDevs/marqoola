import './divisionselector.scss'

import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import React from 'react'
import Select from 'react-select'

const options = [
  { value: 'allDivisions', label: 'All Divisions' },
  { value: 'divisionA', label: 'Division A' },
  { value: 'divisionB', label: 'Division B' }
]

const Divisionselector = () => {
    const { dispatch } = useContext(DarkModeContext);
  
    return (
        <div className='divisionselector'>
            <Select options={options} />
        </div>
    );
};

export default Divisionselector