import React, { useEffect } from 'react';
import MapComponent from '../components/map';
import { useGetInsightsQuery } from '../slices/userSlices/userApiSlice';
import { AlertCircle, Droplets, Thermometer, Wind } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../components/Alert';

const FieldMonitoringDashboard = () => {
  const { data: insights, isLoading, isError, refetch } = useGetInsightsQuery();

  useEffect(() => {
    if(insights) {
      refetch()
    }
  }, [insights, refetch])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getTemperatureInsight = () => {
    return insights?.find(insight => 
      insight.title?.toLowerCase().includes('temperature')
    )?.content || '40.2°C';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <Alert>
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-500 border-t-transparent"></div>
              <AlertTitle>Loading insights...</AlertTitle>
            </div>
            <AlertDescription>Please wait while we fetch your farm data.</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="w-full max-w-3xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <div>
              <AlertTitle>Unable to Load Data</AlertTitle>
              <AlertDescription>
                We couldn't fetch your farm insights. Please check your connection and try again.
              </AlertDescription>
            </div>
          </Alert>
        </div>
      </div>
    );
  }

  if (!insights || insights.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="w-full max-w-3xl">
          <Alert>
            <AlertCircle className="h-4 w-4 text-gray-600" />
            <div>
              <AlertTitle>No Insights Available</AlertTitle>
              <AlertDescription>
                There are currently no insights available for your farm. We'll notify you when new data becomes available.
              </AlertDescription>
            </div>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-full">
              <Thermometer className="w-6 h-6 text-red-500" />
            </div>
            <div className="text-gray-800">
              <div className="text-xl font-bold">{getTemperatureInsight()}</div>
              <div className="text-xs text-gray-500 mt-1">TEMPERATURE</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-full">
              <Droplets className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-gray-800">
              <div className="text-xl font-bold">77%</div>
              <div className="text-xs text-gray-500 mt-1">HUMIDITY</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-full">
              <Wind className="w-6 h-6 text-gray-500" />
            </div>
            <div className="text-gray-800">
              <div className="text-xl font-bold">0 MIN</div>
              <div className="text-xs text-gray-500 mt-1">RAIN</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scouting Reports */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <span>LATEST INSIGHTS</span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {insights.length}
              </span>
            </h2>
            <div className="space-y-6">
              {insights.slice(0, 4).map((insight, index) => (
                <div 
                  key={insight.id || index} 
                  className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">{insight.title?.toUpperCase()}</h3>
                    <p className="text-gray-500 text-sm mt-1">{insight.content}</p>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap ml-4">
                    {formatDate(insight.date_posted)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow-lg p-4 h-full">
            <MapComponent />
          </div>
        </div>
      </div>

      {/* What To Do Section */}
      <div className="mt-6">
        <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">RECOMMENDATIONS</h2>
          <div className="space-y-6">
            {insights.map((insight, index) => (
              <div 
                key={insight.id || index} 
                className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
              >
                <div className="md:col-span-2">
                  <span className="text-gray-800 font-medium">
                    {formatDate(insight.date_posted)}
                  </span>
                </div>
                <div className="md:col-span-10">
                  <p className="text-gray-600">{insight.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldMonitoringDashboard;