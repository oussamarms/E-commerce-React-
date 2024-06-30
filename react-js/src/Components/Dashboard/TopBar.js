import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../Context/MenuContext";
import { LOGOUT, USER } from "../../Api/Api";
import { Dropdown, DropdownButton} from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { Navigate } from "react-router-dom";
import Cookie from "cookie-universal"
export default function TopBar() {
    const menu = useContext(Menu);
    const setIsOpen = menu.setIsOpen;
    const [name, setName] = useState("");
    const cookie = Cookie();


    useEffect(() => {
        Axios.get(`/${USER}`)
    .then((data)=>setName(data.data.name))
    .catch(()=> Navigate("/login", { replace: true}));
    }, []);


    async function handleLogout() {
        try {
            const res = await Axios.get(`/${LOGOUT}`);
            cookie.remove("e-commerce");
            window.location.pathname="/login";
        }catch(err){
            console.log(err);
        }
    }






    return ( <div className="top-bar rounded mb-3 py-2 shadow-sm">
        <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-5">
        <h3>Dashboard</h3>
        <FontAwesomeIcon onClick={()=> setIsOpen((prev)=> !prev)} cursor={"pointer"} icon={faBars} />
        </div>
        <div>
        <DropdownButton id="dropdown-basic-button" title={name}>
      <Dropdown.Item onClick={handleLogout} >Logout</Dropdown.Item>
      
    </DropdownButton>
        </div>
        </div>
        </div>
    );  
}