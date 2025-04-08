import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCcw, Github, Skull } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Joke {
  setup: string;
  punchline: string;
}

function JokePage() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPunchline, setShowPunchline] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setShowPunchline(false);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-12">
          <Sparkles className="w-8 h-8 mr-2 text-purple-500" />
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Jokify
          </h1>
        </div>

        {/* Insult Button */}
        <div className="flex justify-center mb-8">
          <Link
            to="/insult"
            className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
          >
            <Skull className="w-5 h-5" />
            Adult Jokes & Insults 18+
          </Link>
        </div>

        {/* Joke Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 backdrop-blur-lg bg-opacity-50 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
              </div>
            ) : (
              <>
                <p className="text-xl md:text-2xl mb-6 text-gray-100">{joke?.setup}</p>
                {showPunchline ? (
                  <p className="text-lg md:text-xl text-purple-400 font-medium">{joke?.punchline}</p>
                ) : (
                  <button
                    onClick={() => setShowPunchline(true)}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-300"
                  >
                    Reveal Punchline
                  </button>
                )}
              </>
            )}
          </div>

          {/* Next Joke Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={fetchJoke}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              <RefreshCcw className="w-5 h-5" />
              Next Joke
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400">
          <p className="mb-2">Made with ❤️ by RANTU aka Quadra</p>
          <a
            href="https://github.com/quadra-v69"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}

export default JokePage;