import { motion } from "framer-motion";
import { FaUserPlus, FaSignLanguage, FaMicrophone, FaComments } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-blue-600 text-4xl mb-4" />,
    title: "Step 1: Sign Up",
    description: "Create your account by entering your details. This will allow you to access all features.",
  },
  {
    icon: <FaSignLanguage className="text-green-600 text-4xl mb-4" />,
    title: "Step 2: Enable Camera",
    description: "Allow the website to access your camera so it can detect sign language gestures.",
  },
  {
    icon: <FaMicrophone className="text-yellow-600 text-4xl mb-4" />,
    title: "Step 3: Sign & Translate",
    description: "Use hand gestures to sign words. The system will detect your signs and convert them into text or speech.",
  },
  {
    icon: <FaComments className="text-red-600 text-4xl mb-4" />,
    title: "Step 4: Communicate",
    description: "Use the translated text or speech to communicate with others in real-time.",
  },
];

const HowToUse = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900 p-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-blue-700 mb-6 drop-shadow-lg">How to Use for Deaf Users</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl">
          Follow these simple steps to use our sign language detection system and communicate effortlessly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 text-center transform hover:scale-105 transition duration-300"
          >
            {step.icon}
            <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowToUse;
