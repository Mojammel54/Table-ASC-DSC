import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast, Toaster } from 'react-hot-toast';
function App() {
  const [isAsc, setIsAsc] = useState(true)






  const { data: tabledata = [], isLoading, refetch } = useQuery({


    queryKey: [isAsc],
    queryFn: () => fetch(`http://localhost:5000/task?order=${isAsc ? 'asc' : 'dsc'}`)
      .then(res => res.json())



  })







  const selected = id => {

    console.log(id)
    fetch(`http://localhost:5000/status/${id}`, {


      method: "PUT",




    })
      .then(res => res.json())
      .then(data => {

        console.log(data)
        if (data.modifiedCount > 0) {

          toast.success('Status False')
          refetch()

        }



      })





  }


  const notselected = id => {

    fetch(`http://localhost:5000/!status/${id}`, {


      method: "PUT",




    })

      .then(res => res.json())
      .then(data => {

        console.log(data)
        if (data.modifiedCount > 0) {

          toast.success('Status true')
          refetch()

        }



      })



  }
  const marked = id => {

    fetch(`http://localhost:5000/marked/${id}`, {


      method: "PUT",




    })

      .then(res => res.json())
      .then(data => {

        console.log(data)
        if (data.modifiedCount > 0) {

          toast.success('Marked')
          refetch()

        }



      })



  }
  const unmarked = id => {

    fetch(`http://localhost:5000/!marked/${id}`, {


      method: "PUT",




    })

      .then(res => res.json())
      .then(data => {

        console.log(data)
        if (data.modifiedCount > 0) {

          toast.success('unmarked')
          refetch()

        }



      })



  }











  return (
    <div className="App">
      <div className="overflow-x-auto">
        <table className="lg:table w-full table-auto">


          <thead>
            <tr >
              <th></th>
              <th>First Name</th>
              <th>Last name</th>
              <th>Age</th>
              <th>Fullname</th>
              <th>Status</th>
              <th>Action</th>
              <th> <button className='btn btn-warning btn-sm' onClick={() => setIsAsc(!isAsc)}>{isAsc ? 'dsc' : 'asc'}</button></th>

            </tr>
          </thead>
          {

            tabledata?.map((table, index) => <tbody key={index}>
              <tr className={table.active ? 'active' : ''} >
                <th>{index + 1}</th>
                <td>{table.firstName}</td>
                <td>{table.lastName} </td>
                <td>{table.age}</td>
                <td>{table.fullname}</td>
                <td>{table.status ? <button className='text-green-600' onClick={() => selected(table._id)}>True</button> : <button className='text-red-600' onClick={() => notselected(table._id)}>Failed</button>}</td>
                <td>{!table.active ? <button  onClick={() => marked(table._id)}>Marked</button> : <button onClick={() => unmarked(table._id)}>Unmarked</button>}</td>

              </tr>

            </tbody>)

          }
        </table>


      </div>

      <Toaster></Toaster>
    </div>
  );
}

export default App;
