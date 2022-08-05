import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidenav.css';

const Sidenav = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  return (
    <div className='sidenave-holder'>
      <div className='side-links' onClick={() => setShow(!show)}>
        <h4>Student</h4>
        {!show && <i className="fas fa-caret-down"></i>}
        {show && <i className="fas fa-caret-up"></i>}
      </div>
      {show && (<div className='side-links' onClick={() => navigate('/view-student')}>
        <i className="fas fa-users"></i>
        <h4>View Student</h4>
      </div>)}
      {show && (<div className='side-links' onClick={() => navigate('/add-student')}>
        <i className="fas fa-user-plus"></i>
        <h4>Add Student</h4>
      </div>)}
    </div>
  )
}

export default Sidenav;