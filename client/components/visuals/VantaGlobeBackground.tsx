import { useEffect, useRef } from "react";

type VantaInstance = {
  destroy: () => void;
};

export default function VantaGlobeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<VantaInstance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isActive = true;

    async function initVanta() {
      if (!containerRef.current || effectRef.current) return;
      try {
        const [vantaModule, threeModule] = await Promise.all([
          import("vanta/dist/vanta.globe.min"),
          import("three"),
        ]);

        if (!containerRef.current || !isActive) return;

        const VantaGlobe = vantaModule?.default as any;
        const three = (threeModule as { default?: typeof import("three") })?.default ?? threeModule;

        if (typeof window !== "undefined") {
          (window as typeof window & { THREE?: typeof import("three") }).THREE = three as typeof import("three");
        }

        if (typeof VantaGlobe === "function") {
          effectRef.current = VantaGlobe({
            el: containerRef.current,
            THREE: three,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x6436f,
            size: 1.6,
            backgroundColor: 0xa2b6c0,
          });
        }
      } catch (error) {
        console.error("Failed to initialize Vanta GLOBE background", error);
      }
    }

    initVanta();

    return () => {
      isActive = false;
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div id="your-element-selector" ref={containerRef} className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true" />
  );
}


