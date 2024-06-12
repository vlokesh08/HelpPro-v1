import React from 'react'


const AboutSection = ( {about} : any) => {
  return (
    <div>
        <h2 className="text-2xl font-bold">About Anna</h2>
        {
            about ? (
                <h2 className="text-2xl font-bold">About {about.name}</h2>
            ) : <p>Add  Bio</p>
        }
        {
            /* 
              <p className="mt-4">
                With a strong foundation in software development and a keen eye
                for user experience, I've been fortunate enough to lead teams in
                bringing various successful products to life...
              </p>
              <button className="mt-4 px-4 py-2 bg-gray-200 rounded">
                Learn more
              </button> */}
    </div>
  )
}

export default AboutSection