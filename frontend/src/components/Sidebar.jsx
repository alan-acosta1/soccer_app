import { useEffect, useState } from "react";
import { getPopularLeagues } from "../services/api";

const FLAG_PLACEHOLDERS = {
  "Premier League": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "La Liga": "🇪🇸",
  "Bundesliga": "🇩🇪",
  "Serie A": "🇮🇹",
  "Ligue 1": "🇫🇷",
  "Champions League": "🇪🇺",
  "Europa League": "🇪🇺",
  "MLS": "🇺🇸",
};

function LeagueIcon({ name }) {
  const emoji = FLAG_PLACEHOLDERS[name];
  if (emoji) return <span className="text-base leading-none">{emoji}</span>;
  return (
    <div className="w-5 h-5 rounded-full bg-[#2d3a50] flex items-center justify-center">
      <span className="text-[9px] text-[#8a9bb5] font-bold uppercase">
        {name?.slice(0, 2)}
      </span>
    </div>
  );
}

function Sidebar() {
  const [leagues, setLeagues] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    getPopularLeagues()
      .then((data) => setLeagues(data))
      .catch(() => {});
  }, []);

  const sections = [
    { label: "Favorites", icon: "★", items: [] },
  ];

  return (
    <aside className="w-60 shrink-0 hidden lg:flex flex-col bg-[#161c2a] border-r border-[#2d3a50] h-full">
      <div className="p-3">
        <p className="text-[10px] text-[#4a5a70] uppercase tracking-widest font-semibold px-2 mb-2">
          Popular Leagues
        </p>
        <ul className="space-y-0.5">
          {leagues.length > 0
            ? leagues.map((league) => (
                <li key={league.id}>
                  <button
                    onClick={() => setActive(league.id)}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded text-sm transition-colors ${
                      active === league.id
                        ? "bg-[#1e2d45] text-white"
                        : "text-[#8a9bb5] hover:text-white hover:bg-[#1e2535]"
                    }`}
                  >
                    <LeagueIcon name={league.name} />
                    <span className="truncate">{league.name}</span>
                  </button>
                </li>
              ))
            : FALLBACK_LEAGUES.map((league) => (
                <li key={league.id}>
                  <button
                    onClick={() => setActive(league.id)}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded text-sm transition-colors ${
                      active === league.id
                        ? "bg-[#1e2d45] text-white"
                        : "text-[#8a9bb5] hover:text-white hover:bg-[#1e2535]"
                    }`}
                  >
                    <LeagueIcon name={league.name} />
                    <span className="truncate">{league.name}</span>
                  </button>
                </li>
              ))}
        </ul>
      </div>

      <div className="p-3 border-t border-[#2d3a50]">
        <p className="text-[10px] text-[#4a5a70] uppercase tracking-widest font-semibold px-2 mb-2">
          More
        </p>
        <ul className="space-y-0.5">
          {["Top Scorers", "Standings", "Transfers", "News"].map((item) => (
            <li key={item}>
              <button className="w-full flex items-center gap-3 px-2 py-2 rounded text-sm text-[#8a9bb5] hover:text-white hover:bg-[#1e2535] transition-colors">
                <span>{item}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

const FALLBACK_LEAGUES = [
  { id: 39, name: "Premier League" },
  { id: 140, name: "La Liga" },
  { id: 78, name: "Bundesliga" },
  { id: 135, name: "Serie A" },
  { id: 61, name: "Ligue 1" },
  { id: 2, name: "Champions League" },
  { id: 3, name: "Europa League" },
  { id: 253, name: "MLS" },
];

export default Sidebar;
