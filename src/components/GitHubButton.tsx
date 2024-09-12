import { useState, useRef } from "react";

export default function GitHubButton() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [maskSize, setMaskSize] = useState(0); 
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }
  };

  const handleMouseEnter = () => {
    setMaskSize(25); 
  };

  const handleMouseLeave = () => {
    setMaskSize(0);
  };

  return (
    <div className="absolute top-4 right-4">
      <div
        ref={buttonRef}
        className="relative inline-block px-4 py-2 bg-black text-white rounded group overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          "--maskX": `${mousePos.x}px`,
          "--maskY": `${mousePos.y}px`,
        } as React.CSSProperties}
      >
        <a
          href="https://github.com/binesh-b0/jobexpiresin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 relative z-10"
          style={{
            mixBlendMode: "difference",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.153-1.11-1.46-1.11-1.46-.907-.62.069-.608.069-.608 1.003.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.087.636-1.337-2.22-.252-4.555-1.11-4.555-4.942 0-1.092.39-1.985 1.03-2.683-.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.852.004 1.71.115 2.51.337 1.908-1.294 2.747-1.025 2.747-1.025.547 1.377.202 2.394.099 2.647.641.698 1.03 1.591 1.03 2.683 0 3.841-2.339 4.687-4.566 4.934.36.31.682.921.682 1.855 0 1.339-.012 2.419-.012 2.749 0 .268.18.578.688.48A10.015 10.015 0 0022 12c0-5.523-4.477-10-10-10z"
              clipRule="evenodd"
            />
          </svg>
          GitHub
        </a>

        {/* Mask Circle for hover effect */}
        <div
          className="absolute inset-0 bg-white pointer-events-none "
          style={{
            clipPath: `circle(${maskSize}px at var(--maskX) var(--maskY))`,
            mixBlendMode: "difference", 
          }}
        />
      </div>
    </div>
  );
}
