import Navigation from "./Navigation";

const Features = () => {
  return (
    <div>
      <Navigation />
      <div className="font-spacegotesk dark:bg-dark-body ">
        <div className="relative isolate overflow-hidden dark:bg-dark-body bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden dark:opacity-30">
            <svg
              aria-hidden="true"
              className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            >
              <defs>
                <pattern
                  x="50%"
                  y={-1}
                  id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                  width={200}
                  height={200}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-50 dark:fill-gray-700">
                <path
                  d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect
                fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
                width="100%"
                height="100%"
                strokeWidth={0}
              />
            </svg>
          </div>
          <div className="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
                    Features and Benefits
                  </h1>
                  <p className="mt-6 text-xl leading-8 text-gray-700 dark:text-white">
                    HelpPro offers a range of features and benefits that make it
                    the ideal platform for developers and project owners alike.
                    From earning rewards to accessing a vast repository of
                    open-source projects, HelpPro is designed to help you
                    succeed.
                  </p>
                </div>
              </div>
            </div>
            <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
              <img
                alt=""
                src="https://res.cloudinary.com/dyhb5midi/image/upload/v1721394081/Screenshot_2024-07-19_182624_iwkyhw.png"
                className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              />
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  {/* <p>
                    Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
                    risus enim. Mattis mauris semper sed amet vitae sed turpis
                    id. Id dolor praesent donec est. Odio penatibus risus
                    viverra tellus varius sit neque erat velit. Faucibus commodo
                    massa rhoncus, volutpat. Dignissim sed eget risus enim.
                    Mattis mauris semper sed amet vitae sed turpis id.
                  </p> */}
                  <ul role="list" className="mt-8 space-y-8 text-gray-600 dark:text-white">
                    <li className="flex gap-x-3">
                      {/* <CloudArrowUpIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" /> */}
                      <span>
                        <strong className="font-semibold text-gray-900 dark:text-white">
                        Earn as You Solve,
                        </strong>{" "}
                        Developers can earn rewards by solving issues and contributing to projects. The bounty system ensures that your hard work and expertise are recognized and compensated.
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      {/* <LockClosedIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" /> */}
                      <span>
                        <strong className="font-semibold text-gray-900 dark:text-white">
                        Simple and Transparent,
                        </strong>{" "}
                         Our intuitive interface makes it easy to create and manage bounties. Track progress, review submissions, and release rewards with transparency and ease.
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      {/* <ServerIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" /> */}
                      <span>
                        <strong className="font-semibold text-gray-900">
                        Instant Access to Experts,
                        </strong>{" "}
                         Get immediate help from a global network of developers. Post your issue, set a bounty, and watch as experts provide solutions and insights.
                      </span>
                    </li>
                  </ul>
                  
                  <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                  Open Source Repository
                  </h2>
                  <p className="mt-6">
                  <span className=" font-bold"> Centralized Hub for Projects</span> Access a vast warehouse of open-source projects. Discover, contribute to, and manage projects all in one place, making collaboration seamless.
                  </p>
                  <p className="mt-6">
                  <span className=" font-bold">Community-Driven Development:</span>  Join forces with other developers to improve and innovate on existing projects. Contribute code, report issues, and collaborate on solutions to drive the open-source ecosystem forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
