
const About = () => {
  return (
    <div className="bg-white dark:bg-dark-body py-[120px] font-spacegotesk">
        <div className="w-full flex justify-center">
            <div className="max-w-6xl">
                <div className="dark:text-white flex justify-center py-12 m-5">
                    <h1 className="text-5xl font-bold">What <span className="text-button-clr">  HelpPro </span> Does ?</h1>
                </div>
                <div className="flex gap-12 items-center">
                    <div>
                        <img src="/images/about1.svg" className="h-[420px] rounded-xl"></img>
                    </div>
                    <div className="dark:text-white flex flex-col align-middle  justify-center m-5 md:justify-start mt-5">
                        <img src="/images/tempp.png" className="w-[280px] h-[80px]"></img>
                        <h1 className="text-5xl font-bold mt-10">Connect with developers</h1>
                        <p className="mt-4 text-xl">Connect with <span className="text-button-clr">Developers</span> from all over the world and collaborate on projects.</p>
                    </div>
                </div>
                <div className="flex gap-12 items-center">
                    <div className="dark:text-white flex flex-col align-middle">
                        <img src="/images/temp2.png" className="w-[280px] h-[80px]"></img>
                        <h1 className="text-5xl font-bold mt-10">Earn Bounties for Your Contributions</h1>
                        <p className="mt-4"> Become a part of our vibrant platform where you can showcase your talents, participate in exciting projects to earn rewards, and expand your connections with professionals in your industry! </p>
                    </div>
                    <div>
                        <img src="/images/about2.svg" className="h-[520px] rounded-xl "></img>
                    </div>
                </div>
                <div className="flex gap-12 items-center">
                    <div>
                        <img src="/images/about3.svg" className="h-[620px] rounded-xl "></img>
                    </div>
                    <div className="dark:text-white flex flex-col align-middle">
                        <img src="/images/3.png" className="w-[280px] h-[80px]"></img>
                        <h1 className="text-5xl font-bold mt-10">Access a Rich Repository of Open-Source Projects</h1>
                        <p className="mt-4">Discover a vast repository of open-source projects. Access, contribute, and collaborate to make an impact!</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default About