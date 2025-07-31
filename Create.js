import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export default function Create() {
let [data,setdata]=useState({});
const route = useNavigate();

function handleChange(e){
    setdata({...data,[e.target.id]:e.target.value})

}

async function handleSubmit(e){
    e.preventDefault()
    console.log(data)
    const res = await axios.post("http://localhost:3002/projects",data)
    console.log(res.data);
    route("/list");
    }
    




    return(
        <>
            <div className="container mt-5">
                <h2>ADD A INFORMATION </h2>
                <form onSubmit = {handleSubmit}>
                    <div className="mt-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter your Name" onChange={handleChange} value={data.name}/>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input type="number" class="form-control" id="age" placeholder="Enter your age" onChange={handleChange} value={data.age}/>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="phone" class="form-control" id="phone" placeholder="Enter your phone"  onChange = {handleChange} value={data.phone}/>
                    </div>
                   
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
      </>
)
}
