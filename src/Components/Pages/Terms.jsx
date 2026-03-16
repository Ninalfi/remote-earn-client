import React from "react";

const termsSections = [
  {
    title: "1. Introduction",
    content: `Welcome to our Remote Tasking and Earning Platform. By accessing or using our services, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using the platform.`,
  },
  {
    title: "2. User Roles & Responsibilities",
    content: [
      {
        label: "Worker",
        text: "You agree to complete tasks honestly, submit valid proof of work, and meet any stated deadlines. False, misleading, or low-quality submissions may result in penalties, rejected work, or account suspension.",
      },
      {
        label: "Buyer",
        text: "You are responsible for posting clear task instructions, setting fair rewards, and reviewing submissions within a reasonable timeframe.",
      },
      {
        label: "Admin",
        text: "We reserve the right to monitor platform activity and manage, update, or remove users, tasks, and balances when necessary to maintain platform security, fairness, and integrity.",
      },
    ],
  },
  {
    title: "3. Coin System",
    content: [
      "Coins are the internal currency of the platform. Workers earn coins by successfully completing approved tasks, while Buyers can purchase coins through Stripe or other supported payment methods.",
      "All purchased coins are non-refundable and cannot be transferred outside the platform.",
      "Workers may request withdrawals once they meet the minimum threshold of 200 coins = $10. Platform conversion and service margins may apply.",
    ],
  },
  {
    title: "4. Account Suspension or Termination",
    content: `We reserve the right to suspend or permanently terminate any account found violating these Terms, including but not limited to fraud, spamming, abuse of the reward system, submission of dishonest work, or any activity harmful to the platform or its users.`,
  },
  {
    title: "5. Payments & Refund Policy",
    content: [
      "All coin purchases are final and non-refundable.",
      "Payments for completed work will only be credited after successful review and approval by the Buyer.",
      "We do not guarantee a fixed level of earnings, task availability, or withdrawal timelines.",
    ],
  },
  {
    title: "6. Data & Privacy",
    content: `We collect only the information necessary for account creation, task management, and payment processing. Your personal data will not be sold or shared with third parties except where required by law or necessary to operate the platform securely. Please review our Privacy Policy for more information.`,
  },
  {
    title: "7. Changes to These Terms",
    content: `We may update these Terms and Conditions from time to time. Continued use of the platform after any changes are published constitutes your acceptance of the revised terms.`,
  },
  {
    title: "8. Contact Information",
    content: `If you have any questions regarding these Terms and Conditions, please contact us at alfininad192@gmail.com.`,
  },
];

const Terms = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="w-11/12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Legal
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-base-content">
            Terms & Conditions
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-base-content/70 leading-relaxed">
            Please read these terms carefully before using our platform. By
            accessing or using our services, you agree to follow the policies
            outlined below.
          </p>
        </div>

        <div className="space-y-6">
          {termsSections.map((section, index) => (
            <div
              key={index}
              className="rounded-2xl border border-base-300 bg-base-200/40 p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-accent mb-4">
                {section.title}
              </h2>

              {typeof section.content === "string" ? (
                <p className="text-base leading-8 text-base-content/80">
                  {section.content.includes("alfininad192@gmail.com") ? (
                    <>
                      If you have any questions regarding these Terms and
                      Conditions, please contact us at{" "}
                      <a
                        href="mailto:alfininad192@gmail.com"
                        className="font-semibold text-accent hover:underline"
                      >
                        alfininad192@gmail.com
                      </a>
                      .
                    </>
                  ) : (
                    section.content
                  )}
                </p>
              ) : (
                <div className="space-y-4">
                  {section.content.map((item, itemIndex) =>
                    typeof item === "string" ? (
                      <p
                        key={itemIndex}
                        className="text-base leading-8 text-base-content/80"
                      >
                        {item}
                      </p>
                    ) : (
                      <p
                        key={itemIndex}
                        className="text-base leading-8 text-base-content/80"
                      >
                        <span className="font-semibold text-base-content">
                          {item.label}:
                        </span>{" "}
                        {item.text}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Terms;