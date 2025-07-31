import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Update() {
    let [edit, setedit] = useState([]);
    const route = useNavigate();

    function handleChange(e) {
        setedit({ ...edit, [e.target.id]: e.target.value })
    }


    async function handleSubmit(e) {
        e.preventDefault();
        console.log(edit)
        let id = localStorage.getItem("id")
        const res = await axios.put(`http://localhost:3002/projects/${id}`, edit)
        console.log(res.data)
        route("/list")
    }

    useEffect(() => {
        let id = localStorage.getItem("id");
        console.log(id)
        async function getuser() {
        const res =await axios.get(`http://localhost:3002/projects/${id}`)
        console.log(res.data)
        setedit(res.data[0]);
        }
       getuser()
    }, []);


    return (
        <>
            <div class="container mt-5">
                <h2>EDIT A INFORMATION </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label for="name" className="form-label">Name:</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter your Name" onChange={handleChange} value={edit.name} />
                    </div>

                    <div className="mt-3">
                        <label for="age" className="form-label">Age:</label>
                        <input type="number" class="form-control" id="age" placeholder="Enter your age" onChange={handleChange} value={edit.age} />
                    </div>

                    <div className="mt-3">
                        <label for="phone" className="form-label">Phone</label>
                        <input type="phone" class="form-control" id="phone" placeholder="Enter your phone" onChange={handleChange} value={edit.phone} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}