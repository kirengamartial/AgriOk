import React, { useEffect, useState } from 'react';
import { useGetSensorDataQuery, useGetSingleFarmlandsQuery } from '../slices/userSlices/userApiSlice';
import { Link, useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { AlertTriangle } from 'lucide-react';
import SensorNotFound from '../components/SensorNotFound';
import SensorIsLoading from '../components/SensorIsLoading';
import { useSelector } from 'react-redux';

const SensorDataPage = () => {
  const { id } = useParams();
  const [dateRange, setDateRange] = useState('30d');
  const { data: sensorData, refetch, isLoading } = useGetSensorDataQuery(dateRange);
  const { userInfo } = useSelector(state => state.auth);
  const {data:farmland, refetch: refetchFarmland} = useGetSingleFarmlandsQuery(id)

  const getBaseRoute = () => userInfo.isAdmin ? '/admin' : '/farmer';

  useEffect(() => {
    refetchFarmland()
    refetch();
  }, [dateRange, refetch, refetchFarmland]);

  const extractKeys = (entry) => {
    if (!entry) return [];
    return Object.keys(entry).filter(key => 
      key !== 'id' && key !== 'farmland_id' && key !== 'time'
    );
  };

  if (isLoading) return <SensorIsLoading/>
  if (!sensorData?.sensor_data?.[id]) return <SensorNotFound dateRange={dateRange} setDateRange={setDateRange}/>

  return (
    <div className="p-8 space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">Farmland Management</h1>
        <p className="text-gray-600">Location: {farmland && farmland.location}</p>
        <p className="text-gray-600">Size: {farmland && farmland.size} hectares</p>
        <p className="text-gray-600">sensors: {farmland && farmland.sensors}</p>
      </header>

      {/* Date Range Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date Range
        </label>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="w-[180px] border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="1h">Last Hour</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Sensor Data Tables */}
      {Object.values(sensorData.sensor_data[id]).map((entry, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-green-800">
              Sensor Data - {format(parseISO(entry.time), 'yyyy-MM-dd HH:mm:ss')}
            </h2>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {extractKeys(entry).map((key) => (
                    <th 
                      key={key} 
                      className="px-4 py-2 text-left border capitalize text-green-800"
                    >
                      {key}
                    </th>
                  ))}
                    <th className="px-4 py-2 text-left border">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  {extractKeys(entry).map((key) => (
                    <td key={key} className="px-4 py-2 border">
                      {entry[key] !== undefined
                        ? `${entry[key]}${
                            key === 'Temperature' ? '°C' :
                            key === 'moisture' ? '%' :
                            key === 'pressure' ? ' hPa' : ''
                          }`
                        : 'N/A'}
                    </td>
                  ))}
                  <td className="px-4 py-2 border">
                    <Link 
                      to={`/dashboard${getBaseRoute()}/sensor-detail/${id}/${index}`} 
                      className="text-green-600 hover:text-green-800 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SensorDataPage;