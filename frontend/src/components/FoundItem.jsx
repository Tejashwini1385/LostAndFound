import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FoundItem.css'; // Import the CSS file

function FoundItem() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8086/found-items')
      .then(response => {
        setItems(response.data.items); // Ensure the backend sends { items: [...] }
      })
      .catch(error => {
        console.error('Error fetching found items:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="found-items-heading">Found Items</h1>
      <div className="found-items-container">
        {items.length > 0 ? (
          <div className="found-items-grid">
            {items.map(item => (
              <div key={item.item_id} className="found-item-card">
                <h3 className="found-item-title">{item.title}</h3>
                {item.image_path && (
                  <img
                    src={`http://localhost:8086/${item.image_path}`} // Correct interpolation
                    alt={item.title}
                    className="found-item-image"
                  />
                )}
                <p className="found-item-description">{item.description}</p>
                <p className="found-item-contact">Contact: {item.contact}</p>

                {/* If there are additional images */}
                {item.additional_images && item.additional_images.length > 0 && (
                  <div className="found-item-images">
                    {item.additional_images.map((img, index) => (
                      <img
                        key={index}
                        src={`http://localhost:8086/${img}`} // Correct interpolation
                        alt={`Additional Image ${index + 1}`}
                        className="found-item-image-side-by-side"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-items-message">No found items available.</p>
        )}
      </div>
    </div>
  );
}

export default FoundItem;
