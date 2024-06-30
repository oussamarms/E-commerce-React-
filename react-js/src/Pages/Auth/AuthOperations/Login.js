import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { LOGIN, baseURL } from "../../../Api/Api";
import "../AuthOperations/Auth.css";
import LoadingSubmit from "../../../Components/Loading/Loading";
import Cookie from 'cookie-universal';
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login(){
    // States
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    // Loading

    const [loading, setLoading] = useState(false);
    

    // Cookies

    const cookie = Cookie();

    // Err
    const [err, setErr] = useState("");

    // Ref
    const focus = useRef("");


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
            const res = await axios.post(`${baseURL}/${LOGIN}`, form);
            setLoading(false);
            const token = res.data.token;
            const role = res.data.user.role;
            const go = role === "1995" ? "users" : "writer";
            cookie.set("e-commerce", token);
            window.location.pathname =`/dashboard/${go}`;            
        } catch(err) {
            setLoading(false);
            if (err.response.status === 401){
                setErr("Wrong Email Or Password");
        } else {
            setErr("Internal Server Err");
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
                <h1 className="mb-5">Login Now</h1>
            <Form.Group className="form-custom">
               <Form.Control value={form.email} ref={focus}  onChange={handleChange} type="email" name="email" placeholder="Enter Your email..." required />
               <Form.Label>Email:</Form.Label>
            </Form.Group>
            <Form.Group className="form-custom" >
               <Form.Control value={form.password} onChange={handleChange} type="password" name="password" placeholder="Enter Your Password..."  minLength={6} required />
               <Form.Label>Password:</Form.Label>
            </Form.Group>
            <button className="btn btn-primary">Login</button>
            <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                <div class="google-icon-wrapper">
                <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20230305195326%21Google_%22G%22_logo.svg"
                alt="sign in with google"
                 />
                </div>
                <p class="btn-text">
                  <b>Sign in with google</b>
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