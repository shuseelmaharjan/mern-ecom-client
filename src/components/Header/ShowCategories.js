import React from 'react'
import { Link } from 'react-router-dom';

const ShowCategories = () => {

    
  return (
    <>
    
            <ul className="divide-y divide-gray-200">
                      <li className="group">
                        <Link className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                           Option 1
                          </span>
                        </Link>
                      </li>
                      <li className="group">
                        <Link className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                           Option 1
                          </span>
                        </Link>
                      </li>
                      <li className="group">
                        <Link className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                           Option 1
                          </span>
                        </Link>
                      </li>
                      <li className="group">
                        <Link className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                           Option 1
                          </span>
                        </Link>
                      </li>
                      <li className="group">
                        <Link className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                           Option 1
                          </span>
                        </Link>
                      </li>
                      
                    </ul>
    </>
  )
}

export default ShowCategories