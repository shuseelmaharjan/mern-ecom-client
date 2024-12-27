import React from 'react'

const PageNotFound = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-sm mx-auto">
          <h2 className="text-4xl font-semibold text-red-600 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-6">You do not have access to this page.</p>
          <p className="text-sm text-gray-400">If you believe this is a mistake, please contact support.</p>
        </div>
      </div>
    </>
  )
}

export default PageNotFound