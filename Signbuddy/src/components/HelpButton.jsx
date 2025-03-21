import { useNavigate } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";

const HelpButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/howtouse")}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition duration-300 flex items-center justify-center"
    >
      <FaQuestionCircle className="text-2xl" />
    </button>
  );
};

export default HelpButton;
