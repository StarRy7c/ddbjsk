import React from 'react';

export const About: React.FC = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
      <h1 className="text-4xl font-bold font-serif text-gray-900 mb-6">About CricPulse</h1>
      <div className="prose prose-emerald text-gray-600">
        <p className="lead text-xl">
          CricPulse was born from a simple idea: cricket is not just a sport; it's an emotion that binds millions.
        </p>
        <p>
          Founded in 2024, our mission is to provide the most accurate, timely, and engaging cricket content on the web. We believe in quality journalism, data-driven analysis, and the magic of storytelling.
        </p>
        <h3 className="text-gray-900 font-bold mt-6 mb-2">Our Vision</h3>
        <p>
          To be the global dugout for cricket fans—a place where you don't just read the news, you feel the game. From the dusty maidans of Mumbai to the lush greens of Lord's, we cover it all.
        </p>
        <h3 className="text-gray-900 font-bold mt-6 mb-2">The Team</h3>
        <p>
          We are a diverse team of cricket enthusiasts, former players, and tech wizards working round the clock to bring you live scores, match reports, and in-depth player profiles.
        </p>
      </div>
    </div>
  </div>
);

export const Privacy: React.FC = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
     <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
      <h1 className="text-4xl font-bold font-serif text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose prose-sm prose-emerald text-gray-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          At CricPulse, we value your privacy. This policy explains how we handle your data.
        </p>
        
        <h3 className="text-lg font-bold text-gray-800 mt-6">1. Information We Collect</h3>
        <p>
          We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, subscribe to the newsletter, and in connection with other activities.
        </p>
        
        <h3 className="text-lg font-bold text-gray-800 mt-6">2. Cookies</h3>
        <p>
          Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them.
        </p>

        <h3 className="text-lg font-bold text-gray-800 mt-6">3. How We Use Information</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>To personalize user experience</li>
          <li>To improve our Site</li>
          <li>To send periodic emails (newsletters)</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 mt-6">4. Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at privacy@cricpulse.com.
        </p>
      </div>
    </div>
  </div>
);
