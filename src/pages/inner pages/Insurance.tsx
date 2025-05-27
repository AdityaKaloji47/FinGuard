import React, { useState } from 'react';
import MobileSidebar from '../../components/MobileSidebar';
import health from '../../images/insurance/health insurance.jpg';
import life from '../../images/insurance/life insurance.jpg';
import car from '../../images/insurance/car insurance.png';
import bike from '../../images/insurance/bike insurance.jpg';
import home from '../../images/insurance/home insurance.jpg';
import travel from '../../images/insurance/travel insurance.jpg';

type InsuranceOption = {
  id: string;
  title: string;
  description: string;
  whatIsIt: string;
  whyRequired: string; 
  benefits: string[];
  advantages: string[];
  disadvantages: string[];
  risks: string[];
  image: string;
  moreInfo: { label: string; url: string }[];
};

const insuranceOptions: InsuranceOption[] = [
  {
    id: 'health-insurance',
    title: 'Health Insurance',
    description: 'Health insurance covers medical expenses incurred due to illnesses or injuries. It provides financial protection against high medical costs.',
    whatIsIt: 'Health insurance is a contract between you and an insurance company. You pay premiums, and the insurer covers your medical expenses as per the policy terms.',
    whyRequired: 'Health insurance is essential to protect yourself and your family from unexpected medical expenses. It ensures access to quality healthcare without financial stress.',
    benefits: [
      'Covers hospitalization, surgeries, and treatments.',
      'Cashless treatment at network hospitals.',
      'Tax benefits under Section 80D.',
    ],
    advantages: [
      'Financial security during medical emergencies.',
      'Access to quality healthcare services.',
      'Covers pre and post-hospitalization expenses.',
    ],
    disadvantages: [
      'Premiums can be expensive.',
      'Exclusions for pre-existing conditions.',
      'Claim rejection in case of non-disclosure.',
    ],
    risks: [
      'Policy may not cover all medical conditions.',
      'Waiting periods for certain treatments.',
      'Co-payment clauses may apply.',
    ],
    image : health,
    moreInfo: [
      {
        label: 'Star health insurance',
        url: 'https://www.starhealth.in/',
      },
      {
        label: 'Religare health insurance',
        url: 'https://www.careinsurance.com/',
      },
      {
        label: 'Bajaj Allianz',
        url: 'https://www.bajajallianz.com/',
      },
    ],
  },
  {
    id: 'life-insurance',
    title: 'Life Insurance',
    description: 'Life insurance provides financial security to the policyholder’s family in case of their untimely death. It ensures financial stability for dependents.',
    whatIsIt: 'Life insurance is a contract where the insurer pays a lump sum to the beneficiaries if the policyholder passes away during the policy term.',
    whyRequired: 'Life insurance is crucial to secure your family’s financial future. It helps cover expenses like education, loans, and daily living costs.',
    benefits: [
      'Lump sum payout to beneficiaries.',
      'Tax benefits under Section 80C and 10(10D).',
      'Optional riders for critical illness or disability.',
    ],
    advantages: [
      'Financial protection for dependents.',
      'Savings and investment component in some policies.',
      'Peace of mind for the policyholder.',
    ],
    disadvantages: [
      'Premiums can be costly for high coverage.',
      'No payout if the policyholder outlives the term.',
      'Complex terms and conditions.',
    ],
    risks: [
      'Policy lapse due to non-payment of premiums.',
      'Inadequate coverage for future needs.',
      'Mis-selling by agents.',
    ],
    image: life,
    moreInfo: [
      {
        label: 'LIC(Life Insurance Corporation of India)',
        url: 'https://www.licindia.in/',
      },
      {
        label: 'HDFC Life',
        url: 'https://www.hdfclife.com/',
      },
      {
        label: 'Max Life',
        url: 'https://www.maxlifeinsurance.com/',
      },
    ],
  },
  {
    id: 'car-insurance',
    title: 'Car Insurance',
    description: 'Car insurance provides coverage for damages or losses caused to your vehicle due to accidents, theft, or natural disasters.',
    whatIsIt: 'Car insurance is a policy that protects your vehicle against financial losses due to accidents, theft, or damage. It also covers third-party liabilities.',
    whyRequired: 'Car insurance is mandatory by law and protects you from unexpected repair costs or legal liabilities in case of accidents.',
    benefits: [
      'Covers repair costs for accidental damages.',
      'Third-party liability coverage.',
      'Cashless repairs at network garages.',
    ],
    advantages: [
      'Financial protection against accidents.',
      'Mandatory as per law in many countries.',
      'Optional add-ons like zero depreciation cover.',
    ],
    disadvantages: [
      'High premiums for high-value cars.',
      'Exclusions for wear and tear.',
      'Claim process can be time-consuming.',
    ],
    risks: [
      'Policy may not cover all damages.',
      'Deductibles reduce claim amounts.',
      'Fraudulent claims can lead to higher premiums.',
    ],
    image : car,
    moreInfo: [
      {
        label: 'New india assurance',
        url: 'https://www.newindia.co.in/',
      },
      {
        label: 'Bajaj Allianz Motor insurance',
        url: 'https://www.bajajallianz.com/',
      },
      {
        label: 'ICICI Lombard',
        url: 'https://www.icicilombard.com/',
      },
    ],
  },
  {
    id: 'bike-insurance',
    title: 'Bike Insurance',
    description: 'Bike insurance provides coverage for damages or losses caused to your two-wheeler due to accidents, theft, or natural disasters.',
    whatIsIt: 'Bike insurance is a policy that protects your two-wheeler against financial losses due to accidents, theft, or damage. It also covers third-party liabilities.',
    whyRequired: 'Bike insurance is mandatory by law and protects you from unexpected repair costs or legal liabilities in case of accidents.',
    benefits: [
      'Covers repair costs for accidental damages.',
      'Third-party liability coverage.',
      'Cashless repairs at network garages.',
    ],
    advantages: [
      'Financial protection against accidents.',
      'Mandatory as per law in many countries.',
      'Optional add-ons like zero depreciation cover.',
    ],
    disadvantages: [
      'High premiums for high-value bikes.',
      'Exclusions for wear and tear.',
      'Claim process can be time-consuming.',
    ],
    risks: [
      'Policy may not cover all damages.',
      'Deductibles reduce claim amounts.',
      'Fraudulent claims can lead to higher premiums.',
    ],
    image : bike,
    moreInfo: [
      {
        label: 'New india assurance',
        url: 'https://www.newindia.co.in/',
      },
      {
        label: 'Bajaj Allianz Motor insurance',
        url: 'https://www.bajajallianz.com/',
      },
      {
        label: 'ICICI Lombard',
        url: 'https://www.icicilombard.com/',
      },
    ],
  },
  {
    id: 'home-insurance',
    title: 'Home Insurance',
    description: 'Home insurance protects your home and its contents against damages caused by natural disasters, theft, or accidents.',
    whatIsIt: 'Home insurance is a policy that covers the structure of your home and its contents against damages due to natural disasters, theft, or accidents.',
    whyRequired: 'Home insurance is essential to protect your property and belongings from unexpected damages or losses. It provides financial security for your home.',
    benefits: [
      'Covers structural damages to the home.',
      'Protects personal belongings.',
      'Additional living expenses during repairs.',
    ],
    advantages: [
      'Financial security for your home.',
      'Covers natural disasters like floods and earthquakes.',
      'Optional coverage for valuable items.',
    ],
    disadvantages: [
      'Premiums can be high for high-value homes.',
      'Exclusions for certain natural disasters.',
      'Claim process can be complex.',
    ],
    risks: [
      'Underinsurance may lead to insufficient coverage.',
      'Policy may not cover all types of damages.',
      'Depreciation reduces claim amounts.',
    ],
    image : home,
    moreInfo: [
      {
        label: 'PolicyBazaar',
        url: 'https://www.policybazaar.com',
      },
      {
        label: 'HDFC ERGO',
        url: 'https://www.hdfcergo.com/',
      },
      {
        label: 'Bajaj Allianz',
        url: 'https://www.bajajallianz.com/',
      },
    ],
  },
  {
    id: 'travel-insurance',
    title: 'Travel Insurance',
    description: 'Travel insurance covers unexpected expenses during domestic or international trips, such as medical emergencies, trip cancellations, or lost luggage.',
    whatIsIt: 'Travel insurance is a policy that protects you against financial losses during trips, such as medical emergencies, trip cancellations, or lost luggage.',
    whyRequired: 'Travel insurance is essential for covering unexpected expenses during trips. It ensures peace of mind while traveling.',
    benefits: [
      'Covers medical emergencies during travel.',
      'Reimbursement for trip cancellations.',
      'Compensation for lost or delayed luggage.',
    ],
    advantages: [
      'Financial protection during travel.',
      'Covers medical expenses abroad.',
      '24/7 assistance services.',
    ],
    disadvantages: [
      'Premiums can be high for long trips.',
      'Exclusions for pre-existing medical conditions.',
      'Claim process can be time-consuming.',
    ],
    risks: [
      'Policy may not cover all travel-related risks.',
      'Exclusions for adventure activities.',
      'Limited coverage for high-risk destinations.',
    ],
    image: travel,
    moreInfo: [
      {
        label: 'HDFC ERGO',
        url: 'https://www.hdfcergo.com/',
      },
      {
        label: 'Bajaj Allianz',
        url: 'https://www.bajajallianz.com/',
      },
      {
        label: 'Reliance general insurance',
        url: 'https://www.reliancegeneral.co.in/',
      },
    ],
  },
];

