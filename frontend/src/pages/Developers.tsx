import Navigation from '@/components/LandingPage/Navigation'

const Developers = () => {
  return (
    <div>
        <Navigation />
        <div className="flex flex-col h-auto dark:bg-dark-body dark:text-white font-spacegotesk">
            <div className="mt-12">
                <h1 className="text-4xl font-bold text-center">Developers Page</h1>
            </div>
            <div className="flex md:flex-row flex-col justify-center gap-12 m-12">
                <div>
                    <div>

                        <img src="/images/p1.jpg" className="h-[350px] w-[350px] object-cover rounded-2xl"></img>
                    </div>
                    <div className="w-[350px] mt-5">
                        <h1 className="text-4xl font-bold">Dev 1</h1>
                        <p className="mt-4 text-justify">Connect with Developers from all over the world and collaborate on projects.</p>
                    </div>
                </div>
                <div>
                    <img src="/images/p2.jpg" className="h-[350px] w-[350px] object-cover rounded-2xl"></img>
                    <div className="w-[350px] mt-5">
                        <h1 className="text-4xl font-bold">Dev 1</h1>
                        <p className="mt-4 text-justify">Connect with Developers from all over the world and collaborate on projects.</p>
                    </div>
                </div>
                <div>
                    <img src="/images/p3.svg" className="h-[350px] w-[350px] object-cover rounded-2xl bg-gradient-to-r from-green-400 to-teal-300"></img>
                    <div className="w-[350px] mt-5">
                        <h1 className="text-4xl font-bold">Dev 1</h1>
                        <p className="mt-4 text-justify">Connect with Developers from all over the world and collaborate on projects.</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Developers