import React, { useEffect, useState } from 'react';
import { useGetSensorDataQuery, useGetSingleFarmlandsQuery } from '../slices/userSlices/userApiSlice';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { AlertTriangle } from 'lucide-react';
import SensorNotFound from '../components/SensorNotFound';
import SensorIsLoading from '../components/SensorIsLoading';

const SensorDataPage = () => {
  const { id } = useParams();
  const [dateRange, setDateRange] = useState('30d');
  const { data: sensorData, refetch, isLoading } = useGetSensorDataQuery(dateRange);
  const {data:farmland, refetch: refetchFarmland} = useGetSingleFarmlandsQuery(id)

  useEffect(() => {
    refetchFarmland()
    refetch();
  }, [dateRange, refetch, refetchFarmland]);

  const extractKeys = (data) => {
    if (!data || !data.sensor_data || !data.sensor_data[id]) return [];
    const firstEntry = Object.values(data.sensor_data[id])[0];
    return Object.keys(firstEntry).filter(key => 
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
        <p className="text-gray-600">Size: {farmland && farmland.size}</p>
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

      {/* Sensor Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {extractKeys(sensorData).map((key) => (
          <div
            key={key}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold capitalize text-green-800">{key}</h2>
            </div>
            <div className="p-4">
              {sensorData?.sensor_data?.[id]?.['0']?.[key] !== undefined ? (
                <p className="text-4xl font-bold text-green-600">
                  {sensorData.sensor_data[id]['0'][key]}
                  {key === 'Temperature' ? '°C' :
                   key === 'moisture' ? '%' :
                   key === 'pressure' ? ' hPa' : ''}
                </p>
              ) : (
                <div className="flex items-center text-yellow-600">
                  <AlertTriangle className="mr-2" />
                  <span>No data available</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Sensor Data Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-green-800">Sensor Data Details</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border">Date</th>
                {extractKeys(sensorData).map((key) => (
                  <th key={key} className="px-4 py-2 text-left border capitalize text-green-800">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(sensorData.sensor_data[id]).map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-2 border">
                    {format(parseISO(entry.time), 'yyyy-MM-dd HH:mm:ss')}
                  </td>
                  {extractKeys(sensorData).map((key) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SensorDataPage;