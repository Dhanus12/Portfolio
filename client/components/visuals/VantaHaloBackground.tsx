import { useEffect, useRef } from "react";

type VantaInstance = {
  destroy: () => void;
};

export default function VantaHaloBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<VantaInstance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isActive = true;

    async function initVanta() {
      if (!containerRef.current || effectRef.current) return;
      try {
        const [vantaModule, threeModule] = await Promise.all([
          import("vanta/dist/vanta.halo.min"),
          import("three"),
        ]);
        if (!containerRef.current || !isActive) return;
        const VantaHalo = vantaModule?.default as any;
        const three = (threeModule as { default?: typeof import("three") })?.default ?? threeModule;

        if (typeof window !== "undefined") {
          (window as typeof window & { THREE?: typeof import("three") }).THREE = three as typeof import("three");
        }

        if (typeof VantaHalo === "function") {
          effectRef.current = VantaHalo({
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
        console.error("Failed to initialize Vanta HALO background", error);
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
    <div id="contact-vanta" ref={containerRef} className="absolute inset-0 -z-10" aria-hidden="true" />
  );
}




