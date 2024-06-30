import { useEffect, useState } from "react";
import { CAT, Cat } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
 
export default function Categories() {
      // States
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(4);
 const [limit, setLimit] = useState(4);
 const [total, setTotal] = useState(0);
 const [loading, setLoading] = useState(false);

  // Get All Categories
    useEffect(() => {
      setLoading(true);
        Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
        .then((data)=> {
          setCategories(data.data.data)
          setTotal(data.data.total);
          console.log(data.data);
      })
      .catch((err)=>console.log(err)).finally(()=> setLoading(false));
}, [limit, page]);  

const header = [
    {key: "title" , name: "Title"},
    {key: "image",
        name: "Image",
    },
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Updated",
    },
];

// Handle Delete
async function handleDelete(id) {
    try{
        const res = await Axios.delete(`${Cat}/${id}`);
        setCategories((prev)=> prev.filter((item)=>item.id !== id)); 
    } catch (err) {
      console.log(err);
    }
  }

  
 
  


    return (
    <div className="bg-white w-100 px-4 py-3 rounded shadow-sm">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Categories Page</h1>
          <Link className="btn btn-primary" to="/dashboard/category/add">Add Category</Link>
          </div>
          

          <TableShow page={page} limit={limit} search="title" searchLink={Cat} loading={loading} total={total} setLimit={setLimit} header={header} setPage={setPage} data={categories} delete={handleDelete} />
          
    </div>
    );
}