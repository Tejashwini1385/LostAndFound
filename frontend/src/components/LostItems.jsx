import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LostItem.css';  // Import the CSS file

function LostItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8086/lost-items')
      .then(response => {
        setItems(response.data.items); // Ensure the backend sends { items: [...] }
      })
      .catch(error => {
        console.error('Error fetching lost items:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="lost-items-heading">Lost Items</h1>
      <div className="lost-items-container">
        {items.length > 0 ? (
          <div className='lost-items-grid'>
            {items.map(item => (
              <div key={item.item_id} className="lost-item-card">
                <h3>{item.title}</h3>
                {item.image_path && (
                  <div>
                    <img
                      src={`http://localhost:8086/${item.image_path}`}  // Corrected interpolation
                      alt={item.title}
                      className="lost-item-image"
                    />
                  </div>
                )}
                <p>{item.description}</p>
                <p>Contact: {item.contact}</p>

                {/* If there are multiple images */}
                {item.additional_images && item.additional_images.length > 0 && (
                  <div className="lost-item-images">
                    {item.additional_images.map((img, index) => (
                      <img
                        key={index}
                        src={`http://localhost:8086/${img}`}  // Corrected interpolation
                        alt={`Additional Image ${index + 1}`}  // Corrected alt text
                        className="lost-item-image-side-by-side"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-items-message">No lost items found.</p>
        )}
      </div>
    </div>
  );
}

export default LostItems;
