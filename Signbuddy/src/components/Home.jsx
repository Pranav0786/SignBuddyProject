import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import FAQSection from "./FAQSection";
import ReviewSlideshow from "./ReviewSlideShow";
import HelpButton from "./HelpButton";

const FadeInSection = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center min-h-screen bg-white p-12 mt-11">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-fixed bg-[url('https://i.pinimg.com/originals/6a/dc/6a/6adc6a4018d5e1b69e7553ee704adb41.gif')] opacity-30"
      />
      
      <div className="relative flex gap-7 justify-center items-center mb-12">
        <motion.img 
          src="https://i.pinimg.com/originals/6a/dc/6a/6adc6a4018d5e1b69e7553ee704adb41.gif" 
          className="h-[400px] w-[400px] rounded-xl" 
          alt=""
          style={{ y }}
          whileHover={{ scale: 1.05 }}
        />
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="bg-[#143D60] bg-opacity-3 backdrop-blur-lg shadow-2xl rounded-3xl p-12 max-w-3xl border border-white border-opacity-20 mt-12 mb-8"
        >
          <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
            Welcome to <span className="text-yellow-300">SignBuddy</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8 leading-relaxed">
            Experience real-time AI-powered <span className="font-semibold text-white">sign language detection</span>.<br/>
            Bridging the communication gap for a more inclusive world.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/langDetection")}
            className="bg-yellow-400 text-gray-900 font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition duration-300 hover:bg-yellow-500"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>

      {/* Why SignBuddy? Section */}
      <FadeInSection>
        <section className="w-full max-w-5xl text-center mt-20 p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Why SignBuddy?</h2>
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            SignBuddy is designed to break barriers in communication. Millions of deaf individuals
            face challenges in daily conversations. With our real-time AI-powered system,
            we provide seamless sign language translation, making communication effortless and natural.
          </p>
        </section>
      </FadeInSection>

      {/* Features Section */}
      <FadeInSection>
        <section className="w-full max-w-5xl text-center mt-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Key Features</h2>
          <p className="text-lg text-gray-700 mb-12">Discover the amazing features that make SignBuddy unique.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Real-Time Detection", "Accessibility", "Multi-Language Support", "Offline Mode", "Affordable & Portable", "Highly Accurate AI Model"].map((feature, index) => (
              <motion.div 
                key={index} 
                className="p-6 bg-blue-100 rounded-lg shadow-md"
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              >
                <h3 className="text-xl font-semibold">{feature}</h3>
              </motion.div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* Testimonials */}
      <FadeInSection>
        <section className="w-full max-w-5xl text-center mt-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
          <p className="text-lg text-gray-700 mb-12">Real experiences from people who love SignBuddy.</p>
          <ReviewSlideshow />
        </section>
      </FadeInSection>

      <HelpButton/>

      {/* FAQ & Footer */}
      <FAQSection />
      <footer className="w-full bg-gray-800 text-white text-center py-6 mt-12">
        <p>&copy; {new Date().getFullYear()} SignBuddy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
