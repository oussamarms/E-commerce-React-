import axios from "axios";
import { useEffect } from "react";
import Cookie from "cookie-universal";
import { GOOGLE_CALL_BACK, baseURL } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
export default function GoogleCallBack() {
    const cookie = Cookie();
    const location = useLocation();
    useEffect(() => {
        async function GoogleCall() {
            try {
                const res = await axios.get(`${baseURL}/${GOOGLE_CALL_BACK}${location.search}`);
                const token = res.data.access_token;
                cookie.set("e-commerce", token);
            } catch (err) {
                console.log(err);
            }
        }
        GoogleCall();
    }, []); 
     
    return <h1>TEST</h1>;
}