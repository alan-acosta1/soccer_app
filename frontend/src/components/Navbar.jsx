function Navbar() {
  return (
    <nav className="bg-[#161c2a] border-b border-[#2d3a50] sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#e33831] rounded flex items-center justify-center">
            <span className="text-white font-black text-sm">S</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">SoccerApp</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {["Matches", "My Team", "News", "Leagues", "Tables"].map((item) => (
            <button
              key={item}
              className="text-[#8a9bb5] hover:text-white text-sm font-medium px-3 py-1.5 rounded hover:bg-[#1e2535] transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search teams, players..."
              className="bg-[#1e2535] text-white text-sm placeholder-[#4a5a70] rounded-full pl-9 pr-4 py-1.5 w-52 border border-[#2d3a50] focus:outline-none focus:border-[#4a5a70]"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4a5a70]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {/* Mobile search icon */}
          <button className="sm:hidden text-[#8a9bb5] hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <div className="w-8 h-8 bg-[#2d3a50] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#3d4a60] transition-colors">
            <span className="text-[#8a9bb5] text-xs font-bold">A</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
