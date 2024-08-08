import React from 'react'

const BountyCheck = ({
    isChecked,
    setIsChecked,
    }: {
    isChecked: boolean
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
    
}) => {
  

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <>
      <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1 dark:bg-[#44546b]'>
        <input
          type='checkbox'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked ? 'text-black bg-[#f4f7ff]' : 'text-body-color'
          }`}
        >
          Bounty
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            !isChecked ? 'text-black bg-[#f4f7ff]' : 'text-body-color'
          }`}
        >

          No Bounty
        </span>
      </label>
    </>
  )
}

export default BountyCheck
