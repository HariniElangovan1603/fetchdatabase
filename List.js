import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function List() {
  const [users,setusers] = useState([]);
  const route = useNavigate();

  async function getusers() {
    let res = await axios.get("http://localhost:3002/projects",users)
    setusers(res.data)
  }

  async function handleDelete(id) {
    let res = await axios.delete(`http://localhost:3002/projects/${id}`)
    console.log(res.data)
  }
  async function handleUpdate(id) {
    localStorage.setItem("id", id)
    route("/update")
  }

  useEffect(() => {
    getusers(setusers);
  },[])



  return (
    <>
      <div className="container mt-5">
        <h2> INFORMATION LIST</h2>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((val) =>
              <tr>
                <td>{val.name}</td>
                <td>{val.age}</td>
                <td>{val.phone}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleUpdate(val.id)}>Update</button>
                  </td>
                <td><button className="btn btn-danger" onClick={() => handleDelete(val.id)}>delete</button></td>
              </tr>
            )}


          </tbody>
        </table>
      </div>
    </>

  )
}