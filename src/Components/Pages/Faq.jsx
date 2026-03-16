import React from "react";

const faqs = [
  {
    id: 1,
    question: "What is this platform about?",
    answer:
      "This platform connects Buyers who need small tasks completed with Workers who perform those tasks in exchange for coins, which can later be withdrawn as real money.",
  },
  {
    id: 2,
    question: "How do I earn money on this platform?",
    answer:
      "Register as a Worker, complete available tasks, and submit proof of completion. After approval by the Buyer, you will earn coins that can be withdrawn according to the platform’s withdrawal policy.",
  },
  {
    id: 3,
    question: "How do I post a task?",
    answer:
      "To post a task, register as a Buyer and access your dashboard. Use the 'Add New Task' option and ensure you have enough coins before publishing.",
  },
  {
    id: 4,
    question: "How does the coin system work?",
    answer:
      "Coins are the internal currency of the platform. Buyers purchase coins to pay Workers, and Workers earn coins by completing approved tasks.",
  },
  {
    id: 5,
    question: "Is the platform mobile-friendly?",
    answer:
      "Yes. The platform is fully responsive and optimized for desktops, tablets, and mobile devices.",
  },
  {
    id: 6,
    question: "How can I withdraw my earnings?",
    answer:
      "Workers can withdraw their earnings once they reach the minimum withdrawal limit. Withdrawals are processed through supported payment methods.",
  },
];

const Faq = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="w-11/12 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            FAQ
          </p>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-base-content">
            Frequently Asked Questions
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-base-content/70">
            Find answers to common questions about earning, posting tasks,
            payments, and using the RemoteEarn platform.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {faqs.map((faq) => (
            <div
              key={faq.id}
              tabIndex={0}
              className="collapse collapse-plus rounded-xl border border-base-300 bg-base-100 shadow-sm hover:shadow-md transition"
            >
              <div className="collapse-title text-lg font-semibold text-base-content">
                {faq.question}
              </div>

              <div className="collapse-content text-base-content/75 leading-7">
                {faq.answer}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Faq;