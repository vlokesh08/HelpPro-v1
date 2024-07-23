import Navigation from '@/components/LandingPage/Navigation'

const Developers = () => {
  return (
    <div>
        <Navigation />
        <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-3/4 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
        <div className="flex flex-col h-auto dark:bg-dark-body dark:text-white font-spacegotesk min-h-screen">
            
            
            <div className="mt-12">
                <h1 className="text-4xl font-bold text-center"><span className="text-button-clr">Developers</span> Page</h1>
            </div>
            <div className="flex lg:flex-row flex-col justify-center gap-12 m-12">
                <div>
                    <div>

                        <img src="/images/p1.svg" className="h-[350px] w-[350px] object-cover rounded-2xl"></img>
                    </div>
                    <div className="w-[350px] mt-5 px-4">
                        <h1 className="text-4xl font-bold">Lokesh</h1>
                        <p className="text-justify">Team Developers</p>
                    </div>
                </div>
                <div>
                    <img src="/images/p2.svg" className="h-[350px] w-[350px] object-cover rounded-2xl"></img>
                    <div className="w-[350px] mt-5 px-4">
                        <h1 className="text-4xl font-bold">Aasrith</h1>
                        <p className="text-justify">Team Support</p>
                    </div>
                </div>
                <div>
                    <img src="/images/p3.svg" className="h-[350px] w-[350px] object-contain rounded-2xl bg-gradient-to-r from-green-400 to-teal-300"></img>
                    <div className="w-[350px] mt-5 px-4">
                        <h1 className="text-4xl font-bold">Jayani</h1>
                        <p className=" text-justify">Team Design</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Developers