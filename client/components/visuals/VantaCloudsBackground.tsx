import { useEffect, useRef } from "react";

type VantaInstance = {
  destroy: () => void;
};

export default function VantaCloudsBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<VantaInstance | null>(null);

  useEffect(() => {
    let isActive = true;

    async function initVanta() {
      if (!containerRef.current || effectRef.current) {
        return;
      }

      const [{ default: VantaClouds }, THREE] = await Promise.all([
        import("vanta/dist/vanta.clouds.min"),
        import("three"),
      ]);

      if (!containerRef.current || !isActive) {
        return;
      }

      effectRef.current = VantaClouds({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        skyColor: 0x0f172a,
        cloudColor: 0x38bdf8,
        sunColor: 0x38bdf8,
        cloudShadowColor: 0x0f172a,
        speed: 1.8,
      });
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

  return <div ref={containerRef} className="absolute inset-0 -z-10" aria-hidden="true" />;
}
