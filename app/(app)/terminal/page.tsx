"use client"
import React from 'react';

const Card = () => {
  return (
    <div className="p-4 overflow-hidden border border-gray-300 rounded-lg bg-gray-200/50 backdrop-blur-md min-w-[344px]">
      <div className="flex flex-col gap-4 relative z-10 border border-gray-600 rounded-md overflow-hidden">
        <div className="flex flex-col font-mono">
          <div className="flex items-center justify-between min-h-[40px] px-3 bg-gray-800 rounded-t-md">
            <p className="flex items-center gap-2 h-10 select-none font-semibold text-gray-400 truncate">
              <svg width="16px" height="16px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="currentColor" fill="none">
                <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
              </svg>
              Terminal
            </p>
            <button className="flex items-center justify-center p-1 border border-gray-400 ml-auto rounded-md bg-gray-800 text-gray-400 cursor-pointer" tabIndex={-1} type="button">
              <svg width="16px" height="16px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="currentColor" fill="none">
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col relative rounded-b-md overflow-x-auto p-4 leading-5 text-white bg-black whitespace-nowrap">
            <pre className="flex flex-row items-center whitespace-pre bg-transparent overflow-hidden box-border text-lg">
              {"          "}<code className="text-gray-600">- </code>{"\n"}
              {"          "}<code className="text-pink-500">npx </code>{"\n"}
              <code className="cmd" data-cmd="create-react-app@latest " />{"\n"}
              {"        "}
            </pre>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes inputs {
          0%, 100% { width: 0; }
          10%, 90% { width: 58px; }
          30%, 70% { width: 215px; max-width: max-content; }
        }
        @keyframes cursor {
          50% { border-right-color: transparent; }
        }
        @keyframes blinking {
          20%, 80% { transform: scaleY(1); }
          50% { transform: scaleY(0); }
        }
        .cmd::before {
          content: attr(data-cmd);
          position: relative;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          background-color: transparent;
          animation: inputs 8s steps(22) infinite;
        }
        .cmd::after {
          content: "";
          position: relative;
          display: block;
          height: 100%;
          overflow: hidden;
          background-color: transparent;
          border-right: 0.15em solid #e34ba9;
          animation: cursor 0.5s step-end infinite alternate, blinking 0.5s infinite;
        }
      `}</style>
    </div>
  );
}

export default Card;