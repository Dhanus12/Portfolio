export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto py-8 grid gap-6 md:grid-cols-2 items-center">
        <div>
          <p className="font-semibold">DHANUS MANI S</p>
          <p className="text-sm text-muted-foreground">
            Java | Spring Boot | MySQL | React
          </p>
        </div>
        <div className="md:justify-self-end text-sm">
          <p className="text-muted-foreground">
            Ramanathapuram, Tamil Nadu, India
          </p>
          <a
            className="block hover:underline"
            href="mailto:dhanusmani43@gmail.com"
          >
            dhanusmani43@gmail.com
          </a>
          <a className="block hover:underline" href="tel:+919360192508">
            +91 93601 92508
          </a>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Dhanus Mani S. All rights reserved.
      </div>
    </footer>
  );
}
