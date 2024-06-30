import { useEffect, useRef, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CAT, Pro } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


export default function UpdateProduct() {
    const [form, setForm] = useState({
        category: "Select Category",
        title: "",
        description: "",
        price: "",
        discount: "",
        About: "",
    });
    const [images, setImages] = useState([]);
    const [imagesFromServer, setImagesFromServer] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [idsFromServer, setIdsFromServer] = useState([]);
    const { id } = useParams();
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

    // Get Data
    useEffect(() => {
        Axios.get(`/${Pro}/${id}`)
        .then((data)=> {
            setForm(data.data[0]);
            setImagesFromServer(data.data[0].images);
            console.log(data);
        })
        .catch((err)=>console.log(err));
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
          for (let i = 0; i < idsFromServer.length; i++) {
            await Axios.delete(`product-img/${idsFromServer[i]}`)
            .then((data)=>console.log(data));            
          }
             await Axios.post(`${Pro}/edit/${id}`, form);
            nav("/dashboard/products");

        } catch(err) {
            setLoading(false);
            console.log(err);
        }
    }


    // HandleChange
    function handleChange(e){
      setForm({...form, [e.target.name]: e.target.value});
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
    async function handleImageFromServer(id){
      setImagesFromServer(prev => prev.filter((img)=> img.id !== id));
      setIdsFromServer((prev)=>{return [...prev, id];});
      }
    // Mapping
    const categoriesShow = categories.map((item, key)=> (
      <option value={item.id} key={key}> {item.title} </option>
    ));

    const imagesShow = images.map((img,key)=> (
      <div key={key} className="border p-2 w-100">
    <div className="d-flex align-items-center justify-content-start gap-2">
      <img  alt="" src={URL.createObjectURL(img)} width="80px"></img>
      <div>
        <p className="mb-1"> {img.name} </p>
        <p> {img.size /1024 < 900 ? (img.size /1024).toFixed(2) + "KB" : (img.size / (1024 * 1024)).toFixed(2) + "MB"} </p>
      </div>
    </div>
    <div className="custom-progress mt-3">
      <span ref={(e) => (progress.current [key] = e)}  className="inner-progress"></span>
    </div>
        <Button onClick={()=> handleImageDelete(key, img)} variant="danger">Delete</Button>

    </div>
    ));
    const imagesFromServerShow = imagesFromServer.map((img,key)=> (
        <div key={key} className="border p-2 col-2 position-relative">
      <div className="d-flex align-items-center justify-content-start gap-2">
        <img alt="" src={img.image} width="100px"></img>
      </div>
      <div 
      style={{ cursor: "pointer" }}
      className="position-absolute top-0 end-0 bg-danger rounded text-white">
        <p className=" py-1 px-2 m-0 " onClick={()=> handleImageFromServer(img.id)}>
            x
        </p>
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
          <Form.Control value={form.title}  onChange={handleChange} required name="title"  type="text" placeholder="Title..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control value={form.description}  onChange={handleChange} required name="description"  type="text" placeholder="Description..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control value={form.price}  onChange={handleChange} required name="price"  type="text" placeholder="Price..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control value={form.discount}   onChange={handleChange} required name="discount"  type="text" placeholder="Discount..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="About">
          <Form.Label>About</Form.Label>
          <Form.Control value={form.About}   onChange={handleChange} required name="About"  type="text" placeholder="About..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control ref={openImage} multiple hidden   onChange={HandleImagesChange}    type="file"  />
        </Form.Group>
        <div onClick={handleOpenImage} className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column gap-2"
         style={{border:!"2px dashed #0086fe" , cursor:  "pointer",}}>
          <img src={require("../../../Assets/Images/cloud-upload-a30f385a928e44e199a62210d578375a.jpg")} alt="Upload Here" 
          width="100px" />
          <p className="fw-bold mb-0" style={{color:  "#0086fe"}}>Upload Images</p>
        </div>
        <div className="d-flex align-items-start flex-wrap gap-2">{imagesFromServerShow} </div>
        <div className="d-flex align-items-start flex-column gap-2">{imagesShow} </div>
     <button className="btn btn-primary">Save</button>
      </Form>
      </> 
    );
}










































