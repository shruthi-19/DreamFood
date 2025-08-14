import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    const { options } = props;
    const foodItems = props.foodItems;
    const priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const finalPrice = qty * parseInt(options[size]);

    const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItems._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if ( food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItems._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItems._id, name: foodItems.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItems._id, name: foodItems.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }

    // ✅ Only run once when the component mounts
    useEffect(() => {
        setSize(priceRef.current.value);
    }, []); // empty dependency ensures it runs once

    return (
        <div>
            <div className="card" style={{ width: "18rem", maxHeight: "360px" }}>
                <img src={props.foodItems.img} className="card-img-top" alt="..."
                    style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItems.name}</h5>

                    <select className="m-2 h-100 bg-success" value={qty} onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (_, i) => (
                            <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>

                    <select
                        className="m-2 h-100 bg-success"
                        ref={priceRef}
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    >
                        {priceOptions.map((data) => (
                            <option key={data} value={data}>{data}</option>
                        ))}
                    </select>

                    <div className="d-inline h-100 fs-5">
                        {finalPrice}/-
                    </div>
                    <hr />
                    <button className="btn btn-success" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
