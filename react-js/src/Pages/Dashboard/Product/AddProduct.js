import { useEffect, useRef, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CAT, Pro } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function AddProduct() {
    const [form, setForm] = useState({
        category: "Select Category",
        title: "",
        description: "",
        price: "",
        discount: "",
        About: "",
    });
    const dummyForm = {
      category: null,
        title: "dummy",
        description: "dummy",
        price: 222,
        discount: 0,
        About: "About",
    };
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState();
    const nav = useNavigate();

    // Ref
    const focus = useRef("");
    const openImage = useRef(null);
    const progress = useRef([]);
    const ids = useRef([]);

    // Handle Focus
    useEffect(() => {
      focus.current.focus();
    }, []);

    function handleOpenImage() {
      openImage.current.click();
    }


    // Get All Categories
    useEffect(() => {
      Axios.get(`/${CAT}`)
      .then((data)=> setCategories(data.data))
      .catch((err)=>console.log(err));
}, []);  



    // Handle Edit
    async function HandleEdit(e) {
        setLoading(true);
        e.preventDefault();
        
        try {
            const res = await Axios.post(`${Pro}/edit/${id}`, form);
            nav("/dashboard/products");

        } catch(err) {
            setLoading(false);
            console.log(err);
        }
    }

    // Hanndle Submit Form
    async function HandleSubmitForm(){
      try{
        const res = await Axios.post(`${Pro}/add`,dummyForm);
        setId(res.data.id);
      }catch(err){
        console.log(err);
      }
    }


    // HandleChange
    function handleChange(e){
      setForm({...form, [e.target.name]: e.target.value});
      setSent(1);
      if (sent!== 1) {
        HandleSubmitForm();
      }
    }
    // Handle Image 
    const j = useRef(-1);

    async function HandleImagesChange(e){
      setImages ((prev)=> [...prev,...e.target.files]);
      const imagesAsFiles = e.target.files;

      const data = new FormData();
      for (let i = 0; i < imagesAsFiles.length; i++) {
        j.current++;
        data.append("image", imagesAsFiles[i]);
        data.append("product_id", id);
        try{
          const res = await Axios.post("/product-img/add", data,{
            onUploadProgress : (ProgressEvent)=>{
              const { loaded, total } = ProgressEvent;
              const percent = Math.floor((loaded * 100) / total);
              if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute("percent", `${percent}%`)
            }
            },
          });
          ids.current[j.current] = res.data.id;
          console.log(res);
        }catch(err){
          console.log(err);
        }
        
      }
    }

    // HandLe Delete Image
    async function handleImageDelete(id, img){
      const findId = ids.current[id];
      try{
        await Axios.delete(`product-img/${findId}`);
        setImages((prev)=> prev.filter((image)=>image !== img));
        ids.current = ids.current.filter((i)=> i !== findId);
        --j.current;
      } catch(err) {
        console.log(err);
      }
    }
    // Mapping
    const categoriesShow = categories.map((item, key)=> (
      <option value={item.id} key={key}> {item.title} </option>
    ));

    const imagesShow = images.map((img,key)=> (
      <div  className="border p-2 w-100">
        <div className="d-flex align-items-center justify-content-between">
    <div className="d-flex align-items-center justify-content-start gap-2">
      <img src={URL.createObjectURL(img)} width="80px"></img>
      <div>
        <p className="mb-1"> {img.name} </p>
        <p> {img.size /1024 < 900 ? (img.size /1024).toFixed(2) + "KB" : (img.size / (1024 * 1024)).toFixed(2) + "MB"} </p>
      </div>
    </div>
    <Button onClick={()=> handleImageDelete(key, img)} variant="danger">Delete</Button>
    </div>
    <div className="custom-progress mt-3">
      <span ref={(e) => (progress.current [key] = e)}  className="inner-progress"></span>
    </div>
    </div>
    ));


    return(<>{loading &&<LoadingSubmit />}
    <Form className="bg-white w-100 px-4 py-3 rounded shadow-sm" onSubmit={HandleEdit} >
    <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select value={form.category}  ref={focus} onChange={handleChange}  name="category"   placeholder="Category..." >
            <option disabled>Select Category</option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control value={form.title} disabled={!sent}  onChange={handleChange} required name="title"  type="text" placeholder="Title..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control value={form.description} disabled={!sent}  onChange={handleChange} required name="description"  type="text" placeholder="Description..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control value={form.price} disabled={!sent} onChange={handleChange} required name="price"  type="text" placeholder="Price..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control value={form.discount} disabled={!sent}  onChange={handleChange} required name="discount"  type="text" placeholder="Discount..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="About">
          <Form.Label>About</Form.Label>
          <Form.Control value={form.About} disabled={!sent}  onChange={handleChange} required name="About"  type="text" placeholder="About..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control ref={openImage} multiple hidden disabled={!sent}  onChange={HandleImagesChange}    type="file"  />
        </Form.Group>
        <div onClick={handleOpenImage} className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column gap-2"
         style={{border:!sent ? "2px dashed gray" : "2px dashed #0086fe" , cursor: sent && "pointer",}}>
          <img src={require("../../../Assets/Images/cloud-upload-a30f385a928e44e199a62210d578375a.jpg")} alt="Upload Here" 
          width="200px" style={{filter: !sent && "grayscale(1)"}}/>
          <p className="fw-bold mb-0" style={{color: !sent ? "gray" : "#0086fe"}}>Upload Images</p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">{imagesShow} </div>
     <button className="btn btn-primary">Save</button>
      </Form>
      </> 
    );
}










































