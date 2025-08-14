import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  const [foodItems, setfoodItems] = useState([]);
  const [foodCategories, setfoodCategories] = useState([]);
  const [search, setSearch] = useState("");
  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/DisplayData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setfoodItems(data.foodItems);
      setfoodCategories(data.foodCategory);;
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div> <Navbar /> </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id="carousel" style={{ objectFit: "contain !important" }}>
            <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value) }}/>
              </div>
            </div>
            <div className="carousel-item active">
              <img src="/burger.jpg" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="/pizza.jpeg" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="  /biryani.jpeg" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='m-3'>
        <div className='container'>
          {
            foodCategories.length > 0 ? foodCategories.map((data) => {
              return (
                <div className='row mb-3' key={data._id}>
                  <div className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItems.length > 0 ? foodItems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map((filteredItem) => {
                    return (
                      <div className='col-12 col-sm-6 col-md-3 m-2' key={filteredItem._id}>
                        <Card foodItems={filteredItem}
                          options={filteredItem.options[0]}
                        />
                      </div>
                    )
                  }) : ""}
                </div>
              )
            }) : ""
          }
        </div>
        <div> <Footer /></div>
      </div>
    </div>
  )
};