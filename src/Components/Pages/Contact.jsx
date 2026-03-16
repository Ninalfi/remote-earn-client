import React from "react";
import { TfiEmail, TfiHeadphoneAlt } from "react-icons/tfi";
import { FaMapMarkerAlt } from "react-icons/fa";

const contactInfo = [
  {
    id: 1,
    title: "Call Us",
    value: "+8801613787093",
    icon: <TfiHeadphoneAlt />,
    link: "tel:+8801613787093",
  },
  {
    id: 2,
    title: "Email Us",
    value: "alfininad192@gmail.com",
    icon: <TfiEmail />,
    link: "mailto:alfininad192@gmail.com",
  },
  {
    id: 3,
    title: "Visit Us",
    value: "Dhaka, Bangladesh",
    icon: <FaMapMarkerAlt />,
    link: "https://maps.google.com/?q=Dhaka,Bangladesh",
  },
];

const Contact = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="w-11/12 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Contact
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-base-content">
            Stay in Touch with RemoteEarn
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-base-content/70 leading-relaxed">
            We’re here to help. Reach out to us for support, inquiries, or any
            questions about using the RemoteEarn platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {contactInfo.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl border border-base-300 bg-accent p-8 pt-14 text-center text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral text-2xl text-white shadow-lg">
                  {item.icon}
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-3">{item.title}</h2>

              <a
                href={item.link}
                target={item.title === "Visit Us" ? "_blank" : "_self"}
                rel={item.title === "Visit Us" ? "noreferrer" : ""}
                className="text-white/85 font-medium break-words hover:text-white transition"
              >
                {item.value}
              </a>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="overflow-hidden rounded-2xl border border-base-300 shadow-sm min-h-[420px]">
            <iframe
              title="RemoteEarn Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.83187878219!2d90.337287993974!3d23.78097572837469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sjp!4v1751745724791!5m2!1sen!2sjp"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[420px]"
              allowFullScreen
            />
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-100 p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-3">
              Send Us a Message
            </h2>
            <p className="text-base-content/70 mb-6 leading-relaxed">
              Fill out the form below and our team will get back to you as soon
              as possible.
            </p>

            <form className="space-y-5">
              <div>
                <label className="label font-medium text-base-content">
                  Name
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="label font-medium text-base-content">
                  Email
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-white"
                  placeholder="Your email address"
                  required
                />
              </div>

              <div>
                <label className="label font-medium text-base-content">
                  Subject
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="label font-medium text-base-content">
                  Message
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-32 bg-white"
                  placeholder="Write your message here"
                  required
                />
              </div>

              <button className="btn btn-accent text-white px-8">
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;