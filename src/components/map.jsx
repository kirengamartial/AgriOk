import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Card from './mapCard';


const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapError, setMapError] = useState(null);
  const [mapStatus, setMapStatus] = useState('initializing');
  
  // Kigali, Rwanda coordinates
  const KIGALI_COORDINATES = {
    lng: 30.0619,
    lat: -1.9441
  };
  
  const API_KEY = `${import.meta.env.VITE_MAP_API_KEY}`;

  useEffect(() => {
    if (!mapContainer.current) {
      setMapError('Map container not found');
      return;
    }

    try {
      const mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/satellite/style.json?key=${API_KEY}`,
        center: [KIGALI_COORDINATES.lng, KIGALI_COORDINATES.lat],
        zoom: 12, // Closer zoom for city view
        failIfMajorPerformanceCaveat: true
      });

      map.current = mapInstance;

      mapInstance.on('load', () => {
        console.log('Map loaded successfully');
        setMapStatus('loaded');

        // Add a marker for Kigali
        new maplibregl.Marker({
          color: "#FF0000"
        })
          .setLngLat([KIGALI_COORDINATES.lng, KIGALI_COORDINATES.lat])
          .setPopup(new maplibregl.Popup().setHTML(
            '<h3 class="font-bold">Kigali</h3><p>Capital City of Rwanda</p>'
          ))
          .addTo(mapInstance);

        // Add Rwanda boundary box for context
        const rwandaBounds = [
          [28.8617, -2.8389], // Southwest coordinates
          [30.8990, -1.0474]  // Northeast coordinates
        ];

        mapInstance.fitBounds(rwandaBounds, {
          padding: 50,
          duration: 2000
        });
      });

      mapInstance.on('error', (e) => {
        console.error('Map error:', e);
        setMapError(`Map error: ${e.error.message || 'Unknown error'}`);
        setMapStatus('error');
      });

      // Add controls
      mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right');
      mapInstance.addControl(
        new maplibregl.ScaleControl({ maxWidth: 100, unit: 'metric' }),
        'bottom-left'
      );
      mapInstance.addControl(new maplibregl.FullscreenControl(), 'top-right');

      // Add geolocation control
      mapInstance.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }),
        'top-right'
      );

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError(`Initialization error: ${error.message}`);
      setMapStatus('error');
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto mb-14">
      <Card>
        <div className="p-4">
          
          <div 
            ref={mapContainer} 
            style={{
              position: 'relative',
              width: '100%',
              height: '500px',
              backgroundColor: '#f0f0f0'
            }}
            className="rounded-lg overflow-hidden border border-gray-300"
          />
          {mapError && (
            <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {mapError}
            </div>
          )}
        
        </div>
      </Card>
    </div>
  );
};

export default MapComponent;