
const BountyValue = ( { bountyValue , setBountyValue, currency, setCurrency} : any) => {
    return (
      <div className="flex align-middle items-center">
       
        <div className="relative mt-2 rounded-md shadow-sm">
          
          <input
            type="text"
            name="price"
            id="price"
            value={bountyValue}
            onChange={(e) => setBountyValue(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option>INR</option>
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
  
  export default BountyValue