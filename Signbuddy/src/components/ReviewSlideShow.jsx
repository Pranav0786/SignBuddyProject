import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { name: "Alex", text: "SignBuddy has changed how I communicate with my students!" },
  { name: "Jordan", text: "I can finally understand sign language in real-time!" },
  { name: "Chris", text: "An incredible AI-powered tool for accessibility." },
 
];

const ReviewSlideshow = () => {
  const [currentReview, setCurrentReview] = useState(0);

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  const nextSlide = () => setCurrentReview((prev) => (prev + 1) % reviews.length);

  return (

    <div className="mt-9 relative flex items-center justify-center w-full h-80">
      {/* Left Button */}
      <button
        className="absolute left-0 z-10 p-2 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft size={30} className="text-yellow-300" />
      </button>

      <div className="relative w-[60%] flex justify-center items-center">
        {reviews.map((review, index) => {
          const position = (index - currentReview + reviews.length) % reviews.length;
          let scale = position === 0 ? 1.2 : 0.9;
          let opacity = position === 0 ? 1 : 0.5;
          let translateX = position === 0 ? "0%" : position === 1 ? "100%" : "-100%";
          let zIndex = position === 0 ? "10" : "5";

          return (
            <motion.div
              key={index}
              className="absolute w-96 h-52 bg-blue-500  backdrop-blur-lg text-white rounded-3xl flex flex-col items-center justify-center text-center shadow-lg p-6 border border-gray-100 border-opacity-20"
              initial={{ opacity: 0 }}
              animate={{ scale, opacity, x: translateX, zIndex }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-gray-200">"{review.text}"</p>
              <span className="text-yellow-300 font-bold">- {review.name}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Right Button */}
      <button
        className="absolute right-0 z-10 p-2 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight size={30} className="text-yellow-300" />
      </button>
    </div>
  );
};

export default ReviewSlideshow;