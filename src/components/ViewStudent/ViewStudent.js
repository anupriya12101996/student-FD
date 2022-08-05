import React, { useState, useEffect } from 'react';
import Sidenav from '../SideNav/Sidenav';
import './ViewStudent.css';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Swal from 'sweetalert2';
import env from '../../utils/AppDetails';
import EditStudent from '../EditStudent/EditStudent';
import * as XLSX from 'xlsx';

const ViewStudent = () => {

  useEffect(() => {
    getStudentData();
  }, []);

  const [students, setStudents] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [currData, setCurrData] = useState({});
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'fullname', headerName: 'Full Name' },
    { field: 'dob', headerName: 'Age', type: 'number' },
    { field: 'school', headerName: 'School' },
    { field: 'class', headerName: 'Class' },
    { field: 'division', headerName: 'Division' },
    { field: 'status', headerName: 'Status' },
    {
      field: 'edit', headerName: 'Edit', renderCell: (params) => {
        const handleClick = () => {
          setCurrData(params.row);
          handleShowEdit();
        }
        return <button className="btn btn-edit" onClick={handleClick}>Edit</button>
      }
    },
    {
      field: 'delete', headerName: 'Delete', renderCell: (params) => {
        const handleClick = () => {
          axios.post(`${env.apiurl}delete-student`, { id: params.row._id }).then(res => {
            if (res.data.data) {
              getStudentData();
              Swal.fire({
                title: 'Success',
                text: 'Student Deleted Successfully',
                icon: 'success',
              });
            }
          }, err => {
            console.log(err);
          });
        }
        return <button className="btn btn-delete" onClick={handleClick}>Delete</button>
      }
    },
  ];

  const getStudentData = () => {
    axios.get(`${env.apiurl}get-student`).then(res => {
      if (res.data.data) {
        let newArray = res.data.data.map((x, index) => {
          return {
            _id: x._id,
            id: index + 1,
            fullname: x.name,
            dob: x.dob,
            school: x.school,
            class: x.class,
            division: x.division,
            status: x.status == 'true' ? 'Active' : 'Inactive',
          }
        });
        setStudents(newArray);
      }
    }, err => {
      console.log(err);
    });
  }

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  }

  const downloadData = () => {
    const finalArray = students.map(x => {
      delete x["_id"];
      return {
        ...x,
      }
    });
    const workSheet = XLSX.utils.json_to_sheet(finalArray);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Students List");
    XLSX.writeFile(workBook, "Students.xlsx");
  }

  return (
    <div className='add-holder'>
      {showEdit ? <EditStudent currData={currData} handleShowEdit={handleShowEdit} getStudentData={getStudentData} /> : null}
      <Sidenav />
      <div className='right-holder'>
        {students.length > 0 ? (<div style={{ height: 320 }}>
          <DataGrid
            rows={students}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[4]}
            className="table-holder"
          />
        </div>) : (
          <h1>No Data Found..!!</h1>
        )}
        <button className='download-btn' onClick={downloadData}>Download Excel</button>
      </div>
    </div>
  )
}

export default ViewStudent;