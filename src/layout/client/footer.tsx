import React from 'react'

const ClientFooter = () => {
  return (
     <footer className="w-full bg-[#053D29] text-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto flex justify-between py-14">
          {/* Cột 1 - Giới thiệu & Social Media */}
          <div className="max-w-[300px]">
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-4 mt-4">
              <img src="img/facebook.png" alt="Facebook" className="h-5" />
              <img src="img/twitter.png" alt="Twitter" className="h-5" />
              <img src="img/linkedin.png" alt="LinkedIn" className="h-5" />
              <img src="img/twitter.png" alt="YouTube" className="h-5" />
              <img src="img/linkedin.png" alt="Instagram" className="h-5" />
            </div>
          </div>

          {/* Cột 2 - Um */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Um</h4>
            <ul className="space-y-2 text-sm">
              <li>Kontaktiere uns</li>
              <li>Über uns</li>
              <li>Karriere</li>
              <li>Unternehmensinformationen</li>
            </ul>
          </div>

          {/* Cột 3 - Hilfe */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Hilfe</h4>
            <ul className="space-y-2 text-sm">
              <li>Unsere Produzenten</li>
              <li>Zahlung</li>
              <li>Versand</li>
              <li>Stornierung & Rückgabe</li>
              <li>Verstoß Melden</li>
            </ul>
          </div>

          {/* Cột 4 - Politik */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Politik</h4>
            <ul className="space-y-2 text-sm">
              <li>Rücknahmegarantie</li>
              <li>Nutzungsbedingungen</li>
              <li>Sicherheit</li>
              <li>Privatsphäre</li>
              <li>Seitenverzeichnis</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="bg-[#062F21] text-[#E5E7EB] py-4 flex justify-between items-center px-10">
          <span className="text-sm">2023 hood.de, Inc.</span>

          {/* Payment Icons */}
          <div className="flex gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="MasterCard"
              className="h-6"
            />
            <img
              src="https://th.bing.com/th/id/OIP.ZvTUoMqAhkKCo0wlrZgozgHaHa?rs=1&pid=ImgDetMain"
              alt="Visa"
              className="h-6"
            />
            <img
              src="https://th.bing.com/th/id/OIP.Y6-wJg-HiIJqiI8nok881AHaFr?w=208&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="American Express"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="MasterCard"
              className="h-6"
            />
          </div>

          {/* Scroll to top */}
          <button className="text-sm flex items-center gap-1">
            Scroll to top <span>⬆</span>
          </button>
        </div>
      </footer>
  )
}

export default ClientFooter