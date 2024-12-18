import React, { useState } from 'react'

const AddProduct = () => {
    
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

    // Add product starts here
    async function submitHandler()
    {
        if(!formData.name || !formData.price || !formData.category || !formData.company){
            setError(true);
            return false;
        }

        // assigning userID of formData because it has to be taken from the user loged in info from localStorage
        const auth = localStorage.getItem('user');
        formData.userId = JSON.parse(auth)._id;
        
        console.log(formData);

        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })

        result = await result.json();

        console.log(result);
        window.alert("product added successfully")

        // clear the form data
        setFormData({
            name: "",
            price: "",
            category: "",
            userId: "",
            company: ""
        })
        setError(false);
    }

    return (
        <div className='product'>
            <h1>Add Product</h1>

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

            <button type='button' onClick={submitHandler}>Add Product</button>

        </div>
    )
}

export default AddProduct
