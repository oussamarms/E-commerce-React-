import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { REGISTER, baseURL } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal"
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";


export default function Register(){
    // States
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    // Ref
    const focus = useRef("");

    // Loading

    const [loading, setLoading] = useState(false);

    // Cookies

    const cookie = Cookie();

    // Err
    const [err, setErr] = useState("");

    // Handle Form Change

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value});
    }
     // Handle Focus
     useEffect(() => {
        focus.current.focus();
    }, []);

    // Handle Submit
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        try{
           const res = await axios.post(`${baseURL}/${REGISTER}`, form);
            setLoading(false);
            const token = res.data.token;
            cookie.set("e-commerce", token);
            navigate("/dashboard/users", { replace: true });            
            } catch(err) {
            setLoading(false);


            if (err.response.status === 422){
                setErr("Email is already been taken");
            } else {
                setErr("Internel Server ERR");
            }
        }
        
    }
    return(
        <>
        {loading && <LoadingSubmit />}
        <div className="container">
        <div className="row" style={{height: "100vh"}}>
        <Form className="form" onSubmit={handleSubmit}>
                <div className="custom-form">
                    <h1 className="mb-3">Register Now</h1>
                    <Form.Group className="form-custom">
               <Form.Control value={form.name} ref={focus} onChange={handleChange} type="name" name="name" placeholder="Enter Your Name..." required />
               <Form.Label>Name:</Form.Label>
            </Form.Group>
            <Form.Group className="form-custom">
               <Form.Control value={form.email} onChange={handleChange} type="email" name="email" placeholder="Enter Your email..." required />
               <Form.Label>Email:</Form.Label>
            </Form.Group>
            <Form.Group className="form-custom">
               <Form.Control value={form.password} onChange={handleChange} type="password" name="password" placeholder="Enter Your Password..." required minLength={6} />
               <Form.Label>Password</Form.Label>
            </Form.Group>
            <button className="btn btn-primary">Register</button>
            <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                <div class="google-icon-wrapper">
                <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20230305195326%21Google_%22G%22_logo.svg"
                alt="sign in with google"
                 />
                </div>
                <p className="btn-text">
                  <b>Register with google</b>
                 </p>
                </a>
                 </div>
            {err !== "" && <span className="error">{err}</span>}
            </div>
            </Form>
            </div>
        </div>
        </>
    );
}

















































