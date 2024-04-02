import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import Grid from '@mui/material/Grid'; // Importa Grid desde Material UI
import Publicidad from '../Components/Assets/publcidadCategory.jpg';
import Publicidad2 from '../Components/Assets/PublicidadCategory2.png';

const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext);

  return (
    <div className='shop-category'>
        <img className="shopcategory-banner" src={props.banner} alt="" />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div className="shopcategory-products">
            {all_products.map((item, i) => {
              if (props.category === item.category) {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
              } else {
                return null;
              }
            })}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className='shopcategory-publicidad'>
            <img src={Publicidad} alt="" />
            <img src={Publicidad2} className='publicidad-image' />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ShopCategory;
