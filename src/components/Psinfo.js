import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const generateColorPalette = () => {
  const hue = Math.floor(Math.random() * 360);
  return {
    primary: `hsl(${hue}, 70%, 50%)`,
    light: `hsl(${hue}, 70%, 90%)`,
    dark: `hsl(${hue}, 70%, 30%)`,
    text: `hsl(${hue}, 70%, 20%)`
  };
};



const StockMarketPattern = React.memo(() => (
  <>
    <style>
    {`
      body, html {
        overflow: hidden;
        margin: 0;
        height: 100%;
        
      }
      .video-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        
        height: 100vh;
        z-index: -1; /* Keep the video in the background */
      }
      .video-container video {
        width: 100%;
        
        height: 100%;
        object-fit: cover; /* Ensures the video covers the screen properly */\
      }
    `}
  </style>
    <defs>
      <pattern
        id="stock-pattern"
        x="0"
        y="0"
        width="100%"
        height="100%"
        patternUnits="userSpaceOnUse"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          x="0"
          y="0"
          width="100%"
          height="100%"
          style={{filter:"blur(4px)", background:'#36454F'}}
          preserveAspectRatio="xMidYMid slice"
          autoPlay
          loop
          muted
          
        >
          
          <source src="/stockvideo.mp4" type="video/mp4" />
        </video>
      </pattern>
    </defs>
    <div className="video-container" >
      <rect x="0" y="0" width="100%" height="100%" fill="url(#stock-pattern)" />
    </div>
  </>
));

