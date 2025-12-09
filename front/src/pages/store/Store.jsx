import react, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./store.css";
import { IoLogoCodepen } from "react-icons/io";
import { GiTShirt } from "react-icons/gi";
import { TbClothesRack } from "react-icons/tb";
import { IoManSharp } from "react-icons/io5";
import { IoWoman } from "react-icons/io5";
import { SiBandsintown } from "react-icons/si";

function Products({ products }) {
    return products?.data.map((p) => {
        return (
            <div className="card" id={p.id} key={p.id}>
                <div className="image">
                    <img
                        src={`http://localhost:5000/assets/${p.category}/${p.image}`}
                        alt=""
                        className="image"
                    />
                </div>

                <div className="content">
                    <div className="category">{p.category}</div>
                    <h3 className="title">{p.title}</h3>
                    <p className="desc">
                        Wireless noise-cancelling headphones with premium sound and 40-hour
                        battery life.
                    </p>

                    <div className="bottom">
                        <div>
                            <span className="price">${p.price}</span>
                            {/* <span className="old-price">{p.discountPercentage}%</span> */}
                        </div>
                        <button className="btn">Add</button>
                    </div>
                </div>
            </div>
        );
    });
}
export function Filterd(props) {
    console.log(props.data);
    return props.products?.data
        .filter((i) => {
            console.log(i.title, "title");
            return (
                i.title?.toLowerCase().toString() === props.data?.toLowerCase().toString() ||
                i.title?.toLowerCase().toString().startsWith(props.data?.toLowerCase().toString()) ||
                i.category?.toLowerCase().toString().startsWith(props.data?.toLowerCase().toString())
            );
        })
        .map((p) => {
            return (
                <div className="card" id={p.id} key={p.id}>
                    <div className="image">
                        <img
                            src={`http://localhost:5000/assets/${p.category}/${p.image}`}
                            alt=""
                            className="image"
                        />
                    </div>
                    <div className="content">
                        <div className="category">{p.category}</div>
                        <h3 className="title">{p.title}</h3>
                        <p className="desc">
                            Wireless noise-cancelling headphones with premium sound and
                            40-hour battery life.
                        </p>

                        <div className="bottom">
                            <div>
                                <span className="price">${p.price}</span>
                                {/* <span className="old-price">{p.discountPercentage}%</span> */}
                            </div>
                            <button className="btn">Add</button>
                        </div>
                    </div>
                </div>
            );
        });
}

export default function Store() {
    const [products, setProducts] = useState();
    const [timeout, setTimeout_s] = useState(".");
    const [search, setSearch] = useState("");
    const [searchExist, setSearchExist] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeout_s((prev) => {
                if (prev === "...") {
                    prev = "";
                }
                return (prev += ".");
            });
        }, 500);
        if (products?.length > 0) {
            setTimeout(() => {
                clearInterval(interval);
            }, 1000);
        }
    }, []);
    useEffect(() => {
        fetch("http://localhost:5000/api/v1/products")
            .then((res) => res.json())
            .then((res) => setProducts(res))
            .catch((err) => console.log(err))

    }, []);

    return products ? (
        <div className="page-store store-container">
            <div className="the-container">
                <div className="searching">
                    <div className="categories">
                        <div className="btns">
                            <IoLogoCodepen />
                            Logos
                        </div>
                        <div className="btns">
                            <IoManSharp />
                            Men
                        </div>
                        <div className="btns">
                            <IoWoman />
                            Women
                        </div>
                        <div className="btns">
                            <GiTShirt />
                            T-Shirts
                        </div>
                        <div className="btns">
                            <SiBandsintown />
                            Bands Clothes
                        </div>
                        <div className="btns">
                            <TbClothesRack />
                            Special Clothes
                        </div>
                    </div>
                    <div className="s-feild">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            type="search"
                            className="input"
                            placeholder="Search"
                        />
                        <button className="search" onClick={() => setSearchExist(search)}>
                            <FaSearch />
                        </button>
                    </div>
                </div>
                <hr className="bloodline" />
                {searchExist !== "" ? (
                    <div className="store">
                        <Filterd data={search} products={products} />
                    </div>
                ) : (
                    <div className="store">
                        <Products products={products} />
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div
            style={{ borderRadius: "0", color: "white", backgroundColor: "black" }}
            className="page-store store-container"
        >
            <h2
                className="error"
                style={{
                    borderRadius: "0",
                    height: "100%",
                    color: "gold",
                    backgroundColor: "black",
                    caretColor: "transparent",
                }}
            >
                Please wait while loading the data{timeout}
            </h2>
        </div>
    );
}
