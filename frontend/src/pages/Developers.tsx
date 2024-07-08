import Navigation from '@/components/LandingPage/Navigation'

const Developers = () => {
  return (
    <div>
        <Navigation />
        <div className="flex flex-col h-auto dark:bg-dark-body dark:text-white font-spacegotesk">
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