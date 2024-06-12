import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      

      <div className="flex items-center py-4 bg-blue-200">
        <div className="mx-4">
          <img src="https://github.com/shadcn.png" alt="Profile" className="w-24 h-24 rounded-full" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Venkata Lokesh</h2>
          <p className="text-gray-600">@vlokesh08 • San Francisco, CA • Joined April 2021</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">★ 5.0 (12)</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end py-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Edit Profile</button>
      </div>

      <div className=" py-4 w-full">
        <div className='w-full'>
          <div className="bg-gray-100 p-4 rounded-lg shadow w-full">
            <h3 className="text-xl font-bold">About</h3>
            <p className="mt-2">Hi! I’m excited to guide you on your journey of becoming a healthier you. I want to share my own story to hopefully inspire you to start this next chapter of your life.</p>
            <div className="mt-4">
              <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded mr-2">Yoga</span>
              <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded mr-2">Bodybuilding</span>
              <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded mr-2">Kickboxing</span>
              <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded mr-2">ACE Certification</span>
              <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded mr-2">NASM Certification</span>
              <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded mr-2">Meditation Coach</span>
            </div>
          </div>
        </div>
        
      </div>

      <div className="py-4">
        <h3 className="text-xl font-bold">6 Reviews</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-gray-800 font-bold">The seller did a fantastic job of designing my website</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">★ 5.0</span>
              </div>
              <p className="text-gray-600 mt-2">Coach Raj is the best trainer I have had. I lost 10 kilos in two months, he really knows his stuff. Great work ethic, extremely motivating, always positive...</p>
              <p className="text-gray-600 mt-2 text-sm">- Emma Pérez, December 8, 2019</p>
              <a href="#" className="text-blue-500 mt-2 block">Read more</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
