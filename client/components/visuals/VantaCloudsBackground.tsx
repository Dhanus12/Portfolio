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

      try {
        const [{ default: VantaClouds }, THREE] = await Promise.all([
          import("vanta/dist/vanta.clouds.min"),
          import("three"),
        ]);

        if (!containerRef.current || !isActive) {
          return;
        }

        const three = (THREE as { default?: unknown })?.default ?? THREE;

        effectRef.current = VantaClouds({
          el: containerRef.current,
          THREE: three,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
        });
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
      className="absolute inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
