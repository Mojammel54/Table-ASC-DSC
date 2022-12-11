import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [isAsc, setIsAsc] = useState(true)

  const [status, setStatus] = useState('')
  const [tabledata, settableData] = useState([])

  useEffect(() => {

    fetch(`http://localhost:5000/task?order=${isAsc ? 'asc' : 'dsc'}`)
      .then(res => res.json())
      .then(data => settableData(data))




  }, [isAsc])




  const selected = (id) => {

    console.log(id)

    setStatus(true)

    fetch(`http://localhost:5000/status?id=${id}`)
      .then(res => res.json())
      .then(data => console.log(data))




  }
  const notselected = (id) => {


    setStatus(false)
    console.log(id, 'not')
    fetch(`http://localhost:5000/status?id=${id}`)
      .then(res => res.json())
      .then(data => console.log(data))




  }

  console.log(tabledata)


  return (
    <div className="App">
      <div className="overflow-x-auto">
        <table className="lg:table w-full table-auto">


          <thead>
            <tr className=''>
              <th></th>
              <th>First Name</th>
              <th>Last name</th>
              <th>Age</th>
              <th>Fullname</th>
              <th>Status</th>
              <th>Action</th>
              <th> <button className='btn btn-secondary' onClick={() => setIsAsc(!isAsc)}>{isAsc ? 'dsc' : 'asc'}</button></th>

            </tr>
          </thead>
          {

            tabledata?.map((table, index) => <tbody key={index}>
              <tr>
                <th>{index + 1}</th>
                <td>{table.firstName}</td>
                <td>{table.lastName} </td>
                <td>{table.age}</td>
                <td>{table.fullname}</td>
                <td>{!status ? <button onClick={() => selected(table._id)}>True</button> : <button onClick={() => notselected(table._id)}>False</button>}</td>
              </tr>

            </tbody>)

          }
        </table>
      </div>
    </div>
  );
}

export default App;
