import React, { useEffect, useState } from 'react'
import { useGetSensorDataQuery } from '../slices/userSlices/userApiSlice';
import { useParams, useLocation } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import SensorIsLoading from '../components/SensorIsLoading';

const SingleSensorData = () => {
    const {id}  = useParams()
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const param2 = pathParts[pathParts.length - 2];
    const [dateRange, setDateRange] = useState('90d');
    const { data: sensorData, refetch, isLoading } = useGetSensorDataQuery(dateRange);
    console.log(param2 ,typeof param2)

    useEffect(() => {
      if(sensorData) {
        refetch()
      }
    }, [sensorData, refetch])

    if (isLoading) return <SensorIsLoading/>

    const extractKeys = (data) => {
        if (!data || !data.sensor_data || !data.sensor_data[param2]) return [];
        const firstEntry = Object.values(data.sensor_data[param2])[0];
        return Object.keys(firstEntry).filter(key => 
          key !== 'id' && key !== 'farmland_id' && key !== 'time'
        );
      };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {extractKeys(sensorData).map((key) => (
          <div
            key={key}
            className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_25px_-10px_rgba(0,0,0,0.1)] 
                        transform transition-all duration-300 hover:-translate-y-2 
                        hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.2)] 
                        border border-gray-100"
          >
            <div className="p-5 bg-gradient-to-r from-green-50 to-green-100 border-b">
              <h2 className="text-lg font-semibold capitalize text-green-800 
                             tracking-wide text-center">{key}</h2>
            </div>
            <div className="p-6 text-center">
              {sensorData?.sensor_data?.[param2]?.[id]?.[key] !== undefined ? (
                <p className="text-5xl font-extrabold text-green-700 
                              animate-pulse-subtle tracking-tight">
                  {sensorData.sensor_data[param2]['0'][key]}
                  {key === 'Temperature' ? '°C' :
                   key === 'moisture' ? '%' :
                   key === 'pressure' ? ' hPa' : ''}
                </p>
              ) : (
                <div className="flex items-center justify-center text-yellow-600">
                  <AlertTriangle className="mr-2 w-6 h-6 stroke-current" />
                  <span className="text-sm font-medium">No data available</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SingleSensorData