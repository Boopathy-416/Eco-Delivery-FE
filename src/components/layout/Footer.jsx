import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        {/* Footer Text */}
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-gray-400 hover:text-blue-500 transition"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-gray-400 hover:text-pink-500 transition"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-gray-400 hover:text-sky-400 transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-gray-400 hover:text-blue-600 transition"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-gray-400 hover:text-red-600 transition"
          >
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
