
const MobileWarn = () => {
  return (
    <div>
        <div className="flex justify-center font-spacegotesk items-center h-screen bg-[#f5f7f7] w-full dark:bg-[#212c3c]">
            <div className="m-[120px] flex flex-col gap-3">
                <img src="/images/mobilewarn.svg" className=" mix-blend-multiply"></img>
            <h1 className="text-3xl font-bold text-center">Mobile View Not Supported</h1>
            <p className="text-center">Please use a desktop or laptop to access this page</p>
            </div>
        </div>
    </div>
  )
}

export default MobileWarn