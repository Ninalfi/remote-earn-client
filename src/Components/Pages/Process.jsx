import React from 'react';

const Process = () => {
    const howToUseSteps = [
  {
    step: 1,
    title: "Sign Up",
    description: "Register as a Worker, Buyer, or Admin to access the platform.",
    image: "/assets/p1.webp",
  },
  {
    step: 2,
    title: "Complete Your Profile",
    description: "Add profile details like photo, bio, and preferences to personalize your account.",
    image: "/assets/p3.webp",
  },
  {
    step: 3,
    title: "Explore or Create Tasks",
    description: "Workers can browse tasks, while Buyers can create new ones with requirements.",
    image: "/assets/p5.webp",
  },
  {
    step: 4,
    title: "Submit & Review Work",
    description: "Workers submit completed tasks; Buyers review and approve/reject submissions.",
    image: "/assets/p2.webp",
  },
  {
    step: 5,
    title: "Earn & Spend Coins",
    description: "Workers earn coins after approval, and Buyers spend coins to pay for completed tasks.",
    image: "/assets/p6.webp",
  },
  {
    step: 6,
    title: "Track Progress",
    description: "Use the dashboard charts and reports to monitor tasks, payments, and performance.",
    image: "/assets/p4.webp",
  },
];

    return (
        <div data-aos="fade-up" data-aos-duration="1500" className='w-full bg-secondary py-20 my-20'>
       <h1 className='text-3xl font-semibold text-center'>Features and Processes</h1>
<p className='text-center opacity-70 font-medium mt-5 mb-20'>
  Discover the key features and step-by-step processes to help you navigate and make the best use of our platform.
</p>

        <div className='grid md:grid-cols-2 w-5/6 mx-auto gap-5'>
            {
                howToUseSteps.map(steps=>
                <div className='flex flex-col gap-2'>
                 <img src={steps.image} loading='lazy' height={50} width={50}/>
                 <h1 className='text-xl font-bold'>{steps.title}</h1>
                 <p className='font-medium opactiy-70'>{steps.description}</p>
                </div>)
            }
        </div>
        </div>
    );
};

export default Process;