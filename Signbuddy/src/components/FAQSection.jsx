import { useState } from "react";
import { motion } from "framer-motion";

const FAQs = [
  {
    question: "How does SignBuddy detect sign language?",
    answer:
      "SignBuddy uses AI-powered image recognition to detect hand signs and gestures in real time.",
  },
  {
    question: "Is SignBuddy free to use?",
    answer:
      "Yes, SignBuddy is completely free for basic usage. We also offer premium features for advanced users.",
  },
  {
    question: "Can I use SignBuddy on mobile devices?",
    answer:
      "Absolutely! SignBuddy is fully responsive and works seamlessly on all devices, including mobile phones and tablets.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-16 w-full text-center bg-gradient-to-r  text-white p-12 rounded-xl shadow-lg">
      <h2 className="text-4xl font-extrabold mb-6 text-yellow-600 drop-shadow-md">
        Frequently Asked Questions
      </h2>

      <div className="mt-6 space-y-4 max-w-4xl mx-auto">
        {FAQs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-20 p-5 rounded-lg shadow-md backdrop-blur-xl border border-white/30 cursor-pointer hover:bg-opacity-30 transition duration-300"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="text-lg font-semibold text-black flex justify-between items-center">
              {faq.question}
              <span className="text-xl">{openIndex === index ? "▲" : "▼"}</span>
            </h3>
            {openIndex === index && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="text-gray-500 mt-3 font-semibold"
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
