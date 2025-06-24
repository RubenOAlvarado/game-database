export default function Spinner() {
  return (
    <div className="relative">
      {/* Main spinner with gradient */}
      <svg
        aria-hidden="true"
        className="w-12 h-12 text-transparent animate-spin"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 4C35.8084 4 39.5375 4.86213 42.9263 6.50917C46.315 8.15621 49.2634 10.5394 51.5338 13.4662C53.8042 16.393 55.3343 19.7844 55.9999 23.3333H59.9999C59.189 18.1152 57.1615 13.1644 54.0785 8.92313C50.9955 4.68183 46.9397 1.27296 42.2849 -0.984759C37.6301 -3.24248 32.5139 -3.99999 27.4701 -3.19999C22.4263 -2.4 17.6144 -0.0663091 13.471 3.5806C9.32758 7.22751 5.98245 11.9998 3.71831 17.4819C1.45417 22.964 0.333008 28.9892 0.458008 35.0555C0.583008 41.1218 1.94981 47.0467 4.44849 52.4166C6.94717 57.7865 10.5062 62.4434 14.8157 66"
          stroke="url(#spinner-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="spinner-gradient"
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6366F1" /> {/* indigo-500 */}
            <stop offset="50%" stopColor="#8B5CF6" /> {/* purple-500 */}
            <stop offset="100%" stopColor="#EC4899" /> {/* pink-500 */}
          </linearGradient>
        </defs>
      </svg>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-md animate-pulse" />

      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-400 rounded-full" />

      <span className="sr-only">Loading...</span>
    </div>
  );
}