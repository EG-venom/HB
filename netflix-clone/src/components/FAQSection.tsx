import type React from 'react';
import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        className="w-full bg-[#2d2d2d] hover:bg-[#414141] p-6 text-left flex items-center justify-between transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-2xl font-medium">{question}</span>
        <svg
          className={`w-8 h-8 transform transition-transform ${isOpen ? 'rotate-45' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M5 12H19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="bg-[#2d2d2d] p-6 mt-px text-lg">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "What is Netflix?",
      answer: (
        <>
          <p className="mb-4">
            Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.
          </p>
          <p>
            You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!
          </p>
        </>
      )
    },
    {
      question: "How much does Netflix cost?",
      answer: (
        <p>
          Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $7.99 to $15.99 a month. No extra costs, no contracts.
        </p>
      )
    },
    {
      question: "Where can I watch?",
      answer: (
        <>
          <p className="mb-4">
            Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
          </p>
          <p>
            You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.
          </p>
        </>
      )
    },
    {
      question: "How do I cancel?",
      answer: (
        <p>
          Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.
        </p>
      )
    },
    {
      question: "What can I watch on Netflix?",
      answer: (
        <p>
          Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.
        </p>
      )
    },
    {
      question: "Is Netflix good for kids?",
      answer: (
        <>
          <p className="mb-4">
            The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.
          </p>
          <p>
            Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don't want kids to see.
          </p>
        </>
      )
    }
  ];

  return (
    <section className="py-16 px-4 bg-netflix-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">Frequently Asked Questions</h2>

        <div className="mt-8">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg mb-4">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full md:w-96 px-4 py-4 bg-black/40 border border-[#333] rounded text-white placeholder-[#8c8c8c] focus:outline-none focus:border-white"
            />
            <button className="w-full md:w-auto bg-netflix-red hover:bg-[#f40612] text-white font-medium text-xl px-8 py-3 rounded flex items-center justify-center">
              Get Started
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2"
              >
                <path d="M8.5 5L15.5 12L8.5 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
