import React, { useEffect, useState } from 'react'

const ProductList = () => {
    const[products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts= async ()=>{
        let result = await fetch('http://localhost:5000/products');

        result = await result.json();

        setProducts(result)
    }

    console.log(products);

    const deleteProduct = async (id)=>{
        console.log(id);
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method: "Delete"
        });

        result = await result.json();

        if(result){
            window.alert("record is deleted")
            getProducts();
        }

        console.log(result);
    }

    return (
        <div className='product-list'>
            <h1>Product List</h1>
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>

            {
                products.map((item,index)=>
                    <ul key={item._id}>
                        <li>{index}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li><button className='deleteBtn' onClick={()=>deleteProduct(item._id)}>Delete</button></li>
                    </ul>
                )
            }
        </div>
    )
}

export default ProductList
