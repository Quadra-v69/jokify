import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCcw, Github, ArrowLeft, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Insult {
  insult: string;
}

interface AdultJoke {
  setup?: string;
  delivery?: string;
  joke?: string;
}

function InsultPage() {
  const [insult, setInsult] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [isJokeMode, setIsJokeMode] = useState(true);
  const [joke, setJoke] = useState<AdultJoke | null>(null);
  const [showPunchline, setShowPunchline] = useState(false);

  const fetchInsult = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://insult.mattbas.org/api/insult.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Insult = await response.json();
      setInsult(data.insult);
    } catch (error) {
      console.error('Error fetching insult:', error);
      setInsult('Failed to load insult. Try again!');
    }
    setLoading(false);
  };

  const fetchAdultJoke = async () => {
    setLoading(true);
    setShowPunchline(false);
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error('Error fetching adult joke:', error);
      setJoke({ joke: 'Failed to load joke. Try again!' });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (verified) {
      if (isJokeMode) {
        fetchAdultJoke();
      } else {
        fetchInsult();
      }
    }
  }, [verified, isJokeMode]);

  if (!verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-gray-800 backdrop-blur-lg bg-opacity-50 p-8 rounded-2xl shadow-2xl border border-red-500">
            <h2 className="text-2xl font-bold text-center mb-6">Age Verification</h2>
            <p className="text-gray-300 mb-6 text-center">
              Warning: This section contains adult content and offensive language.
              You must be 18 or older to continue.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setVerified(true)}
                className="w-full px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300"
              >
                I am 18 or older
              </button>
              <Link
                to="/"
                className="w-full px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 text-center"
              >
                Go back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-12">
          <Sparkles className="w-8 h-8 mr-2 text-red-500" />
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
            {isJokeMode ? 'Adult Jokes' : 'Evil Insults'}
          </h1>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setIsJokeMode(!isJokeMode)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
              isJokeMode 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <Settings className="w-5 h-5" />
            {isJokeMode ? 'Switch to Insults' : 'Switch to Adult Jokes'}
          </button>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Family Jokes
          </Link>
        </div>

        {/* Content Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 backdrop-blur-lg bg-opacity-50 p-8 rounded-2xl shadow-2xl border border-red-500 hover:border-red-400 transition-all duration-300">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500"></div>
              </div>
            ) : (
              <>
                {isJokeMode ? (
                  <>
                    {joke?.joke ? (
                      <p className="text-xl md:text-2xl text-gray-100">{joke.joke}</p>
                    ) : (
                      <>
                        <p className="text-xl md:text-2xl mb-6 text-gray-100">{joke?.setup}</p>
                        {showPunchline ? (
                          <p className="text-lg md:text-xl text-red-400 font-medium">{joke?.delivery}</p>
                        ) : (
                          <button
                            onClick={() => setShowPunchline(true)}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-300"
                          >
                            Reveal Punchline
                          </button>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-xl md:text-2xl text-gray-100">{insult}</p>
                )}
              </>
            )}
          </div>

          {/* Next Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={isJokeMode ? fetchAdultJoke : fetchInsult}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
            >
              <RefreshCcw className="w-5 h-5" />
              Next {isJokeMode ? 'Joke' : 'Insult'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400">
          <p className="mb-2">Made with ❤️ by RANTU aka Quadra</p>
          <a
            href="https://github.com/Quadra-v69"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors duration-300"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}

export default InsultPage;