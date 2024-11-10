import React from 'react'

const StatsCard = ({ icon: Icon, title, value, period, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-[170px]">
    <div className="flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 bg-${color}-50 rounded-lg`}>
          <Icon className={`text-${color}-500`} size={24} />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-600 text-xs mb-1">{title}</p>
        <h3 className="text-xl font-bold mb-2">{value}</h3>
        <div className="flex items-center text-xs">
          <span className="text-gray-500">{period}</span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default StatsCard
