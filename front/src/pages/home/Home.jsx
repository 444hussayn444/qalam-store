import "./home.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { FaLock } from "react-icons/fa";
import { PiPencilCircleFill } from "react-icons/pi";

export default function Home() {
    const navigator = useNavigate();
    return (
        < div className="home-container page" >
            <h2 className="h2">The Pen Inside Your Hand</h2>   
            <div className="circle">
                <span className="c c1"><p className="p p1" onClick={() => navigator("/description")}>Description</p></span>
                <span className="c c2"><p className="p p2" onClick={() => navigator("/geomitric")}>Our Geomitric Art Gallery</p></span>
                <span className="c c3"><p className="p p3" onClick={() => navigator("/store")}>Store</p></span>
                <span className="c c4"><p className="p p4" onClick={() => navigator("/special-orders")}>Special Orders</p></span>
                <span className="c c5 c1"><p className="p p5" onClick={() => navigator("/services")}>Special Services</p></span>
                <span className="c c6 c2"><p className="p p6" onClick={() => navigator("/*")}><FaLock className="lock"/></p></span>
                <span className="c c7 c3"><p className="p p7" onClick={() => navigator("/*")}><FaLock className="lock"/></p></span>
                <span className="c c8 c4"><p className="p p8" onClick={() => navigator("/*")}><FaLock className="lock"/></p></span>
            </div>
        </div >
    )
}