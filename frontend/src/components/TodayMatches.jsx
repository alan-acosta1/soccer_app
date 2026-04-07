import { useEffect, useState } from "react";
import { getMatchesByDate } from "../services/api";

const TODAY = new Date().toISOString().split("T")[0];

function buildDates() {
  return Array.from({ length: 11 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 5 + i);
    return d;
  });
}

function DateStrip({ selected, onChange }) {
  const dates = buildDates();
  const today = new Date();

  return (
    <div className="flex justify-center overflow-x-auto scrollbar-hide border-b border-gray-200 bg-white shadow-sm">
      <div className="flex gap-1 px-4 py-2">
        {dates.map((d) => {
          const iso = d.toISOString().split("T")[0];
          const isSelected = iso === selected;
          const diff = Math.round((d - today) / 86400000);
          const label =
            diff === -1 ? "YST" : diff === 0 ? "TODAY" : diff === 1 ? "TMR" : d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();

          return (
            <button
              key={iso}
              onClick={() => onChange(iso)}
              className={`flex flex-col items-center min-w-[48px] px-2 py-1.5 rounded text-xs transition-colors ${
                isSelected ? "bg-[#e33831] text-white" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className={`text-[9px] font-semibold tracking-wide ${isSelected ? "text-white/80" : "text-gray-400"}`}>{label}</span>
              <span className="text-sm font-bold">{d.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Initials({ name }) {
  const letters = (name || "?")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
      <span className="text-[8px] font-bold text-gray-500 leading-none">{letters}</span>
    </div>
  );
}

function MatchRow({ match }) {
  const home = match.teams?.home?.name || match.homeTeam?.name || "Home";
  const away = match.teams?.away?.name || match.awayTeam?.name || "Away";
  const status = match.fixture?.status?.short || match.status?.short || "";
  const elapsed = match.fixture?.status?.elapsed ?? match.status?.elapsed;
  const time = match.fixture?.date || match.date || "";
  const homeGoals = match.goals?.home ?? match.score?.home;
  const awayGoals = match.goals?.away ?? match.score?.away;

  const isLive = ["1H", "2H", "HT", "ET", "P"].includes(status);
  const isFinished = ["FT", "AET", "PEN"].includes(status);

  let center;
  if (isLive) {
    center = (
      <div className="flex flex-col items-center w-20 shrink-0">
        <span className="text-[#e33831] text-[9px] font-bold uppercase tracking-wide">
          {status === "HT" ? "HT" : `${elapsed}'`}
        </span>
        <span className="text-gray-900 font-bold text-sm tabular-nums">
          {homeGoals} - {awayGoals}
        </span>
      </div>
    );
  } else if (isFinished) {
    center = (
      <div className="flex flex-col items-center w-20 shrink-0">
        <span className="text-gray-400 text-[9px] uppercase tracking-wide">FT</span>
        <span className="text-gray-700 font-bold text-sm tabular-nums">
          {homeGoals} - {awayGoals}
        </span>
      </div>
    );
  } else {
    const kickoff = time
      ? new Date(time).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/New_York",
        })
      : "--:--";
    center = (
      <div className="flex items-center justify-center w-20 shrink-0">
        <span className="text-gray-500 font-semibold text-sm tabular-nums">{kickoff}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-t border-gray-100 first:border-0">
      {/* Home */}
      <div className="flex items-center gap-2 flex-1 justify-end">
        <span className="text-sm text-gray-800 font-medium text-right truncate max-w-[120px]">{home}</span>
        <Initials name={home} />
      </div>

      {/* Score / Time */}
      {center}

      {/* Away */}
      <div className="flex items-center gap-2 flex-1">
        <Initials name={away} />
        <span className="text-sm text-gray-800 font-medium truncate max-w-[120px]">{away}</span>
      </div>
    </div>
  );
}

function LeagueGroup({ name, country, matches }) {
  const hasLive = matches.some((m) =>
    ["1H", "2H", "HT", "ET", "P"].includes(m.fixture?.status?.short || m.status?.short)
  );

  return (
    <div className="mb-3 rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
      {/* League header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100">
        <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <span className="text-[7px] font-bold text-gray-500 uppercase leading-none">{name.slice(0, 2)}</span>
        </div>
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{name}</span>
        {country && <span className="text-gray-400 text-xs">· {country}</span>}
        {hasLive && (
          <span className="ml-auto px-1.5 py-0.5 bg-[#e33831]/10 text-[#e33831] text-[9px] font-bold uppercase rounded tracking-wide">
            Live
          </span>
        )}
      </div>

      {/* Matches */}
      {matches.map((m) => (
        <MatchRow key={m.fixture?.id || m.id} match={m} />
      ))}
    </div>
  );
}

function TodayMatches() {
  const [selected, setSelected] = useState(TODAY);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMatchesByDate(selected)
      .then((data) => setMatches(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selected]);

  const PRIORITY_LEAGUES_IDS = [
    2, // UCL
    3, // UEL
    39, // English Premier League 
    140, // La Liga
    78, // Bundesliga
    135, // Seria A
    61, // Ligue 1
  ];

  const groups = Object.values(
    matches.reduce((acc, m) => {
      const key = m.league?.id ?? m.league?.name ?? "Unknown";
      if (!acc[key]) acc[key] = {name: m.league?.name || "Unknown", country: m.league?.country || "", matches: []}
      acc[key].matches.push(m);
      return acc;
    }, {})
  ).sort((a, b) => {
    const ai = PRIORITY_LEAGUES_IDS.indexOf(a.matches[0]?.league?.id);
    const bi = PRIORITY_LEAGUES_IDS.indexOf(b.matches[0]?.league?.id);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return (
    <div>
      <DateStrip selected={selected} onChange={setSelected} />
      <div className="max-w-2xl mx-auto px-4 py-5">

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                <div className="h-9 bg-gray-50 border-b border-gray-100 animate-pulse" />
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center px-4 py-3 gap-3 border-t border-gray-100">
                    <div className="flex-1 flex justify-end gap-2 items-center">
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                    </div>
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="flex-1 flex gap-2 items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-[#e33831] text-sm font-medium">Failed to load matches</p>
            <p className="text-gray-400 text-xs mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && matches.length === 0 && (
          <div className="text-center py-16">
            <p className="text-3xl mb-3">⚽</p>
            <p className="text-gray-400 text-sm">No matches scheduled</p>
          </div>
        )}

        {!loading && !error && groups.map((g) => (
          <LeagueGroup key={g.name} name={g.name} country={g.country} matches={g.matches} />
        ))}
      </div>
    </div>
  );
}

export default TodayMatches;
