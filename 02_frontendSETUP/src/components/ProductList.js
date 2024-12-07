import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const ProductList = () => {
    const[products, setProducts] = useState([]);
    const params = useParams();

    useEffect(()=>{
        getProducts();
    },[])

    // get products start here
    const getProducts = async ()=>{
        let result = await fetch(`http://localhost:5000/products/${params.id}`);

        result = await result.json();

        setProducts(result)
    }

    console.log(products);

    // delete product start here
    const deleteProduct = async (id)=>{
        const confimation = window.confirm("Are you sure you want to delete this product?");

        if(!confimation) return;

        console.log(id);

        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method: "Delete"
        });

        result = await result.json();

        if(result){
            window.alert("record has deleted successfully")
            getProducts();
        }

        console.log(result);
    }

    // search product starts here
    const searchHandler = async (event) =>{
        let key = event.target.value;
        console.log(key);

        if(key) // if key is not empty then get specific product
        {
            let result = await fetch(`http://localhost:5000/search/${key}`);
    
            result = await result.json();
    
            if(result)
            {
                setProducts(result)
            }
        }
        else // if key is empty then get all product
        {
            getProducts();
        }
    }

    return (
        <div className='product-list'>
            <h1>Product List</h1>

            <input className='search-product-box' 
                type='text' 
                placeholder='Search Product'
                onChange={searchHandler}
            />

            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>

            {
                products.length>0 ? products.map((item,index)=>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button className='alterBtn' onClick={()=>deleteProduct(item._id)}>
                                Delete
                            </button>
                            <Link to={`/update/${item._id}`} className='alterBtn'>Update</Link>
                        </li>
                    </ul>
                )
                : <h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList
