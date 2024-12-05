import React from 'react';
import { Instagram} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-cyan-500 to-blue-500 text-white py-4">
      <div className="container mx-auto px-4 py-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 ml-10">Journey</h3>
            <h3 className="text-white py-4 ml-10">
              Premium quality hoodies for your journey through life.
            </h3>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mx-auto mb-4 ml-10">Connect With Us</h3>
            <div className="flex space-x-4 ml-10">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="flex flex-col items-center ml-30 text-xl font-bold mb-4">Contact Us</h3>
            <div className="flex flex-col items-center ml-30">
              <img
                src="/images/Journey.png"
                alt="WhatsApp QR Code"
                className="w-32 h-32 bg-white p-2 rounded-lg shadow-lg"
              />
              <p className="mt-2 text-sm text-white-400">Scan to chat with us on WhatsApp</p>
            </div>
          </div>
        </div>
        
        <div className="mt-1 pt-8 border-t border-gray-800 text-center text-white-400">
          <p>© {new Date().getFullYear()} Journey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}