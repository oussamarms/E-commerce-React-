import { Outlet } from "react-router-dom"
import Navbar from "../../Components/Website/Navbar/Navbar"

export default function Website() {
    return (
    <>
    <Navbar/>
    <Outlet/>
    </>
    );
}