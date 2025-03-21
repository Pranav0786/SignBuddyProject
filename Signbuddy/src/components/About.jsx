import { motion } from "framer-motion";
import pranav from "../assets/pranav_surve.jpg";
import shravani from "../assets/sjoshi.jpg";
import aish from "../assets/aish.jpg";
import atharv from "../assets/Atharv_ingale.jpg";

const About = () => {
  const teamMembers = [
    {
      name: "Atharv Ingale",
      role: "AI/ML",
      image: atharv,
    },
    {
      name: "Shravani Joshi",
      role: "Frontend developer",
      image: shravani,
    },
    {
      name: "Pranav Surve",
      role: "AI/ML",
      image: pranav,
    },
    {
      name: "Aishwarya Suryawanshi",
      role: "Frontend developer",
      image: aish,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900 relative overflow-hidden mt-16 p-12">
      <div className="absolute inset-0 bg-fixed bg-[url('/background.jpg')] opacity-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-6xl mx-auto text-center bg-white bg-opacity-80 backdrop-blur-lg p-14 rounded-3xl shadow-2xl border border-gray-300 relative z-10"
      >
        <div className="flex flex-col gap-8">
          {[
            {
              title: "Our Mission",
              color: "text-yellow-500",
              description:
                "Our mission is to break communication barriers for the deaf and speech-impaired by providing a cost-effective, real-time sign language detection system powered by AI. We strive to develop an accurate, portable, and accessible solution that seamlessly translates sign language into text or speech. By leveraging advanced computer vision and deep learning technologies, we aim to enhance inclusivity in education, healthcare, and daily interactions, ensuring that sign language users can communicate effortlessly with the world. ",
            },
            {
              title: "Our Vision",
              color: "text-blue-500",
              description:
                "Our vision is to create a world where communication barriers no longer exist for the deaf and speech-impaired communities. By leveraging real-time AI-powered sign language detection, we aim to make interactions more inclusive and accessible. Our solution prioritizes portability, cost-effectiveness, and real-time performance, ensuring that anyone—whether families, caregivers, or professionals—can seamlessly communicate with sign language users. We envision a future where assistive technology empowers inclusivity in education, healthcare, and everyday life",
            },
            {
              title: "How It Works",
              color: "text-green-500",
              description:
                "<ul><li>📷 Camera Capture – A camera records the user's hand gestures.</li><li>✋ Hand Detection – YOLOv5, a deep learning model, detects and tracks hand positions.</li><li>🤖 Gesture Recognition – The system classifies gestures based on a trained dataset.</li><li>🔊 Translation & Output – The detected sign is converted into text or speech, enabling seamless communication.</li><li>🎯 Portable & Efficient – Runs on Jetson Nano, making it a cost-effective and offline-capable solution.</li></ul>",
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.2 }}
              className="p-6 bg-white rounded-xl shadow-lg backdrop-blur-lg border border-gray-300"
            >
              <h2 className={`text-4xl font-extrabold ${section.color} mb-4`}>
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.description }}></p>
            </motion.div>
          ))}
        </div>

        <h3 className="text-3xl font-semibold text-gray-900 mt-14 mb-8">
          Why Choose SignBuddy?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          {["AI-driven accuracy for precise translations.", "Real-time processing with minimal latency.", "User-friendly interface for all age groups.", "Empowering inclusivity through technology.", "Supports multiple sign languages for better accessibility.", "Seamless integration with smart devices and applications."].map((point, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-lg border border-gray-300"
            >
              <p className="text-gray-700">{point}</p>
            </motion.div>
          ))}
        </div>

        <h3 className="text-3xl font-semibold text-gray-900 mt-14 mb-8">
          Meet Our Team
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.2 }}
              className="p-6 bg-white shadow-lg rounded-lg transform transition duration-300 backdrop-blur-lg border border-gray-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-yellow-500 object-cover"
              />
              <h4 className="text-xl font-semibold text-yellow-500">
                {member.name}
              </h4>
              <p className="text-gray-700">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
