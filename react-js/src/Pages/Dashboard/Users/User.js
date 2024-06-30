import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function User() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    const nav =useNavigate();

    // Id
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        Axios.get(`${USER}/${id}`)
        .then((data)=> {
            setName(data.data.name);
            setEmail(data.data.email);
            setRole(data.data.role);
            setLoading(false);
        })
        .then(()=> setDisable(false))
        .catch(()=> nav("/dashboard/users/page/404",{ replace: true}));
    }, []);

    // Handle Submit
    async function HandleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await Axios.post(`${USER}/edit/${id}`,{
                name: name,
                email: email,
                role: role,
            });
            window.location.pathname = "/dashboard/users";

        } catch(err) {
            setLoading(false);
            console.log(err);
        }
    }
    return(<>{loading &&<LoadingSubmit />}
    <Form className="bg-white w-100 px-4 py-3 rounded shadow-sm" onSubmit={HandleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control value={name} onChange={(e)=> setName(e.target.value)} required  type="text" placeholder="name..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e)=> setEmail(e.target.value)} required type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e)=> setRole(e.target.value)} >
          <option disabled value="">Select Role</option>
             <option value="1995">Admin</option> 
          <option value="2001">User</option>
          <option value="1996">Writer</option>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">Save</button>
      </Form>
      </> 
    );
}










































