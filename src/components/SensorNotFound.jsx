import React from 'react'
import { AlertTriangle } from 'lucide-react'

const SensorNotFound = ({dateRange,setDateRange}) => {
  return (
    <div className="p-8 text-center">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-center items-center mb-4">
            <AlertTriangle className="mr-2 text-yellow-600" size={32} />
            <h2 className="text-2xl font-bold">No Sensor Data Available</h2>
          </div>
          <p className="text-gray-600">
            There are currently no sensor readings for this farmland. 
            Please check the sensor connection or try a different date range.
          </p>
          {/* Date Range Selector */}
          <div className="mt-4">
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
        </div>
      </div>
  )
}

export default SensorNotFound
