import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'


const AddProduct = () => {

    const [image,setImage] = useState(false)
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:"",
    })


    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_Product = async () => {
        console.log(productDetails)
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch('https://e-commerce-12i-1.onrender.com//upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => {responseData = data;}).catch((err) => console.log(err));

        if(responseData.success)
        {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('https://e-commerce-12i-1.onrender.com//addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success ? alert('Producto añadido') : alert('Error al añadir producto');
            }).catch((err) => console.log(err));
        }
    }

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Titulo del prod</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Escribir aqui' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Precio</p>
            <input value={productDetails.old_price} onChange={changeHandler}  type="text" name='old_price' placeholder="Escribir" />
        </div>
        <div className="addproduct-itemfield">
            <p>Precio de oferta</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder="Escribir" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Categoria </p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
            <option value="women">Mujer</option>
            <option value="men">Hombre</option>
            <option value="kid">Niños</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={() => {Add_Product()}} className='addproduct-btn'>AÑADIR PRODUCTO</button>
    </div>
  )
}

export default AddProduct
