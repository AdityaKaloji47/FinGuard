import React, { useState } from 'react';
import MobileSidebar from '../../components/MobileSidebar';
import bonds from '../../images/investment/bonds.jpg';
import sip from '../../images/investment/mutual funds(SIP).jpg';
import stocks from '../../images/investment/stocks.jpg';
import etfs from '../../images/investment/etfs.jpg';
import ppf from '../../images/investment/ppf.jpg';
import fd from '../../images/investment/fd.jpg';
import commodity from '../../images/investment/commodity.jpg';
import savingsaccount from '../../images/investment/savings account.jpg';
import ssy from '../../images/investment/sukanya Samriddhi Yojana.jpg';
import realestate from '../../images/investment/real estate.jpg';

type InvestmentOption = {
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

const investmentOptions: InvestmentOption[] = [
  {
    id: 'bonds',
    title: 'Bonds',
    description: 'Bonds are loans you give to governments or companies. In return, they pay you interest over time.',
    whatIsIt: 'Bonds are like IOUs. You lend money to a government or company, and they promise to pay you back with interest. It’s a way to earn steady income without taking too much risk.',
    whyRequired: 'Bonds are a safe way to earn regular income and protect your money. They are ideal for people who want stable returns without the ups and downs of the stock market.',
    benefits: [
      'Earn regular interest payments.',
      'Safer than stocks.',
      'Helps diversify your investments.',
    ],
    advantages: [
      'Predictable income: You know how much interest you’ll earn.',
      'Less risky than stocks: Bonds are more stable.',
      'Tax benefits: Some bonds offer tax-free interest.',
    ],
    disadvantages: [
      'Lower returns compared to stocks: Bonds usually grow slower.',
      'Interest rate risk: If interest rates rise, bond prices can fall.',
      'Inflation risk: Rising prices can reduce the value of your returns.',
    ],
    risks: [
      'Default risk: The borrower may fail to repay your money.',
      'Interest rate changes: Bond prices drop when interest rates rise.',
      'Liquidity risk: Some bonds are hard to sell quickly.',
    ],
    image: bonds,
    moreInfo: [
      {
        label: 'RBI Floating Rate Bonds (7.15% Interest)',
        url: 'https://www.rbi.org.in',
      },
      {
        label: 'NSE Corporate Bonds',
        url: 'https://www.nseindia.com',
      },
      {
        label: 'IRFC Tax-Free Bonds',
        url: 'https://www.irfc.nic.in',
      },
    ],
  },
  {
    id: 'mutual-funds',
    title: 'Mutual Funds (SIP)',
    description: 'Mutual funds pool money from many investors to buy stocks, bonds, or other assets. SIP allows you to invest small amounts regularly.',
    whatIsIt: 'Mutual funds are managed by professionals who invest your money in a mix of stocks, bonds, or other assets. SIP (Systematic Investment Plan) lets you invest small amounts regularly instead of a lump sum.',
    whyRequired: 'Mutual funds are great for people who want to invest but don’t have the time or knowledge to pick individual stocks or bonds. SIP makes it easy to invest regularly.',
    benefits: [
      'Professional management: Experts handle your investments.',
      'Diversification: Your money is spread across many assets.',
      'Flexibility: SIP lets you invest small amounts regularly.',
    ],
    advantages: [
      'Affordable: You can start with small amounts.',
      'Diversified: Reduces risk by spreading investments.',
      'Liquidity: You can withdraw your money easily.',
    ],
    disadvantages: [
      'Fees: Mutual funds charge management fees.',
      'No control: You can’t choose specific investments.',
      'Market risk: Returns depend on market performance.',
    ],
    risks: [
      'Market volatility: Prices can go up and down.',
      'Fund manager risk: Poor decisions can affect returns.',
      'Liquidity risk: Some funds may take time to sell.',
    ],
    image: sip,
    moreInfo: [
      {
        label: 'SBI Mutual Fund',
        url: 'https://www.sbimf.com',
      },
      {
        label: 'HDFC Mutual Fund',
        url: 'https://www.hdfcfund.com',
      },
      {
        label: 'ICICI Prudential Mutual Fund',
        url: 'https://www.icicipruamc.com',
      },
    ],
  },
  {
        id: 'stocks',
        title: 'Stocks',
        description: 'Stocks represent ownership in a company. When you buy stocks, you own a small part of that company.',
        whatIsIt: 'Stocks are shares of a company. When you buy stocks, you become a part-owner of the company. If the company does well, the value of your stocks can grow.',
        whyRequired: 'Stocks are for people who want high returns and are willing to take risks. They help you grow your wealth over time.',
        benefits: [
          'High potential returns: Stocks can grow a lot in value.',
          'Ownership: You own a part of the company.',
          'Dividends: Some companies pay you a share of their profits.',
        ],
        advantages: [
          'Liquidity: You can buy and sell stocks easily.',
          'Growth potential: Stocks can grow faster than other investments.',
          'Diversification: You can invest in different sectors.',
        ],
        disadvantages: [
          'High risk: Stock prices can go up and down quickly.',
          'Requires research: You need to understand the companies you invest in.',
          'No guarantees: Returns are not guaranteed.',
        ],
        risks: [
          'Market risk: Stock prices can drop suddenly.',
          'Company risk: Poor performance can reduce stock value.',
          'Economic risk: Recessions can hurt stock prices.',
        ],
        image: stocks,
        moreInfo: [
          {
            label: 'NSE India (National Stock Exchange)',
            url: 'https://www.nseindia.com',
          },
          {
            label: 'BSE India (Bombay Stock Exchange)',
            url: 'https://www.bseindia.com',
          },
          {
            label: 'Zerodha (Stockbroker)',
            url: 'https://zerodha.com',
          },
        ],
      },
      {
        id: 'etfs',
        title: 'ETFs',
        description: 'ETFs are investment funds that trade on stock exchanges, similar to stocks.',
        whatIsIt: 'ETFs (Exchange-Traded Funds) are funds that track the performance of a specific index, commodity, or basket of assets. They trade on stock exchanges like stocks.',
        whyRequired: 'ETFs are required for low-cost, diversified exposure to various markets and sectors. They are ideal for investors who want flexibility and low fees.',
        benefits: [
          'Diversification: Spread your money across many assets.',
          'Low cost: ETFs have lower fees than mutual funds.',
          'Flexibility: Trade ETFs throughout the day.',
        ],
        advantages: [
          'Transparency: You know what’s in the ETF.',
          'Tax efficiency: ETFs are more tax-friendly than mutual funds.',
          'Liquidity: Easy to buy and sell on stock exchanges.',
        ],
        disadvantages: [
          'Trading fees: You may pay fees to buy and sell ETFs.',
          'Tracking error: ETFs may not perfectly match the index they track.',
          'Liquidity risk: Some ETFs are hard to sell quickly.',
        ],
        risks: [
          'Market risk: Prices can go up and down.',
          'Tracking error risk: The ETF may not match its index.',
          'Liquidity risk: Some ETFs are hard to sell quickly.',
        ],
        image: etfs,
        moreInfo: [
          {
            label: 'Nippon India ETF',
            url: 'https://mf.nipponindiaim.com',
          },
          {
            label: 'ICICI Prudential ETF',
            url: 'https://www.icicipruamc.com',
          },
          {
            label: 'HDFC Mutual Fund ETFs',
            url: 'https://www.hdfcfund.com',
          },
        ],
      },
      {
        id: 'ppf',
        title: 'Public Provident Fund (PPF)',
        description: 'PPF is a long-term savings scheme backed by the Government of India, offering tax benefits and a fixed interest rate.',
        whatIsIt: 'PPF is a government-backed savings scheme that offers tax benefits and a fixed interest rate. It’s a safe way to save for the long term.',
        whyRequired: 'PPF is required for safe, long-term savings with tax benefits. It’s ideal for people who want to save for retirement or other long-term goals.',
        benefits: [
          'Tax-free returns: Your earnings are tax-free.',
          'Safe and secure: Backed by the government.',
          'Long-term wealth creation: Grow your savings over time.',
        ],
        advantages: [
          'Tax benefits: Deductions under Section 80C.',
          'Guaranteed returns: The government guarantees your returns.',
          'Low risk: Very safe investment.',
        ],
        disadvantages: [
          'Long lock-in period: You can’t withdraw for 15 years.',
          'Limited liquidity: Hard to access your money before maturity.',
          'Fixed interest rate: May not beat inflation.',
        ],
        risks: [
          'Interest rate risk: Rates may change over time.',
          'Liquidity risk: Hard to access your money early.',
          'Inflation risk: Returns may not keep up with rising prices.',
        ],
        image: ppf,
        moreInfo: [
          {
            label: 'SBI PPF Account ',
            url: 'https://www.onlinesbi.com',
          },
          {
            label: 'ICICI Bank PPF Account',
            url: 'https://www.icicibank.com',
          },
          {
            label: 'HDFC Bank PPF Account',
            url: 'https://www.hdfcbank.com',
          },
        ],
      },
      {
        id: 'fd',
        title: 'Fixed Deposit (FD)',
        description: 'A fixed deposit is a financial instrument provided by banks or NBFCs which offers investors a higher rate of interest than a regular savings account.',
        whatIsIt: 'FDs are financial instruments where you deposit a lump sum with a bank or NBFC for a fixed tenure at a predetermined interest rate.',
        whyRequired: 'FDs are required for guaranteed returns and capital preservation. They are ideal for people who want safe and predictable returns.',
        benefits: [
          'Guaranteed returns: You know exactly how much you’ll earn.',
          'Flexible tenure: Choose a duration that suits your needs.',
          'Safe and secure: Backed by banks or NBFCs.',
        ],
        advantages: [
          'Predictable returns: You know your interest rate upfront.',
          'Low risk: Very safe investment.',
          'Tax benefits: Senior citizens get higher interest rates.',
        ],
        disadvantages: [
          'Lower returns: FDs usually grow slower than stocks.',
          'Penalty on withdrawal: You may lose interest if you withdraw early.',
          'Interest rate risk: Rates may change over time.',
        ],
        risks: [
          'Inflation risk: Returns may not keep up with rising prices.',
          'Liquidity risk: Hard to access your money before maturity.',
          'Interest rate risk: Rates may change over time.',
        ],
        image: fd,
        moreInfo: [
          {
            label: 'SBI Fixed Deposit',
            url: 'https://www.onlinesbi.com',
          },
          {
            label: 'HDFC Bank Fixed Deposit',
            url: 'https://www.icicibank.com',
          },
          {
            label: 'CICI Bank Fixed Deposit',
            url: 'https://www.icicibank.com',
          },
        ],
      },
      {
        id: 'commodity',
        title: 'Commodity',
        description: 'Commodity trading involves buying and selling raw materials like gold, silver, crude oil, and agricultural products.',
        whatIsIt: 'Commodity trading involves investing in raw materials like gold, silver, crude oil, or agricultural products. Prices depend on supply and demand.',
        whyRequired: 'Commodity trading is required for portfolio diversification and hedging against inflation. It’s ideal for people who want to invest in physical assets.',
        benefits: [
          'Portfolio diversification: Spread your investments.',
          'Hedge against inflation: Commodities often rise with inflation.',
          'Potential for high returns: Prices can rise quickly.',
        ],
        advantages: [
          'Liquidity: Major commodities like gold are easy to trade.',
          'Transparency: Prices are based on global supply and demand.',
          'Hedging: Protects against inflation and currency risks.',
        ],
        disadvantages: [
          'High volatility: Prices can change quickly.',
          'Requires knowledge: You need to understand global markets.',
          'Storage costs: Physical commodities may need storage.',
        ],
        risks: [
          'Market risk: Prices can drop suddenly.',
          'Geopolitical risk: Conflicts can affect supply and prices.',
          'Liquidity risk: Some commodities are hard to sell quickly.',
        ],
        image: commodity,
        moreInfo: [
          {
            label: 'Sovereign Gold Bonds (RBI)',
            url: 'https://rbi.org.in',
          },
          {
            label: 'MMTC-PAMP Digital Gold',
            url: 'https://www.mmtcpamp.com',
          },
          {
            label: 'Paytm Digital Gold',
            url: 'https://paytm.com/gold',
          },
        ],
      },
      {
        id: 'savings-account',
        title: 'Savings Account',
        description: 'A savings account is a deposit account held at a bank that provides principal security and a modest interest rate.',
        whatIsIt: 'A savings account is a basic bank account where you can deposit money, earn interest, and withdraw funds as needed.',
        whyRequired: 'Savings accounts are required for easy access to funds and safe storage of money. They are ideal for emergency funds or short-term savings.',
        benefits: [
          'Easy access to funds: Withdraw money anytime.',
          'Low risk: Your money is safe in the bank.',
          'Interest on deposits: Earn a small amount of interest.',
        ],
        advantages: [
          'Liquidity: Access your money anytime.',
          'Safety: Your money is protected by the bank.',
          'Convenience: Easy to open and manage.',
        ],
        disadvantages: [
          'Low interest rates: Returns are usually very low.',
          'Inflation risk: Returns may not keep up with rising prices.',
          'Limited growth potential: Not ideal for long-term wealth creation.',
        ],
        risks: [
          'Inflation risk: Returns may not keep up with rising prices.',
          'Interest rate risk: Rates may change over time.',
          'Bank risk: Rare, but banks can fail.',
        ],
        image: savingsaccount,
        moreInfo: [
          {
            label: 'SBI Savings Account (public)',
            url: 'https://www.onlinesbi.com',
          },
          {
            label: 'Punjab National Bank (PNB) Savings Account(public)',
            url: 'https://www.pnbindia.in',
          },
          {
            label: 'HDFC Bank Savings Account(private)',
            url: 'https://www.hdfcbank.com',
          },
          {
            label: 'ICICI Bank Savings Account(private)',
            url: 'https://www.icicibank.com',
          },
        ],
      },
      {
        id: 'sukanya-samriddhi-yojana',
        title: 'Sukanya Samriddhi Yojana',
        description: 'A government-backed savings scheme aimed at the welfare of girl children, offering tax benefits and high interest rates.',
        whatIsIt: 'Sukanya Samriddhi Yojana is a government-backed savings scheme designed to promote the welfare of girl children. It offers high interest rates and tax benefits.',
        whyRequired: 'This scheme is required for long-term savings for girl children with tax benefits. It’s ideal for parents planning for their daughter’s future.',
        benefits: [
          'Tax benefits: Deductions under Section 80C.',
          'High interest rates: Earn more than regular savings accounts.',
          'Long-term savings: Grow your money over time.',
        ],
        advantages: [
          'Guaranteed returns: Backed by the government.',
          'Low risk: Very safe investment.',
          'Tax-free maturity: The final amount is tax-free.',
        ],
        disadvantages: [
          'Long lock-in period: You can’t withdraw until the girl turns 18.',
          'Limited to two accounts per family: Only for girl children.',
          'Penalty on withdrawal: Early withdrawal incurs penalties.',
        ],
        risks: [
          'Interest rate risk: Rates may change over time.',
          'Liquidity risk: Hard to access your money early.',
          'Inflation risk: Returns may not keep up with rising prices.',
        ],
        image: ssy,
        moreInfo: [
          {
            label: 'India Post (Post Office SSY Account)',
            url: 'https://www.indiapost.gov.in',
          },
          {
            label: 'SBI Sukanya Samriddhi Yojana',
            url: 'https://www.onlinesbi.sbi',
          },
          {
            label: 'HDFC Bank SSY',
            url: 'https://www.hdfcbank.com',
          },
          {
            label: 'ICICI Bank SSY',
            url: 'https://www.icicibank.com',
          },
        ],
      },
      {
        id: 'real-estate',
        title: 'Real Estate',
        description: 'Real estate investment involves the purchase, ownership, management, rental, or sale of real estate for profit.',
        whatIsIt: 'Real estate involves investing in physical properties like land, residential, or commercial buildings. You can earn rental income or sell the property for profit.',
        whyRequired: 'Real estate is required for diversification, passive income, and long-term wealth creation. It’s ideal for people who want to invest in physical assets.',
        benefits: [
          'Potential for high returns: Property values can rise significantly.',
          'Tangible asset: You own a physical property.',
          'Portfolio diversification: Spread your investments.',
        ],
        advantages: [
          'Appreciation: Property values can grow over time.',
          'Rental income: Earn regular income from tenants.',
          'Tax benefits: Deductions on mortgage interest and property taxes.',
        ],
        disadvantages: [
          'High initial investment: Requires a lot of money upfront.',
          'Liquidity issues: Hard to sell quickly.',
          'Maintenance costs: Ongoing expenses for repairs and upkeep.',
        ],
        risks: [
          'Market risk: Property values can drop.',
          'Liquidity risk: Hard to sell quickly.',
          'Regulatory risk: Changes in laws can affect property value.',
        ],
        image: realestate,
        moreInfo: [
          {
            label: 'MagicBricks (Buy/Sell Properties)',
            url: 'https://www.magicbricks.com',
          },
          {
            label: '99Acres (Real Estate Listings)',
            url: 'https://www.99acres.com',
          },
          {
            label: 'NoBroker (Property Buying Without Agents)',
            url: 'https://www.nobroker.in',
          },
        ],
      },
];

const Investment: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<InvestmentOption | null>(null);

  const handleOptionClick = (option: InvestmentOption) => {
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

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Investment</h1>

        {/* Introduction Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Investment?</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Investment refers to the process of allocating resources, usually money, with the expectation of generating income or profit. It involves committing capital to an asset or venture with the hope of achieving a financial return over time.
          </p>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Why is Investment Required?</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Investment is essential for wealth creation, beating inflation, achieving financial goals, and securing a stable financial future. It helps individuals grow their savings and prepare for uncertainties.
          </p>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Benefits of Investment</h3>
          <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 mb-4">
            <li>Wealth creation over time.</li>
            <li>Protection against inflation.</li>
            <li>Achieving financial goals like retirement, education, or buying a home.</li>
          </ul>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Risks of Investment</h3>
          <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
            <li>Market risk: The value of investments can fluctuate.</li>
            <li>Liquidity risk: Some investments may be hard to sell quickly.</li>
            <li>Inflation risk: Returns may not keep up with inflation.</li>
          </ul>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Investment Plans</h1>

        {/* Investment Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {investmentOptions.map((option) => (
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

        {/* Groww Link at the Bottom */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Start Your Investment, with{' '}
            <a
              href="https://groww.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Groww
            </a>
            .
          </p>
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

                {/* Warning Section */}
                <div className="bg-red-100 dark:bg-red-900 p-4 rounded-md">
                  <p className="text-sm text-red-700 dark:text-red-100">
                    ⚠️ Warning: Investments are subject to market risks. Please read all scheme-related documents carefully before investing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Investment;