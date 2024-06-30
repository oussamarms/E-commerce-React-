import { useEffect, useState } from "react";
import { USER, USERS} from "../../../Api/Api";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import TableShow from "../../../Components/Dashboard/Table";

export default function Users(){
  // States
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Get Current User
  useEffect(() => {
    Axios.get(`${USER}`)
    .then((res)=> setCurrentUser(res.data));
  }, []);

  // Get All Users
    useEffect(() => {
      setLoading(true);
        Axios.get(`/${USERS}?page=${page}&limit=${limit}`)
        .then((data)=>{
          setUsers(data.data.data);
          setTotal(data.data.total);
        })
        .catch((err)=>console.log(err))
        .finally(()=>setLoading(false));
}, [page , limit]); 

const header = [
  {
    key: "name",
    name: "Username",
  },
  {
    key: "email",
    name: "Email",
  },
  {
    key: "role",
    name: "Role",
  },
  {
    key: "created_at",
    name: "Created",
  },
  {
    key: "updated_at",
    name: "Last Login",
  },
];

// Handle Delete
async function handleDelete(id) {
  try{
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev)=> prev.filter((item)=>item.id !== id)); 
  } catch (err) {
    console.log(err);
  }
}





    return (
    <div className="bg-white w-100 px-4 py-3 rounded shadow-sm">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Users Page</h1>
          <Link className="btn btn-primary" to="/dashboard/category/add">Add Category</Link>
          </div>
    <TableShow header={header} data={users} total={total} search="name" searchLink={USER} setLimit={setLimit} loading={loading} page={page} setPage={setPage} limit={limit} currentUser={currentUser} delete={handleDelete} />
  
    </div>
);
}
