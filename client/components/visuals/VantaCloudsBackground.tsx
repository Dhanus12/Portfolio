import { useEffect, useRef } from "react";

type VantaInstance = {
  destroy: () => void;
};

export default function VantaCloudsBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<VantaInstance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let isActive = true;

    async function initVanta() {
      if (!containerRef.current || effectRef.current) {
        return;
      }

      try {
        const [vantaModule, threeModule] = await Promise.all([
          import("vanta/dist/vanta.clouds.min"),
          import("three"),
        ]);

        if (!containerRef.current || !isActive) {
          return;
        }

        const VantaClouds = vantaModule?.default;
        const three = (threeModule as { default?: typeof import("three") })?.default ?? threeModule;

        if (typeof window !== "undefined") {
          (window as typeof window & { THREE?: typeof import("three") }).THREE = three as typeof import("three");
        }

        if (typeof VantaClouds === "function") {
          effectRef.current = VantaClouds({
            el: containerRef.current,
            THREE: three,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
          });
        }
      } catch (error) {
        console.error("Failed to initialize Vanta CLOUDS background", error);
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
    <div
      id="your-element-selector"
      ref={containerRef}
      className="absolute inset-0 -z-10 bg-[#0f172a]"
      aria-hidden="true"
    />
  );
}
