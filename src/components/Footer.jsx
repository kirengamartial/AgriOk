import React from 'react';
import post1 from '../../public/post-1-175x175.jpg.png'
import post2 from '../../public/post-2-175x175.jpg.png'
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const aboutText = "Lorem ipsum dolor adipiscing elit sed do eiusmod et dolore magna aliqua enim minim veniam";
  
  const servicesLinks = [
    "Agricultural Produce",
    "Organic Vegetables",
    "Fresh Fish",
    "Cow Milk & Meat",
    "Modern Equipment",
    "Natural Waters"
  ];

  const companyLinks = [
    "Company History",
    "Latest News",
    "News & Career",
    "Meet The Team",
    "Setting & Privacy",
    "About Us"
  ];

  const newsFeeds = [
    {
      id: 1,
      image: post1,
      title: "Us Climate Change Mitigation Potential"
    },
    {
      id: 2,
      image: post2,
      title: "Organic food export can transform economy"
    }
  ];

  const socialLinks = [
    { 
      icon: <Twitter size={20} />, 
      href: "#",
      bgColor: "bg-yellow-400"
    },
    { 
      icon: <Facebook size={20} />, 
      href: "#",
      bgColor: "bg-gray-800"
    },
    { 
      icon: <Instagram size={20} />, 
      href: "#",
      bgColor: "bg-gray-800"
    },
    { 
      icon: <Linkedin size={20} />, 
      href: "#",
      bgColor: "bg-gray-800"
    }
  ];

  return (
    <footer className="bg-[#1c1c1c] text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm mb-6">{aboutText}</p>
            <div>
              <h4 className="text-white text-sm font-semibold mb-3">Follow On</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`${social.bgColor} p-2 rounded-full hover:opacity-80 transition-opacity`}
                  >
                    <span className="text-white">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Rest of the footer code remains the same */}
          {/* Services Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {servicesLinks.map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors flex items-center"
                  >
                    <span className="mr-2">›</span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors flex items-center"
                  >
                    <span className="mr-2">›</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* News Feeds Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">News Feeds</h3>
            <div className="space-y-4">
              {newsFeeds.map((news) => (
                <div key={news.id} className="flex space-x-4">
                  <div className="flex-shrink-0 w-20 h-16">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors line-clamp-2"
                    >
                      {news.title}
                    </a>
                  </div>
                </div>
              ))}
              <a href="#" className="text-sm text-gray-400 hover:text-white uppercase tracking-wider">
                View More News
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;