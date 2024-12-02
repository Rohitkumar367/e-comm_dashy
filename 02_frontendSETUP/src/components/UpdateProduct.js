import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProduct = () => {

    const params = useParams();
    const navigate = useNavigate();

    const[error, setError] = useState(false);

    const[formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        userId: "",
        company: ""
    })

    function changeHandler(event)
    {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    // getting data which is to be updated
    useEffect(()=>{
        getProductDetails();
    },[])

    // first get request
    async function getProductDetails()
    {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);

        result = await result.json();

        // if data not found then go back to home page
        if(!result.name)
        {
            window.alert(result.result)
            navigate('/')
        }
        else // or else fill the formData
        {
            console.log(result);

            setFormData({
                ...formData,
                name: result.name,
                price: result.price,
                category: result.category,
                userId: result.userId,
                company: result.company
            })
        }
    }


    // and now put req
    async function submitHandler()
    {
        if(!formData.name || !formData.price || !formData.category || !formData.company){
            setError(true);
            return false;
        }

        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method: "put",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json();
        window.alert("Updated successfully")
        console.log(result);
        navigate('/');
    }


    return (
        <div className='product'>
            <h1>Update Product</h1>

            <input type='text' className='inputBox' placeholder='Enter product name'
                name='name'
                value={formData.name}
                onChange={changeHandler}
            />
            {error && !formData.name && 
                <span className='invalid-input'>Enter valid name</span>
            }

            <input type='text' className='inputBox' placeholder='Enter product price'
                name='price'
                value={formData.price}
                onChange={changeHandler}
            />
            {error && !formData.price && 
                <span className='invalid-input'>Enter valid price</span>
            }

            <input type='text' className='inputBox' placeholder='Enter product category'
                name='category'
                value={formData.category}
                onChange={changeHandler}
            />
            {error && !formData.category && 
                <span className='invalid-input'>Enter valid category</span>
            }

            <input type='text' className='inputBox' placeholder='Enter product company'
                name='company'
                value={formData.company}
                onChange={changeHandler}
            />
            {error && !formData.company && 
                <span className='invalid-input'>Enter valid company</span>
            }

            <button type='button' onClick={submitHandler}>Update Product</button>

        </div>
    )
}

export default UpdateProduct
