import React, { useEffect, useState } from "react";

interface ShimmerButtonProps {
  text: string;
  animationDuration?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  width?: string;
  height?: string; 
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  text,
  animationDuration = "2s", 
  className = "",
  onClick,
  disabled = false, 
  width = "150px", 
  height = "50px",
}) => {
  const [squareStyles, setSquareStyles] = useState({
    square1: { x: 0, y: 0, rotation: 0, speed: 0 },
    square2: { x: 0, y: 0, rotation: 0, speed: 0 },
  });

  
  // const randomizeSquareStyles = () => ({
  //   x: Math.random() * 40 - 20,
  //   y: Math.random() * 40 - 20,
  //   rotation: Math.random() * 360 * (Math.random() < 0.5 ? -1 : 1),
  //   speed: Math.random() * 6 + 8, 
  // });

  useEffect(() => {
    const randomizeSquareStyles = (constrainedX: number, constrainedY: number) => ({
      x: constrainedX + Math.random() * 10 - 5,
      y: constrainedY + Math.random() * 10 - 5, 
      rotation: Math.random() * 360 * (Math.random() < 0.5 ? -1 : 1),
      speed: Math.random() * 6 + 8,
    });
  
    const randomizePositions = () => {
      const square1 = randomizeSquareStyles(0, 0); 
      const square2 = randomizeSquareStyles(100, 100); 
  
      setSquareStyles({
        square1: square1,
        square2: square2,
      });
    };
  
    randomizePositions();
      const interval = setInterval(() => {
      randomizePositions();
    }, 2000); 
  
    return () => clearInterval(interval); 
  }, []);
  

  return (
    <button
      className={`relative flex items-center justify-center rounded-md bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none  ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : "animate-shimmer-button"
      }`}
      style={{
        animationDuration: disabled ? "0s" : animationDuration,
        width: width,
        height: height,
      }}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {text}

      {/* Floating shapes */}
      {!disabled && (
        <>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Square 1 */}
            <div
              className="shape shape-square border-4 border-white"
              style={{
                transform: `translate(${squareStyles.square1.x}px, ${squareStyles.square1.y}px) rotate(${squareStyles.square1.rotation}deg)`,
                transition: `transform ${squareStyles.square1.speed}s linear`,
              }}
            ></div>

            {/* Square 2 */}
            <div
              className="shape shape-square border-4 border-white"
              style={{
                transform: `translate(${squareStyles.square2.x}px, ${squareStyles.square2.y}px) rotate(${squareStyles.square2.rotation}deg)`,
                transition: `transform ${squareStyles.square2.speed}s linear`,
              }}
            ></div>

            {/* Symbols */}
            <div className="tiny-symbol absolute top-4 left-4">*</div>
            <div className="tiny-symbol absolute bottom-4 right-4 text-white text-lg">+</div>
            <div className="tiny-symbol absolute top-8 right-10 text-white text-lg">*</div>
            <div className="tiny-symbol absolute bottom-8 left-15 text-white text-lg">+</div>
            <div className="tiny-symbol absolute top-3 right-3 text-white text-lg">*</div>
            <div className="tiny-symbol absolute bottom-0 left-17 text-white text-lg">+</div>
            {/* Additional symbols */}
            <div className="tiny-symbol absolute top-0 left-8 text-white text-lg">#</div>
            <div className="tiny-symbol absolute bottom-7 right-8 text-white text-lg">@</div>
            <div className="tiny-symbol absolute top-16 left-16 text-white text-lg">&</div>
          </div>
        </>
      )}
    </button>
  );
};
