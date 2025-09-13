"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ConvexTest() {
  const connectionStatus = useQuery(api.testConnection.getConnectionStatus);
  const testData = useQuery(api.testConnection.getTestData);

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Convex Connection Test</h2>
      
      {/* Connection Status */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Connection Status:</h3>
        {connectionStatus === undefined ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
            <span className="text-yellow-400">Connecting...</span>
          </div>
        ) : (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium">{connectionStatus.status}</span>
            </div>
            <p className="text-sm mt-1">{connectionStatus.message}</p>
            <p className="text-xs text-green-600 mt-1">Last checked: {connectionStatus.timestamp}</p>
          </div>
        )}
      </div>

      {/* Test Data */}
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Test Data:</h3>
        {testData === undefined ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
            <span className="text-yellow-400">Loading data...</span>
          </div>
        ) : (
          <div className="space-y-2">
            {testData.map((item) => (
              <div key={item.id} className="bg-gray-700 p-3 rounded border border-gray-600">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-gray-400 text-sm">{new Date(item.created).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          {connectionStatus && testData ? 
            "✅ Convex is working properly!" : 
            "⏳ Testing connection..."
          }
        </p>
      </div>
    </div>
  );
}