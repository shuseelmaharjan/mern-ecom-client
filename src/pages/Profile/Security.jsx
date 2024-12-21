import React from 'react'
import Nav from '../../components/Profile/Nav'


const Security = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

    <Nav/>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            
        <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
            <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            Reviews your sign-in history
            </h2>
            <p className='text-base'>Make sure you recognize all recent sign-in activity for your account. You can sign out anywhere you’re still signed in.</p>
        </div>

        </div>
    </div>
  )
}

export default Security