const Psinfo = ({ mail }) => {
  const [colors, setColors] = useState(generateColorPalette());
  const [timer, setTimer] = useState(3);
  const [formData, setFormData] = useState({
    income: '',
    age: '',
    city: '',
    foodAtHome: '',
    foodAwayFromHome: '',
    housing: '',
    transportation: '',
    healthcare: '',
    education: '',
    entertainment: '',
    personalCare: '',
    apparelAndServices: '',
    tobaccoProducts: '',
    cashContributions: '',
    alcoholicBeverages: '',
    savings: ''
  });
  const [formStep, setFormStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
 
  
  useEffect(() => {
    setColors(generateColorPalette());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const navigate = useNavigate();

 
  
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setFormSubmitted(false);
      setFormStep(0);
      setColors("#90CC65");
      navigate('/home');
    }
  }, [timer, navigate, setFormSubmitted, setFormStep, setColors]);

  
  const nextStep = () => {
    setFormStep(prev => Math.min(prev + 1, 7));
  };

  const prevStep = () => {
    setFormStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({income: '',
      age: '',
      city: '',
      foodAtHome: '',
      foodAwayFromHome: '',
      housing: '',
      transportation: '',
      healthcare: '',
      education: '',
      entertainment: '',
      personalCare: '',
      apparelAndServices: '',
      tobaccoProducts: '',
      cashContributions: '',
      alcoholicBeverages: '',
      savings: ''})
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  if (formSubmitted) {
    return (
      <>
      <div className="relative flex justify-center items-center min-h-screen overflow-hidden">

      <StockMarketPattern />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div> 
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex justify-center items-center min-h-screen"
              style={{ 
                background: `linear-gradient(to bottom right, ${colors.light}, ${colors.background})` 
              }}
            >
             <div
                className="w-full max-w-md p-8 rounded-xl shadow-2xl text-center"
                style={{
                  backgroundColor: 'white',
                  borderColor: "#90CC65",
                  borderWidth: '2px'
                }}
              >
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: colors.dark }}
                >
                  Thank You!
                </h2>
                <p
                  className="mb-4"
                  style={{ color: colors.text }}
                >
                 Your information has been submitted successfully. Redirecting in {timer} {timer === 1 ? 'second' : 'seconds'}.
                </p>
              </div>
      </motion.div>
      </div>

      </>
    );
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">

    <StockMarketPattern />
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div> 

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        <div 
          className="relative z-10 rounded-xl shadow-2xl overflow-hidden"
          style={{ backgroundColor: 'white',margin:'10px' }}
        >
          <div 
            className="py-4"
            style={{ 
              backgroundColor: '#90CC65',
              color: 'white' 
            }}
          >
            <h1 className="text-2xl font-bold text-center">
              {formStep < 3 ? "Personal Information" : "Expense Track"}
            </h1>
          </div>
          <div className="p-6">
            
              <AnimatePresence mode="wait">
                {formStep === 0 && (
                  <motion.div
                    key="income-step"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-4"
                  >
                    <div>
                      <label 
                        htmlFor="income" 
                        className="block font-semibold mb-2"
                        style={{ color: colors.text }}
                      >
                        Annual Income
                      </label>
                      <input 
                        type="number" 
                        id="income"
                        name="income"
                        placeholder="Enter your annual income"
                        value={formData.income}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            nextStep();
                          }
                        }} 
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "#90CC65",
                          ':focus': {
                            ringColor: "#90CC65"
                          }
                        }}
                        autoFocus
                        required
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={nextStep} 
                      className="w-full px-4 py-2 rounded-lg transition-colors"
                      style={{ 
                        backgroundColor: "#90CC65",
                        color: 'white',
                        opacity: formData.income ? 1 : 0.5
                      }}
                      disabled={!formData.income}
                    >
                      Next
                    </button>
                  </motion.div>
                )}

                {formStep === 1 && (
                  <motion.div
                    key="age-step"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-4"
                  >
                    <div>
                      <label 
                        htmlFor="age" 
                        className="block font-semibold mb-2"
                        style={{ color: colors.text }}
                      >
                        Age
                      </label>
                      <input 
                        type="number" 
                        id="age"
                        name="age"
                        placeholder="Enter your age"
                        value={formData.age}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            nextStep();
                          }
                        }} 
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "#90CC65",
                          ':focus': {
                            ringColor: "#90CC65"
                          }
                        }}
                        min="0"
                        max="120"
                        required
                        autoFocus
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        type="button" 
                        onClick={prevStep} 
                        className="w-full px-4 py-2 border-2 rounded-lg transition-colors"
                        style={{
                          borderColor: "#90CC65",
                          color: "#90CC65",
                          ':hover': { backgroundColor: "#90CC65" }
                        }}
                      >
                        Back
                      </button>
                      <button 
                        type="button" 
                        onClick={nextStep} 
                        className="w-full px-4 py-2 rounded-lg transition-colors"
                        style={{ 
                          backgroundColor: "#90CC65",
                          color: 'white',
                          opacity: formData.age ? 1 : 0.5
                        }}
                        disabled={!formData.age}
                      >
                        Next
                      </button>
                    </div>
                  </motion.div>
                )}

                {formStep === 2 && (
                  <motion.div
                    key="city-step"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-4"
                  >
                    <div>
                      <label 
                        className="block font-semibold mb-2"
                        style={{ color: colors.text }}
                      >
                        City Type
                      </label>
                      <select
                        value={formData.city} 
                        onChange={(e) => setFormData(prevState => ({
                          ...prevState,
                          city: e.target.value
                        }))}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "#90CC65",
                          ':focus': {
                            ringColor: "#90CC65"
                          }
                        }}
                      >
                        <option value="">Select city type</option>
                        <option value="metropolitan">Metropolitan</option>
                        <option value="city">City</option>
                        <option value="town">Town</option>
                        <option value="village">Village</option>
                      </select>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        type="button" 
                        onClick={prevStep} 
                        className="w-full px-4 py-2 border-2 rounded-lg transition-colors"
                        style={{
                          borderColor: "#90CC65",
                          color: colors.text,
                          ':hover': { backgroundColor: "#90CC65" }
                        }}
                      >
                        Back
                      </button>
                      <button 
                        type="button" 
                        onClick={nextStep} 
                        className="w-full px-4 py-2 rounded-lg transition-colors"
                        style={{ 
                          backgroundColor: "#90CC65",
                          color: 'white',
                          opacity: formData.age ? 1 : 0.5
                        }}
                        disabled={!formData.city}
                      >
                        Next
                      </button>
                    </div>
                  </motion.div>
                )}

                {formStep === 3 && (
                        <motion.div
                          key="expense-step-1"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="space-y-4"
                        >
                          <div>
                            <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                              Food at Home
                            </label>
                            <input
                              type="number"
                              name="foodAtHome"
                              value={formData.foodAtHome}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                              style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                            />
                          </div>
                          <div>
                            <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                              Food Away from Home
                            </label>
                            <input
                              type="number"
                              name="foodAwayFromHome"
                              value={formData.foodAwayFromHome}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                              style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={prevStep}
                              className="w-full px-4 py-2 border-2 rounded-lg transition-colors"
                              style={{ borderColor: "#90CC65", color: colors.text, ':hover': { backgroundColor: "#90CC65" } }}
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={nextStep}
                              className="w-full px-4 py-2 rounded-lg transition-colors"
                              style={{ backgroundColor: "#90CC65", color: 'white' }}
                            >
                              Next
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {formStep === 4 && (
                        <motion.div
                          key="expense-step-2"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="space-y-4"
                        >
                          <div>
                            <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                              Housing
                            </label>
                            <input
                              type="number"
                              name="housing"
                              value={formData.housing}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                              style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                            />
                          </div>
                          <div>
                            <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                              Transportation
                            </label>
                            <input
                              type="number"
                              name="transportation"
                              value={formData.transportation}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                              style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={prevStep}
                              className="w-full px-4 py-2 border-2 rounded-lg transition-colors"
                              style={{ borderColor: "#90CC65", color: colors.text, ':hover': { backgroundColor: "#90CC65" } }}
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={nextStep}
                              className="w-full px-4 py-2 rounded-lg transition-colors"
                              style={{ backgroundColor: "#90CC65", color: 'white' }}
                            >
                              Next
                            </button>
                          </div>
                        </motion.div>
                      )}



                {formStep === 5 && (
                  <motion.div
                    key="expense-step-3"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-4"
                  >
                    <div>
                      <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                        Healthcare
                      </label>
                      <input
                        type="number"
                        name="healthcare"
                        value={formData.healthcare}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                        Education
                      </label>
                      <input
                        type="number"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                        Entertainment
                      </label>
                      <input
                        type="number"
                        name="entertainment"
                        value={formData.entertainment}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="w-full px-4 py-2 border-2 rounded-lg transition-colors"
                        style={{ borderColor: "#90CC65", color: colors.text, ':hover': { backgroundColor: "#90CC65" } }}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="w-full px-4 py-2 rounded-lg transition-colors"
                        style={{ backgroundColor: "#90CC65", color: 'white' }}
                      >
                        Next
                      </button>
                    </div>
                  </motion.div>
                )}

                {formStep === 6 && (
                  <motion.div
                    key="expense-step-4"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-4"
                  >
                    <div>
                      <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                        Personal Care
                      </label>
                      <input
                        type="number"
                        name="personalCare"
                        value={formData.personalCare}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                        Apparel and Services
                      </label>
                      <input
                        type="number"
                        name="apparelAndServices"
                        value={formData.apparelAndServices}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                        Tobacco Products
                      </label>
                      <input
                        type="number"
                        name="tobaccoProducts"
                        value={formData.tobaccoProducts}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="w-full px-4 py-2 border-2 rounded-lg transition-colors"
                        style={{ borderColor: "#90CC65", color: colors.text, ':hover': { backgroundColor: "#90CC65" } }}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="w-full px-4 py-2 rounded-lg transition-colors"
                        style={{ backgroundColor: "#90CC65", color: 'white' }}
                      >
                        Next
                      </button>
                    </div>
                  </motion.div>
                )}

                {formStep === 7 && (
                  <motion.div
                    key="expense-step-5"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-4"
                  >
                    <div>
                      <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                        Cash Contributions
                      </label>
                      <input
                        type="number"
                        name="cashContributions"
                        value={formData.cashContributions}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                        Alcoholic Beverages
                      </label>
                      <input
                        type="number"
                        name="alcoholicBeverages"
                        value={formData.alcoholicBeverages}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2" style={{ color: colors.text }}>
                        Savings
                      </label>
                      <input
                        type="number"
                        name="savings"
                        value={formData.savings}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: "#90CC65", ':focus': { ringColor: "#90CC65" } }}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="w-full px-4 py-2 border-2 rounded-lg transition-colors"
                        style={{ borderColor: "#90CC65", color: colors.text, ':hover': { backgroundColor: "#90CC65" } }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 rounded-lg transition-colors"
                        style={{ backgroundColor: "#90CC65", color: 'white' }}
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </motion.div>
                )}

                
              </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Psinfo;