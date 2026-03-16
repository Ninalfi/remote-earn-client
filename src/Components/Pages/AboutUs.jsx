import React from "react";
import Timeline from "./Timeline";

const timelineData = [
  {
    index: 1,
    year: "2022",
    title: "The Idea Was Born",
    description:
      "While exploring global freelancing trends, we identified a gap in accessible platforms for remote-tasking. That insight led to the creation of RemoteEarn — a platform designed to help people earn by completing simple, meaningful tasks.",
    image: "/assets/about1.webp",
  },
  {
    index: 2,
    year: "2023",
    title: "Laying the Groundwork",
    description:
      "We started building the platform with a strong focus on role-based access, fair earning policies, and a reliable coin-based payment system. Our core technology stack included React, Firebase, MongoDB, and Node.js.",
    image: "/assets/about2.webp",
  },
  {
    index: 3,
    year: "2024",
    title: "Shaping the Experience",
    description:
      "We introduced advanced features such as personalized dashboards, secure Stripe payments, notification systems, and an improved user experience inspired by leading remote-task marketplaces.",
    image: "/assets/about3.webp",
  },
  {
    index: 4,
    year: "2025",
    title: "Going Public",
    description:
      "With a robust feature set, smooth workflows, and a rewarding experience for both Buyers and Workers, RemoteEarn officially launched to the public — marking the beginning of our next chapter.",
    image: "/assets/about4.webp",
  },
];

const AboutUs = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            About Us
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-base-content">
            Building Opportunities Through Remote-Work
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-base-content/70 leading-relaxed">
            RemoteEarn is built to create accessible earning opportunities for
            individuals while helping task creators get work done efficiently,
            securely, and fairly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div>
              <p className="text-accent font-semibold uppercase tracking-wide mb-3">
                — About RemoteEarn
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-base-content leading-tight">
                Empowering Remote-Workers, One Task at a Time
              </h2>
            </div>

            <p className="text-lg md:text-xl leading-9 text-base-content/80">
              Welcome to RemoteEarn — your trusted platform for remote-tasking and
              fair digital earning. We connect task creators with dedicated
              workers who are ready to complete simple yet valuable jobs.
            </p>

            <p className="text-base md:text-lg leading-8 text-base-content/70">
              We are a team of technology enthusiasts, freelancers, and problem
              solvers who believe online earning should be accessible to
              everyone, regardless of background or location. Our platform is
              designed to make every task easy to understand, secure to
              complete, and rewarding for all parties involved.
            </p>

            <div className="rounded-2xl border border-base-300 bg-base-200/40 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-base-content mb-2">
                Our Mission
              </h3>
              <p className="text-base-content/75 leading-8">
                To make online earning simple, transparent, and accessible for
                everyone through a reliable and user-friendly remote-tasking
                platform.
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-[620px] mx-auto min-h-[420px] md:min-h-[720px]">
            <div className="flex justify-end">
              <img
                src="/assets/aboutpat.webp"
                alt="RemoteEarn pattern"
                className="h-[180px] w-[140px] sm:h-[280px] sm:w-[220px] md:h-[360px] md:w-[280px] object-cover rounded-2xl opacity-90"
              />
            </div>

            <div className="absolute left-0 top-16 md:top-24 w-[75%] shadow-2xl rounded-2xl overflow-hidden">
              <img
                src="/assets/aboutban.webp"
                alt="About RemoteEarn"
                className="w-full h-[320px] sm:h-[500px] md:h-[620px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Timeline
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-base-content">
            Our Journey
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-base-content/70 leading-relaxed">
            A look back at the key milestones that shaped RemoteEarn into the
            platform it is today.
          </p>
        </div>

        <div className="space-y-10">
          {timelineData.map((data) => (
            <Timeline key={data.index} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;