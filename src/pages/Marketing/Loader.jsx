import React from 'react'

const Loader = () => {
  return (
    <div>
        <li
            className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg p-4 space-y-4 sm:space-y-0 sm:space-x-4 border-black"
          >
            <div className="flex justify-center sm:justify-start">
              <img className="w-32 h-32 bg-gray-300 object-cover rounded animate-pulse" alt="loader"/>
            </div>

            <div className="flex-1 flex flex-col justify-between animate-pulse bg-gray-300">
              <div className="flex-grow">
                <p className="text-gray-600 animate-pulse bg-gray-300"/>
              </div>

              <div className="flex space-x-2 mt-4">
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
              </div>
            </div>

            <div className="sm:ml-auto flex flex-col justify-between sm:space-x-4 sm:space-y-0 space-y-2 h-auto">
              <div className="flex justify-end space-x-8">
                <p className="text-sm text-gray-500 text-xl flex space-x-2 items-center">
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                </p>
                <p className="text-sm text-gray-500 text-xl flex space-x-2 items-center">
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                </p>
              </div>

              <div className="flex mt-auto mb-0 space-x-6 items-center justify-end">
                {/* Discounted Percentage Section */}
                <div className="flex items-center space-x-2">
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                  <div className="text-gray-700">
                    <h2 className="font-medium">Discounted</h2>
                    <h2 className="font-medium">Percentage</h2>
                  </div>
                </div>

                <div className="w-px h-12 bg-gray-600"></div>

                {/* Total Sales Section */}
                <div className="flex items-center space-x-2">
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                  <div className="text-gray-700">
                    <h2 className="font-medium">Total</h2>
                    <h2 className="font-medium">Sales</h2>
                  </div>
                </div>

                <div className="w-px h-12 bg-gray-600"></div>

                {/* Total Visits Section */}
                <div className="flex items-center space-x-2">
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                  <div className="text-gray-700">
                    <h2 className="font-medium">Total</h2>
                    <h2 className="font-medium">Visits</h2>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li
            className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg p-4 space-y-4 sm:space-y-0 sm:space-x-4 border-black"
          >
            <div className="flex justify-center sm:justify-start">
              <img className="w-32 h-32 bg-gray-300 object-cover rounded animate-pulse" alt="loader"/>
            </div>

            <div className="flex-1 flex flex-col justify-between animate-pulse bg-gray-300">
              <div className="flex-grow">
                <p className="text-gray-600 animate-pulse bg-gray-300"/>
              </div>

              <div className="flex space-x-2 mt-4">
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
              </div>
            </div>

            <div className="sm:ml-auto flex flex-col justify-between sm:space-x-4 sm:space-y-0 space-y-2 h-auto">
              <div className="flex justify-end space-x-8">
                <p className="text-sm text-gray-500 text-xl flex space-x-2 items-center">
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                </p>
                <p className="text-sm text-gray-500 text-xl flex space-x-2 items-center">
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                </p>
              </div>

              <div className="flex mt-auto mb-0 space-x-6 items-center justify-end">
                {/* Discounted Percentage Section */}
                <div className="flex items-center space-x-2">
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                  <div className="text-gray-700">
                    <h2 className="font-medium">Discounted</h2>
                    <h2 className="font-medium">Percentage</h2>
                  </div>
                </div>

                <div className="w-px h-12 bg-gray-600"></div>

                {/* Total Sales Section */}
                <div className="flex items-center space-x-2">
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                  <div className="text-gray-700">
                    <h2 className="font-medium">Total</h2>
                    <h2 className="font-medium">Sales</h2>
                  </div>
                </div>

                <div className="w-px h-12 bg-gray-600"></div>

                {/* Total Visits Section */}
                <div className="flex items-center space-x-2">
                <span className="rounded-full px-3 py-2 font-semibold animate-pulse bg-gray-300"/>
                  <div className="text-gray-700">
                    <h2 className="font-medium">Total</h2>
                    <h2 className="font-medium">Visits</h2>
                  </div>
                </div>
              </div>
            </div>
          </li>
    </div>
  )
}

export default Loader