import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-14 grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
        {/* Brand */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/icons/logo_voletra.png"
              alt="Voletra"
              width={32}
              height={32}
              style={{ width: 'auto' }}
            />
            <span className="font-bold text-lg tracking-wide">VOLETRA</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Platform yang menghubungkan relawan dengan misi sosial di seluruh
            Indonesia. Bersama kita ciptakan dampak nyata.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-base mb-4">Navigation</h4>
          <ul className="flex flex-col gap-3 text-gray-300 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/peta-misi"
                className="hover:text-white transition-colors"
              >
                Mission
              </Link>
            </li>
            <li>
              <Link
                href="/edukasi"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-base mb-4">Contact</h4>
          <ul className="flex flex-col gap-3 text-gray-300 text-sm">
            <li>Voletra@gmail.com</li>
            <li>0812345678910</li>
            <li>Jakarta, Indonesia</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold text-base mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#">
              <Image
                src="/icons/instagram.png"
                className="rounded-lg"
                width={25}
                height={25}
                alt="IG"
              />
            </a>
            <a href="#">
              <Image
                src="/icons/twiter.png"
                className="rounded-lg"
                width={25}
                height={25}
                alt="X"
              />
            </a>
            <a href="#">
              <Image
                src="/icons/facebook.svg"
                width={25}
                height={25}
                alt="FB"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-gray-400 text-sm">
        Copyright © 2026 Voletra. All Rights Reserved
      </div>
    </footer>
  );
}