const Insurance: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<InsuranceOption | null>(null);

  const handleOptionClick = (option: InsuranceOption) => {
    setSelectedOption(option);
  };

  const handleCloseDetails = () => {
    setSelectedOption(null);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:hidden mb-4">
          <MobileSidebar />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Insurance Plans</h1>

        {/* Introduction Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Insurance?</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Insurance is a way to protect yourself and your assets from financial losses. It provides coverage for unexpected events like accidents, illnesses, or damages.
          </p>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Why is Insurance Required?</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Insurance is essential to safeguard your financial future. It helps cover unexpected expenses and provides peace of mind during emergencies.
          </p>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Benefits of Insurance</h3>
          <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 mb-4">
            <li>Financial protection against unexpected events.</li>
            <li>Peace of mind for you and your family.</li>
            <li>Tax benefits under various sections.</li>
          </ul>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Risks of Insurance</h3>
          <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
            <li>Policy exclusions may limit coverage.</li>
            <li>Premiums can be expensive for high coverage.</li>
            <li>Claim rejection in case of non-disclosure.</li>
          </ul>
        </div>

        {/* Insurance Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insuranceOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <img
                src={option.image}
                alt={option.title}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{option.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{option.description}</p>
            </div>
          ))}
        </div>

        {/* Popup for Detailed Information */}
        {selectedOption && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedOption.title}</h2>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">What is {selectedOption.title}?</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedOption.whatIsIt}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Why is it Required?</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedOption.whyRequired}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Benefits</h3>
                  <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
                    {selectedOption.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Advantages</h3>
                  <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
                    {selectedOption.advantages.map((advantage, index) => (
                      <li key={index}>{advantage}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Disadvantages</h3>
                  <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
                    {selectedOption.disadvantages.map((disadvantage, index) => (
                      <li key={index}>{disadvantage}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Risks</h3>
                  <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
                    {selectedOption.risks.map((risk, index) => (
                      <li key={index}>{risk}</li>
                    ))}
                  </ul>
                </div>

                {/* More Info Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">More Info</h3>
                  <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
                    {selectedOption.moreInfo.map((info, index) => (
                      <li key={index}>
                        <a
                          href={info.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {info.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insurance;