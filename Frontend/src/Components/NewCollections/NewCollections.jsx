import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';
import { useMediaQuery } from 'react-responsive';
import Button from '@mui/material/Button';

const NewCollections = () => {
  const [new_collections, setNew_Collections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 464, maxWidth: 1023 });
  const itemsPerPage = isDesktop ? 15 : (isTablet ? 12 : 10);

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setNew_Collections(data));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = new_collections.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div id='shop'>
    <br /> <br/> <br /><br /> <br /> <br /> <br />
        <div className='new-collections'>
          <h1>SHOP</h1>
          <hr />
          <div className="collections">
            {currentItems.map((item, i) => (
              <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
          </div>
          <div className="pagination">
            <Button type="button" onClick={prevPage} disabled={currentPage === 1} variant="contained" color="primary">Anterior</Button>
            <Button type="button" onClick={nextPage} disabled={indexOfLastItem >= new_collections.length} variant="contained" color="primary">Siguiente</Button>
          </div>
        </div>
    </div>

  );
};

export default NewCollections;
