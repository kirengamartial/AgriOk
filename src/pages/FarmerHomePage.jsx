import React from 'react';
import MapComponent from '../components/map';

const FieldMonitoringDashboard = () => {
 

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="text-gray-800">
              <div className="text-2xl font-bold">40.2°C</div>
              <div className="text-sm text-gray-500 mt-1">TEMPERATURE</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="text-gray-800">
              <div className="text-2xl font-bold">77%</div>
              <div className="text-sm text-gray-500 mt-1">HUMIDITY</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="text-gray-800">
              <div className="text-2xl font-bold">0 MIN</div>
              <div className="text-sm text-gray-500 mt-1">RAIN</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Scouting Reports */}
        <div className="col-span-4">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">SCOUTING REPORTS</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">WATER</h3>
                  <p className="text-gray-500 text-sm mt-1">Running out of water</p>
                </div>
                <span className="text-gray-500 text-sm">24 APR</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">DISEASE</h3>
                  <p className="text-gray-500 text-sm mt-1">Beginning of infestation of diseases</p>
                </div>
                <span className="text-gray-500 text-sm">24 APR</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">GROWTH</h3>
                  <p className="text-gray-500 text-sm mt-1">Beginning of life growth</p>
                </div>
                <span className="text-gray-500 text-sm">24 APR</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">WEEDS</h3>
                  <p className="text-gray-500 text-sm mt-1">No weeds</p>
                </div>
                <span className="text-gray-500 text-sm">24 APR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="col-span-8">
          <MapComponent/>
        </div>
      </div>

      {/* What To Do Section */}
      <div className="mt-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">WHAT TO DO</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-2">
                <span className="text-gray-800 font-medium">12 APR 2012</span>
              </div>
              <div className="col-span-10">
                <p className="text-gray-600">
                it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. the point of using lorem ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'content here, content here', making it look like readable english.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-2">
                <span className="text-gray-800 font-medium">12 APR 2012</span>
              </div>
              <div className="col-span-10">
                <p className="text-gray-600">
                it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. the point of using lorem ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'content here, content here', making it look like readable english.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldMonitoringDashboard;