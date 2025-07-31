import React, { useEffect, useState } from 'react';
import divider from '/images/pattern-divider-desktop.svg';
import mobileDivider from '/images/pattern-divider-mobile.svg';
import dice from '/images/icon-dice.svg';

const App = () => {
  const [advice, setAdvice] = useState('');
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.adviceslip.com/advice', { cache: 'no-cache' });
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      setAdvice('Failed to fetch advice');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className='
      min-h-screen 
      bg-[#202632]
      px-5 py-10
      flex items-center justify-center
    '>
      <div className='
        bg-[#313A49]
        rounded-md
        text-[#CDE2E9] text-2xl font-extrabold
        
        px-5 py-10 md:px-10 md:py-16
        
        flex flex-col text-center 
        
        max-w-md md:max-w-2xl w-full relative
        min-h-[320px] md:min-h-[420px] 
      '>
        {/* Top text */}
        <p className='text-[#53FFAB] text-sm 
                      tracking-[0.2em] 
                      mb-12 md:mb-19 '>ADVICE #{count}</p>
        
        {/* Advice */}
        <p className='min-h-[70px] mb-4'>
          {loading ? 'Loading advice...' : `"${advice}"`}
        </p>

        {/* line */}
        <div className='flex justify-center my-4'>
          <img src={divider} alt="Divider" className="hidden md:block" />
          <img src={mobileDivider} alt="Mobile Divider" className="block md:hidden" />
        </div>

        <button
          onClick={() => {
            getAdvice();
            setCount(prev => prev + 1);
          }}
          className='
            bg-[#53FFAB] rounded-full p-5
            transition duration-300
            shadow-none
            hover:shadow-[0_0_20px_rgba(83,255,171,0.6)]
            hover:cursor-pointer
            absolute left-1/2 transform -translate-x-1/2 bottom-[-25px]
          '
        >
          <img src={dice} alt="dice image" className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
};

export default App;
