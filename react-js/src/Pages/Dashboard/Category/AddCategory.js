import { useEffect, useRef, useState } from "react";
import { Axios } from "../../../Api/axios";
import { Cat } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { Form } from "react-bootstrap";


export default function AddCategory() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    // Ref
    const focus = useRef("");

    // Handle Focus
    useEffect(() => {
      focus.current.focus();
        }, []);



    // Handle Submit
    async function HandleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        const form =new FormData();
        form.append("title", title);
        form.append("image", image);
        try {
            const res = await Axios.post(`${Cat}/add`, form);
            window.location.pathname = "/dashboard/categories";

        } catch(err) {
            setLoading(false);
            console.log(err);
        }
    }
    return(<>{loading &&<LoadingSubmit />}
    <Form className="bg-white w-100 px-4 py-3 rounded shadow-sm" onSubmit={HandleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} ref={focus} onChange={(e)=> setTitle(e.target.value)} required  type="text" placeholder="Title..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image" >
        <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={(e)=> setImage(e.target.files.item(0))}></Form.Control>
        </Form.Group>
     <button disabled={title.length > 1 ? false : true} className="btn btn-primary">Save</button>
      </Form>
      </> 
    );
}










































