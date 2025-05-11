"use client"

import type React from "react"

import { useState, useEffect } from "react"
import StepOne from "./step-one"
import StepTwo from "./step-two"
import StepThree from "./step-three"
import StepFour from "./step-four"
import SuccessAnimation from "./success-animation"
import ProgressIndicator from "./progress-indicator"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router"
import { api } from "@/api"
import { create_token } from "@/capacitor/auth"
import { toast, Toaster } from "sonner"
import axios from "axios"

// Add keyframes for mobile animations
const mobileAnimations = `
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-10px) translateX(5px);
  }
  50% {
    transform: translateY(0) translateX(10px);
  }
  75% {
    transform: translateY(10px) translateX(5px);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
`

export default function RegisterForm() {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({
    // Physical info
    height: "",
    heightUnit: "cm",
    weight: "",
    weightUnit: "kg",

    // Fitness profile
    day: "",
    month: "",
    year: "",
    gender: "",
    fitnessGoal: "",
    activityLevel: "",

    // Account info
    name: "",
    email: "",
    password: "",
  })
  const [registrationComplete] = useState(false)
  const router = useNavigate()

  // Add subtle background animation
  const [rotation, setRotation] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null)

  // Handle ResizeObserver error
  useEffect(() => {
    // Suppress ResizeObserver loop limit exceeded error
    const errorHandler = (e: ErrorEvent) => {
      if (e.message.includes("ResizeObserver") || e.message.includes("ResizeObserver loop limit exceeded")) {
        e.stopImmediatePropagation()
      }
    }

    window.addEventListener("error", errorHandler)

    return () => window.removeEventListener("error", errorHandler)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.2) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const updateUserData = (data: Partial<typeof userData>) => {
    setUserData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  // Handle swipe gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const [swipeLocked, setSwipeLocked] = useState(false);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (swipeLocked) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      setSwipeLocked(true);

      if (diff > 0 && step < 4) {
        setSwipeDirection("left");
        nextStep();
      } else if (diff < 0 && step > 1) {
        setSwipeDirection("right");
        prevStep();
      }

      setTimeout(() => {
        setSwipeDirection(null);
        setSwipeLocked(false);
      }, 500);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let client = await api();

    try {
      const response = await client.post("/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        user_data: {
          height: userData.height,
          height_unit: userData.heightUnit,
          weight: userData.weight,
          weight_unit: userData.weightUnit,
          birth_date: `${userData.day}/${userData.month}/${userData.year}`,
          gender: userData.gender,
          fitness_goal: userData.fitnessGoal,
          activity_level: userData.activityLevel,
        }
      });

      console.log(response.data); // You can log the success response
      await create_token(response.data.token);
      router("/")

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Error response:', error.response.data);
          console.log('Error status:', error.response.status);
          toast.error(error.response.data.message || 'Request failed!');
        } else {
          console.error('Error with request:', error.message);
          toast.error('Network error!');
        }
      } else {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred!');
      }
    }
  }


  const handleContinue = () => {
    // Navigate to dashboard or home page
    router("/")
  }



  return (
    <div className="relative">
      <Toaster />
      {/* Add mobile animations */}
      <style
        dangerouslySetInnerHTML={{ __html: mobileAnimations }}
      />


      {/* Animated border effect */}
      <div
        className="absolute -inset-0.5 bg-blue-500/20 rounded-2xl blur-sm"
        style={{
          background: `conic-gradient(from ${rotation}deg at 50% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.1) 25%, rgba(59, 130, 246, 0.3) 50%, rgba(37, 99, 235, 0.1) 75%, rgba(59, 130, 246, 0.3) 100%)`,
        }}
      ></div>

      <div
        className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-blue-500/30 relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>

        {/* Subtle animated accent */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>

        {/* Mobile swipe indicator */}
        {!registrationComplete && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-2 md:hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === step ? "bg-blue-500 w-4" : "bg-gray-600"
                  }`}
              ></div>
            ))}
          </div>
        )}

        <div className="p-4 sm:p-6 relative z-10">
          {!registrationComplete && <ProgressIndicator currentStep={step} totalSteps={4} />}

          <div className="min-h-[450px] sm:min-h-[500px] flex flex-col relative">
            <AnimatePresence initial={false} mode="wait" custom={swipeDirection}>
              {registrationComplete ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full"
                >
                  <SuccessAnimation userName={userData.name} onContinue={handleContinue} />
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  custom={swipeDirection}
                  variants={{
                    initial: {
                      x: swipeDirection === "left" ? 100 : swipeDirection === "right" ? -100 : 0,
                      opacity: 0,
                      position: "absolute" as const,
                      width: "100%"
                    },
                    animate: {
                      x: 0,
                      opacity: 1,
                      position: "relative" as const,
                      transition: {
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }
                    },
                    exit: {
                      x: swipeDirection === "left" ? -100 : swipeDirection === "right" ? 100 : 0,
                      opacity: 0,
                      position: "absolute" as const,
                      width: "100%",
                      transition: {
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }
                    }
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col h-full"
                >
                  {step === 1 && <StepOne onNext={nextStep} />}
                  {step === 2 && (
                    <StepTwo userData={userData} updateUserData={updateUserData} onNext={nextStep} onPrev={prevStep} />
                  )}
                  {step === 3 && (
                    <StepThree
                      userData={userData}
                      updateUserData={updateUserData}
                      onNext={nextStep}
                      onPrev={prevStep}
                    />
                  )}
                  {step === 4 && (
                    <StepFour
                      userData={userData}
                      updateUserData={updateUserData}
                      onPrev={prevStep}
                      onSubmit={handleSubmit}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
