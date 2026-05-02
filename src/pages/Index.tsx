import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "matches" | "cases" | "rating" | "profile" | "market" | "clans" | "settings";

const HERO_IMG = "https://cdn.poehali.dev/projects/d3a33a24-4716-4cb8-b8dd-e76cc2556330/files/b5ceccde-8662-4bbf-8511-a1667324e9c8.jpg";

const navItems: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "matches", label: "Матчи", icon: "Swords" },
  { id: "cases", label: "Кейсы", icon: "Package" },
  { id: "rating", label: "Рейтинг", icon: "BarChart2" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "market", label: "Рынок", icon: "ShoppingBag" },
  { id: "clans", label: "Кланы", icon: "Shield" },
  { id: "settings", label: "Настройки", icon: "Settings" },
];

const matches = [
  { id: 1, map: "Городской квартал", mode: "Командный бой", status: "live", score: "7 : 4", time: "14:23", team1: "ALFA", team2: "BRAVO", players: 12 },
  { id: 2, map: "Заводской район", mode: "Захват флага", status: "live", score: "2 : 2", time: "08:45", team1: "DELTA", team2: "ECHO", players: 10 },
  { id: 3, map: "Горный перевал", mode: "Дефматч", status: "soon", score: "—", time: "в 19:00", team1: "FOXT", team2: "GOLF", players: 6 },
  { id: 4, map: "Портовые доки", mode: "Штурм", status: "ended", score: "13 : 8", time: "завершён", team1: "HOTEL", team2: "INDIA", players: 20 },
  { id: 5, map: "Пустынная база", mode: "Командный бой", status: "ended", score: "10 : 10", time: "завершён", team1: "JULIET", team2: "KILO", players: 8 },
];

const cases = [
  { id: 1, name: "Тактический набор", rarity: "legendary", price: 1200, items: 8, img: "🎖️" },
  { id: 2, name: "Снайперский кейс", rarity: "epic", price: 650, items: 5, img: "🎯" },
  { id: 3, name: "Штурмовой набор", rarity: "rare", price: 380, items: 6, img: "⚔️" },
  { id: 4, name: "Полевой комплект", rarity: "uncommon", price: 180, items: 4, img: "🪖" },
  { id: 5, name: "Базовый кейс", rarity: "common", price: 80, items: 3, img: "📦" },
  { id: 6, name: "Элитный кейс «Призрак»", rarity: "legendary", price: 2200, items: 10, img: "💀" },
];

const rarityColors: Record<string, string> = {
  legendary: "#e5a830",
  epic: "#9b59b6",
  rare: "#3498db",
  uncommon: "#2ecc71",
  common: "#95a5a6",
};

const rarityLabels: Record<string, string> = {
  legendary: "Легендарный",
  epic: "Эпический",
  rare: "Редкий",
  uncommon: "Необычный",
  common: "Обычный",
};

const ratingPlayers = [
  { rank: 1, name: "Ghost_Alpha", clan: "SPECTRE", kd: "3.42", wins: 847, rating: 9850, tier: "МАРШАЛ" },
  { rank: 2, name: "IronWolf_77", clan: "WOLFS", kd: "2.98", wins: 712, rating: 9420, tier: "МАРШАЛ" },
  { rank: 3, name: "DesertFox", clan: "DELTA", kd: "2.75", wins: 683, rating: 8980, tier: "ГЕНЕРАЛ" },
  { rank: 4, name: "ShadowStrike", clan: "SHDW", kd: "2.61", wins: 621, rating: 8450, tier: "ГЕНЕРАЛ" },
  { rank: 5, name: "NightHawk_RU", clan: "ALFA", kd: "2.44", wins: 598, rating: 8120, tier: "ПОЛКОВНИК" },
  { rank: 6, name: "Viktor_Reaper", clan: "BEAR", kd: "2.30", wins: 554, rating: 7890, tier: "ПОЛКОВНИК" },
  { rank: 7, name: "Stalker_X", clan: "VOID", kd: "2.18", wins: 520, rating: 7560, tier: "МАЙОР" },
  { rank: 8, name: "Phantom_9", clan: "GOST", kd: "2.05", wins: 487, rating: 7240, tier: "МАЙОР" },
  { rank: 9, name: "BulletKing", clan: "ALFA", kd: "1.97", wins: 463, rating: 6980, tier: "КАПИТАН" },
  { rank: 10, name: "TacticsMaster", clan: "TACT", kd: "1.88", wins: 441, rating: 6750, tier: "КАПИТАН" },
];

const marketItems = [
  { id: 1, name: "АКМ | Лесной камуфляж", type: "Штурмовая винтовка", rarity: "rare", price: 1450, seller: "Ghost_Alpha", wear: "Потёртое" },
  { id: 2, name: "M4A1 | Пустынный шторм", type: "Штурмовая винтовка", rarity: "epic", price: 3200, seller: "IronWolf_77", wear: "Заводское" },
  { id: 3, name: "AWP | Ночная охота", type: "Снайперская", rarity: "legendary", price: 8900, seller: "DesertFox", wear: "Минимальный износ" },
  { id: 4, name: "Нож | Тактический клинок", type: "Нож", rarity: "epic", price: 5600, seller: "ShadowStrike", wear: "После полевых" },
  { id: 5, name: "Gloves | Боевые перчатки", type: "Перчатки", rarity: "rare", price: 2100, seller: "Viktor_Reaper", wear: "Заводское" },
  { id: 6, name: "P90 | Арктика", type: "Пистолет-пулемёт", rarity: "uncommon", price: 680, seller: "Stalker_X", wear: "Потёртое" },
];

const clans = [
  { rank: 1, tag: "SPEC", name: "SPECTRE", members: 48, wins: 1240, rating: 12450, status: "Набор закрыт" },
  { rank: 2, tag: "ALFA", name: "ALFA GROUP", members: 45, wins: 1180, rating: 11900, status: "Набор открыт" },
  { rank: 3, tag: "WOLF", name: "IRON WOLVES", members: 50, wins: 1095, rating: 11200, status: "Набор закрыт" },
  { rank: 4, tag: "BEAR", name: "BEAR FORCE", members: 42, wins: 980, rating: 10400, status: "Набор открыт" },
  { rank: 5, tag: "VOID", name: "VOID OPERATORS", members: 38, wins: 890, rating: 9800, status: "Набор открыт" },
  { rank: 6, tag: "SHDW", name: "SHADOW UNIT", members: 35, wins: 820, rating: 9100, status: "Набор закрыт" },
];

const tierColors: Record<string, string> = {
  "МАРШАЛ": "#e5a830",
  "ГЕНЕРАЛ": "#c0392b",
  "ПОЛКОВНИК": "#9b59b6",
  "МАЙОР": "#3498db",
  "КАПИТАН": "#2ecc71",
};

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");

  return (
    <div className="min-h-screen bg-[#131610] grid-overlay font-rubik">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 military-card border-b border-[rgba(90,99,53,0.3)] flex items-center px-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[rgba(90,99,53,0.2)] border border-[rgba(143,160,64,0.4)] flex items-center justify-center">
            <span className="text-[#8fa040] text-xs font-oswald font-bold">C</span>
          </div>
          <span className="heading-military text-[#8fa040] text-lg tracking-widest">CONFRONTATION</span>
        </div>
        <div style={{ width: 1, height: 24, background: 'rgba(90,99,53,0.4)', margin: '0 8px' }} />
        <div className="flex items-center gap-1.5">
          <span className="status-dot-green" />
          <span className="font-mono text-xs text-[#6b7a3a]">СЕРВЕР ОНЛАЙН</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="font-mono text-xs text-[rgba(143,160,64,0.7)]">ОНЛАЙН: <span className="text-[#8fa040]">4 284</span></span>
          <div className="flex items-center gap-2 bg-[rgba(61,66,40,0.4)] border border-[rgba(90,99,53,0.3)] px-3 py-1.5">
            <div className="w-6 h-6 bg-[rgba(90,99,53,0.3)] flex items-center justify-center text-xs">🎖️</div>
            <div>
              <div className="heading-military text-xs text-[rgba(232,240,176,0.9)] leading-tight">WOLF_19</div>
              <div className="font-mono text-[10px] text-[rgba(107,122,58,0.7)]">КАПИТАН</div>
            </div>
            <span className="font-mono text-xs text-[#c4a96a] ml-1">2 840 ₿</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-14 bottom-0 w-52 military-card border-r border-[rgba(90,99,53,0.25)] flex flex-col z-40">
        <nav className="flex-1 py-4 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 mb-1 transition-all duration-150 text-left
                ${activeSection === item.id
                  ? "bg-[rgba(90,99,53,0.3)] border border-[rgba(143,160,64,0.3)] text-[#8fa040]"
                  : "text-[rgba(232,240,176,0.6)] hover:text-[rgba(232,240,176,0.9)] hover:bg-[rgba(61,66,40,0.3)] border border-transparent"
                }`}
            >
              <Icon name={item.icon} size={16} className={activeSection === item.id ? "text-[#8fa040]" : "text-[rgba(107,122,58,0.6)]"} />
              <span className="heading-military text-sm">{item.label}</span>
              {activeSection === item.id && (
                <div className="ml-auto w-1 h-4 bg-[rgba(143,160,64,0.7)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-[rgba(90,99,53,0.2)]">
          <div className="military-card p-3">
            <div className="font-mono text-[10px] text-[rgba(107,122,58,0.6)] uppercase tracking-wider mb-2">Мой прогресс</div>
            <div className="flex justify-between items-center mb-1">
              <span className="heading-military text-xs text-[rgba(232,240,176,0.7)]">ДО МАЙОРА</span>
              <span className="font-mono text-xs text-[#8fa040]">68%</span>
            </div>
            <div className="xp-bar">
              <div className="xp-fill" style={{ width: "68%" }} />
            </div>
            <div className="font-mono text-[10px] text-[rgba(107,122,58,0.5)] mt-1">6 800 / 10 000 XP</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-52 pt-14 min-h-screen">
        {activeSection === "home" && <HomeSection />}
        {activeSection === "matches" && <MatchesSection />}
        {activeSection === "cases" && <CasesSection />}
        {activeSection === "rating" && <RatingSection />}
        {activeSection === "profile" && <ProfileSection />}
        {activeSection === "market" && <MarketSection />}
        {activeSection === "clans" && <ClansSection />}
        {activeSection === "settings" && <SettingsSection />}
      </main>
    </div>
  );
}

/* ─────────────────────── HOME ─────────────────────── */
function HomeSection() {
  return (
    <div className="p-6 animate-fade-in-up">
      {/* Hero */}
      <div className="relative h-64 mb-6 overflow-hidden" style={{ borderRadius: 2 }}>
        <img src={HERO_IMG} alt="Confrontation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#131610]/90 via-[#131610]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131610]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="tag-military mb-2 inline-block w-fit">// СЕЗОН 4 АКТИВЕН</div>
          <h1 className="heading-military text-5xl text-[rgba(232,240,176,1)] mb-2">CONFRONTATION</h1>
          <p className="text-[rgba(232,240,176,0.6)] font-rubik text-sm max-w-md">Тактические сражения. Реальная экономика. Настоящий рейтинг.</p>
          <div className="flex gap-3 mt-4">
            <button className="btn-primary-military text-sm">Найти матч</button>
            <button className="btn-military text-sm">Обучение</button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Матчей сыграно", value: "1 248", icon: "Swords", delta: "+24 сегодня" },
          { label: "Победы", value: "724", icon: "Trophy", delta: "58% WR" },
          { label: "K/D Ratio", value: "2.14", icon: "Target", delta: "↑ 0.3 нед." },
          { label: "Баланс", value: "2 840 ₿", icon: "Coins", delta: "+350 вчера" },
        ].map((stat, i) => (
          <div key={i} className="military-card military-card-hover p-4 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}>
            <div className="flex items-start justify-between mb-3">
              <Icon name={stat.icon} size={18} className="text-[rgba(107,122,58,0.7)]" />
              <span className="font-mono text-[10px] text-[rgba(107,122,58,0.5)]">{stat.delta}</span>
            </div>
            <div className="heading-military text-2xl text-[rgba(232,240,176,0.95)]">{stat.value}</div>
            <div className="font-mono text-[11px] text-[rgba(107,122,58,0.6)] mt-1 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Live matches + News */}
      <div className="grid grid-cols-3 gap-4">
        {/* Live */}
        <div className="col-span-2 military-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="status-dot-green" />
              <span className="heading-military text-sm text-[rgba(232,240,176,0.8)]">Активные матчи</span>
            </div>
            <span className="font-mono text-xs text-[rgba(107,122,58,0.5)]">LIVE</span>
          </div>
          <div className="space-y-2">
            {matches.filter(m => m.status === "live").map(m => (
              <div key={m.id} className="flex items-center gap-3 p-2 bg-[rgba(61,66,40,0.2)] border border-[rgba(90,99,53,0.15)] hover:border-[rgba(90,99,53,0.4)] transition-colors cursor-pointer">
                <div className="text-[10px] font-mono text-[rgba(107,122,58,0.5)] w-28 truncate">{m.map}</div>
                <div className="flex-1 flex items-center justify-center gap-3">
                  <span className="heading-military text-xs text-[rgba(232,240,176,0.8)]">{m.team1}</span>
                  <span className="font-mono text-sm text-[#8fa040] font-bold">{m.score}</span>
                  <span className="heading-military text-xs text-[rgba(232,240,176,0.8)]">{m.team2}</span>
                </div>
                <div className="font-mono text-[10px] text-[#6ab04c]">{m.time}</div>
                <span className="tag-military text-[9px]">{m.mode}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="military-card p-4">
          <div className="heading-military text-sm text-[rgba(232,240,176,0.8)] mb-4">Объявления</div>
          <div className="space-y-3">
            {[
              { title: "Двойной опыт", desc: "Все выходные — x2 XP", time: "Сейчас", type: "event" },
              { title: "Новый кейс", desc: "Кейс «Призрак» доступен", time: "2 ч назад", type: "update" },
              { title: "Патч 4.2.1", desc: "Баланс оружия обновлён", time: "Вчера", type: "patch" },
            ].map((n, i) => (
              <div key={i} className="flex gap-3 pb-3 border-b border-[rgba(90,99,53,0.15)] last:border-0">
                <div className={`w-2 h-2 mt-1 rounded-full flex-shrink-0 ${n.type === "event" ? "bg-[#e5a830]" : n.type === "update" ? "bg-[#8fa040]" : "bg-[#3498db]"}`} />
                <div>
                  <div className="heading-military text-xs text-[rgba(232,240,176,0.8)]">{n.title}</div>
                  <div className="font-rubik text-xs text-[rgba(232,240,176,0.5)]">{n.desc}</div>
                  <div className="font-mono text-[10px] text-[rgba(107,122,58,0.4)] mt-0.5">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── MATCHES ─────────────────────── */
function MatchesSection() {
  const [filter, setFilter] = useState<"all" | "live" | "soon" | "ended">("all");
  const filtered = filter === "all" ? matches : matches.filter(m => m.status === filter);

  return (
    <div className="p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="heading-military text-3xl text-[rgba(232,240,176,0.95)]">Матчи</h2>
          <div className="font-mono text-xs text-[rgba(107,122,58,0.5)] mt-1">БОЕВЫЕ ОПЕРАЦИИ // СЕЗОН 4</div>
        </div>
        <button className="btn-primary-military text-sm flex items-center gap-2">
          <Icon name="Plus" size={14} />
          Создать матч
        </button>
      </div>

      <div className="flex gap-2 mb-5">
        {[
          { key: "all", label: "Все" },
          { key: "live", label: "🔴 В эфире" },
          { key: "soon", label: "⏳ Скоро" },
          { key: "ended", label: "Завершённые" },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as "all" | "live" | "soon" | "ended")}
            className={`heading-military text-xs px-4 py-2 border transition-all ${filter === f.key ? "bg-[rgba(90,99,53,0.3)] border-[rgba(143,160,64,0.4)] text-[#8fa040]" : "border-[rgba(90,99,53,0.25)] text-[rgba(232,240,176,0.5)] hover:border-[rgba(90,99,53,0.4)] hover:text-[rgba(232,240,176,0.7)]"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map(m => (
          <div key={m.id} className="military-card military-card-hover p-5 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <span className="tag-military">{m.mode}</span>
              <div className="flex items-center gap-1.5">
                {m.status === "live" && <span className="status-dot-green" />}
                {m.status === "soon" && <span className="status-dot-gray" />}
                {m.status === "ended" && <span className="status-dot-red" />}
                <span className={`font-mono text-[10px] ${m.status === "live" ? "text-[#6ab04c]" : m.status === "soon" ? "text-[rgba(232,240,176,0.4)]" : "text-[rgba(232,240,176,0.3)]"}`}>
                  {m.status === "live" ? "LIVE" : m.status === "soon" ? "СКОРО" : "ЗАВЕРШЁН"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 mb-4 py-4 bg-[rgba(19,22,16,0.4)] border border-[rgba(90,99,53,0.1)]">
              <div className="text-center">
                <div className="heading-military text-xl text-[rgba(232,240,176,0.9)]">{m.team1}</div>
                <div className="font-mono text-[10px] text-[rgba(107,122,58,0.5)] mt-0.5">КОМАНДА А</div>
              </div>
              <div className="text-center">
                <div className={`heading-military text-3xl font-bold ${m.status === "live" ? "text-[#8fa040]" : "text-[rgba(232,240,176,0.6)]"}`}>{m.score}</div>
                <div className="font-mono text-[10px] text-[rgba(107,122,58,0.4)]">{m.time}</div>
              </div>
              <div className="text-center">
                <div className="heading-military text-xl text-[rgba(232,240,176,0.9)]">{m.team2}</div>
                <div className="font-mono text-[10px] text-[rgba(107,122,58,0.5)] mt-0.5">КОМАНДА Б</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[rgba(232,240,176,0.4)]">
                <Icon name="MapPin" size={12} />
                <span className="font-rubik text-xs">{m.map}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[rgba(232,240,176,0.4)]">
                <Icon name="Users" size={12} />
                <span className="font-mono text-xs">{m.players}/20</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── CASES ─────────────────────── */
function CasesSection() {
  const [opening, setOpening] = useState<number | null>(null);

  return (
    <div className="p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="heading-military text-3xl text-[rgba(232,240,176,0.95)]">Кейсы</h2>
          <div className="font-mono text-xs text-[rgba(107,122,58,0.5)] mt-1">ТАКТИЧЕСКОЕ СНАРЯЖЕНИЕ // {cases.length} ДОСТУПНО</div>
        </div>
        <div className="flex items-center gap-2 military-card px-4 py-2">
          <Icon name="Coins" size={14} className="text-[#c4a96a]" />
          <span className="heading-military text-sm text-[#c4a96a]">2 840 ₿</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {cases.map(c => (
          <div key={c.id} className="military-card military-card-hover p-5 flex flex-col cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{c.img}</span>
              <span className="font-mono text-[10px] px-2 py-0.5 border"
                style={{ color: rarityColors[c.rarity], borderColor: `${rarityColors[c.rarity]}40`, background: `${rarityColors[c.rarity]}10` }}>
                {rarityLabels[c.rarity].toUpperCase()}
              </span>
            </div>
            <div className="heading-military text-base text-[rgba(232,240,176,0.9)] mb-1">{c.name}</div>
            <div className="font-rubik text-xs text-[rgba(232,240,176,0.4)] mb-4">{c.items} предметов в кейсе</div>
            <div className="divider-military mb-3" />
            <div className="flex items-center justify-between mt-auto">
              <span className="font-oswald text-lg text-[#c4a96a]">{c.price.toLocaleString()} ₿</span>
              <button onClick={() => setOpening(c.id)} className="btn-primary-military text-xs px-4 py-2">Открыть</button>
            </div>
          </div>
        ))}
      </div>

      {opening && (
        <div className="fixed inset-0 bg-[#131610]/90 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setOpening(null)}>
          <div className="military-card p-8 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-4 animate-bounce">{cases.find(c => c.id === opening)?.img}</div>
            <div className="heading-military text-xl text-[rgba(232,240,176,0.9)] mb-2">{cases.find(c => c.id === opening)?.name}</div>
            <div className="font-rubik text-sm text-[rgba(232,240,176,0.5)] mb-6">Готов открыть кейс?</div>
            <div className="flex gap-3">
              <button className="btn-primary-military flex-1" onClick={() => setOpening(null)}>Открыть</button>
              <button className="btn-military flex-1" onClick={() => setOpening(null)}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────── RATING ─────────────────────── */
function RatingSection() {
  return (
    <div className="p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="heading-military text-3xl text-[rgba(232,240,176,0.95)]">Рейтинг</h2>
          <div className="font-mono text-xs text-[rgba(107,122,58,0.5)] mt-1">ГЛОБАЛЬНАЯ ТАБЛИЦА // СЕЗОН 4</div>
        </div>
        <div className="tag-military">ВЫ: #142</div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {ratingPlayers.slice(0, 3).map((p, i) => (
          <div key={p.rank} className={`military-card p-5 text-center ${i === 0 ? "border-[rgba(229,168,48,0.4)]" : ""}`}>
            <div className="text-3xl mb-2">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</div>
            <div className="heading-military text-base text-[rgba(232,240,176,0.9)]">{p.name}</div>
            <div className="font-mono text-xs text-[rgba(107,122,58,0.5)] mb-2">[{p.clan}]</div>
            <div className="font-mono text-lg" style={{ color: tierColors[p.tier] }}>{p.rating.toLocaleString()}</div>
            <div className="font-mono text-[10px] mt-1" style={{ color: `${tierColors[p.tier]}99` }}>{p.tier}</div>
          </div>
        ))}
      </div>

      <div className="military-card overflow-hidden">
        <div className="grid grid-cols-6 px-4 py-2 bg-[rgba(19,22,16,0.6)] border-b border-[rgba(90,99,53,0.2)]">
          {["#", "ИГРОК", "КЛАН", "K/D", "ПОБЕДЫ", "РЕЙТИНГ"].map(h => (
            <div key={h} className="heading-military text-[11px] text-[rgba(107,122,58,0.6)]">{h}</div>
          ))}
        </div>
        {ratingPlayers.map((p, i) => (
          <div key={p.rank} className="grid grid-cols-6 px-4 py-3 border-b border-[rgba(90,99,53,0.1)] hover:bg-[rgba(61,66,40,0.2)] transition-colors cursor-pointer">
            <div className="heading-military text-sm" style={{ color: i < 3 ? Object.values(tierColors)[i] : "rgba(232,240,176,0.7)" }}>#{p.rank}</div>
            <div className="heading-military text-sm text-[rgba(232,240,176,0.85)]">{p.name}</div>
            <div className="font-mono text-xs text-[rgba(107,122,58,0.6)]">[{p.clan}]</div>
            <div className="font-mono text-sm text-[rgba(232,240,176,0.75)]">{p.kd}</div>
            <div className="font-mono text-sm text-[rgba(232,240,176,0.75)]">{p.wins}</div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-[#8fa040]">{p.rating.toLocaleString()}</span>
              <span className="font-mono text-[9px] px-1.5 py-0.5" style={{ color: tierColors[p.tier], background: `${tierColors[p.tier]}15` }}>{p.tier}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── PROFILE ─────────────────────── */
function ProfileSection() {
  return (
    <div className="p-6 animate-fade-in-up">
      <h2 className="heading-military text-3xl text-[rgba(232,240,176,0.95)] mb-6">Профиль</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 military-card p-6">
          <div className="flex flex-col items-center text-center mb-5">
            <div className="w-20 h-20 bg-[rgba(90,99,53,0.2)] border-2 border-[rgba(143,160,64,0.3)] flex items-center justify-center mb-3" style={{ fontSize: 32 }}>🎖️</div>
            <div className="heading-military text-xl text-[rgba(232,240,176,0.95)]">WOLF_19</div>
            <div className="font-mono text-xs text-[rgba(107,122,58,0.5)] mt-1">КАПИТАН • [ALFA]</div>
            <div className="tag-military mt-2">ID: #00419</div>
          </div>
          <div className="divider-military mb-4" />
          <div className="space-y-3">
            {[
              { label: "Рейтинг", value: "6 750", color: "#3498db" },
              { label: "К/Д рейтинг", value: "2.14", color: "#8fa040" },
              { label: "Побед", value: "441", color: "#e5a830" },
              { label: "Часов в игре", value: "1 240", color: "#9b59b6" },
            ].map(s => (
              <div key={s.label} className="flex justify-between items-center">
                <span className="font-mono text-xs text-[rgba(232,240,176,0.5)] uppercase tracking-wider">{s.label}</span>
                <span className="heading-military text-sm" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
          <div className="divider-military my-4" />
          <div className="space-y-2">
            <div className="font-mono text-[10px] text-[rgba(107,122,58,0.5)] uppercase tracking-wider">До следующего звания</div>
            <div className="flex justify-between items-center mb-1">
              <span className="heading-military text-xs text-[rgba(232,240,176,0.6)]">МАЙОР</span>
              <span className="font-mono text-xs text-[#8fa040]">68%</span>
            </div>
            <div className="xp-bar">
              <div className="xp-fill" style={{ width: "68%" }} />
            </div>
            <div className="font-mono text-[10px] text-[rgba(107,122,58,0.4)]">6 800 / 10 000 XP</div>
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          <div className="military-card p-5">
            <div className="heading-military text-sm text-[rgba(232,240,176,0.7)] mb-4">Статистика боёв</div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Всего матчей", value: "1 248" },
                { label: "Победы", value: "724" },
                { label: "Поражения", value: "524" },
                { label: "% побед", value: "58%" },
                { label: "Убийства", value: "12 840" },
                { label: "Смерти", value: "5 989" },
                { label: "Помощи", value: "3 214" },
                { label: "MVP", value: "312" },
              ].map(s => (
                <div key={s.label} className="bg-[rgba(19,22,16,0.4)] p-3 border border-[rgba(90,99,53,0.1)]">
                  <div className="heading-military text-base text-[rgba(232,240,176,0.9)]">{s.value}</div>
                  <div className="font-mono text-[10px] text-[rgba(107,122,58,0.5)] mt-0.5 uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="military-card p-5">
            <div className="heading-military text-sm text-[rgba(232,240,176,0.7)] mb-4">Любимое оружие</div>
            <div className="space-y-3">
              {[
                { name: "АКМ", kills: 4820, pct: 75 },
                { name: "AWP", kills: 2140, pct: 45 },
                { name: "M4A1", kills: 1890, pct: 40 },
                { name: "Дробовик", kills: 980, pct: 22 },
              ].map(w => (
                <div key={w.name} className="flex items-center gap-3">
                  <div className="heading-military text-xs text-[rgba(232,240,176,0.7)] w-20">{w.name}</div>
                  <div className="flex-1 xp-bar" style={{ height: 6 }}>
                    <div className="xp-fill" style={{ width: `${w.pct}%` }} />
                  </div>
                  <div className="font-mono text-xs text-[rgba(107,122,58,0.6)] w-20 text-right">{w.kills.toLocaleString()} убийств</div>
                </div>
              ))}
            </div>
          </div>

          <div className="military-card p-5">
            <div className="heading-military text-sm text-[rgba(232,240,176,0.7)] mb-3">Достижения</div>
            <div className="flex flex-wrap gap-2">
              {["🎯 Снайпер", "⚡ Молния", "🛡️ Защитник", "💀 Ликвидатор", "🏆 Чемпион", "🔥 На огне", "🌟 Ветеран"].map(a => (
                <span key={a} className="tag-military text-[rgba(232,240,176,0.7)]">{a}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── MARKET ─────────────────────── */
function MarketSection() {
  const [search, setSearch] = useState("");
  const filtered = marketItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="heading-military text-3xl text-[rgba(232,240,176,0.95)]">Рынок</h2>
          <div className="font-mono text-xs text-[rgba(107,122,58,0.5)] mt-1">ТОРГОВАЯ ПЛОЩАДКА // {marketItems.length} ПОЗИЦИЙ</div>
        </div>
        <div className="flex gap-3">
          <button className="btn-military text-sm flex items-center gap-2">
            <Icon name="Plus" size={14} />
            Выставить лот
          </button>
          <div className="flex items-center gap-2 military-card px-4 py-2">
            <Icon name="Coins" size={14} className="text-[#c4a96a]" />
            <span className="heading-military text-sm text-[#c4a96a]">2 840 ₿</span>
          </div>
        </div>
      </div>

      <div className="relative mb-5">
        <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(107,122,58,0.5)]" />
        <input
          type="text"
          placeholder="ПОИСК ПРЕДМЕТОВ..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[rgba(36,38,24,0.8)] border border-[rgba(90,99,53,0.3)] text-[rgba(232,240,176,0.8)] placeholder-[rgba(107,122,58,0.4)] pl-9 pr-4 py-2.5 font-mono text-sm focus:outline-none focus:border-[rgba(143,160,64,0.5)]"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="military-card military-card-hover p-4 flex flex-col">
            <div className="bg-[rgba(19,22,16,0.6)] border border-[rgba(90,99,53,0.15)] h-24 flex items-center justify-center mb-3 text-4xl">
              🔫
            </div>
            <div className="flex items-start justify-between mb-1">
              <div className="heading-military text-sm text-[rgba(232,240,176,0.85)] flex-1 pr-2">{item.name}</div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 flex-shrink-0"
                style={{ color: rarityColors[item.rarity], borderColor: `${rarityColors[item.rarity]}35`, border: '1px solid', background: `${rarityColors[item.rarity]}10` }}>
                {rarityLabels[item.rarity].slice(0, 3).toUpperCase()}
              </span>
            </div>
            <div className="font-rubik text-xs text-[rgba(232,240,176,0.4)] mb-1">{item.type} • {item.wear}</div>
            <div className="font-mono text-[11px] text-[rgba(107,122,58,0.4)] mb-3">от {item.seller}</div>
            <div className="divider-military mb-3" />
            <div className="flex items-center justify-between mt-auto">
              <span className="font-oswald text-lg text-[#c4a96a]">{item.price.toLocaleString()} ₿</span>
              <button className="btn-primary-military text-xs px-3 py-1.5">Купить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── CLANS ─────────────────────── */
function ClansSection() {
  return (
    <div className="p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="heading-military text-3xl text-[rgba(232,240,176,0.95)]">Кланы</h2>
          <div className="font-mono text-xs text-[rgba(107,122,58,0.5)] mt-1">ВОЙСКОВЫЕ ПОДРАЗДЕЛЕНИЯ // {clans.length} АКТИВНЫХ</div>
        </div>
        <button className="btn-primary-military text-sm flex items-center gap-2">
          <Icon name="Plus" size={14} />
          Создать клан
        </button>
      </div>

      <div className="military-card p-5 mb-5 bg-[rgba(90,99,53,0.08)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[rgba(90,99,53,0.3)] border border-[rgba(143,160,64,0.3)] flex items-center justify-center">
              <span className="heading-military text-xl text-[#8fa040]">ALFA</span>
            </div>
            <div>
              <div className="heading-military text-lg text-[rgba(232,240,176,0.95)]">ALFA GROUP</div>
              <div className="font-mono text-xs text-[rgba(107,122,58,0.5)]">Ваш клан • Ранг: СЕРЖАНТ</div>
              <div className="flex gap-2 mt-1.5">
                <span className="tag-military">45 участников</span>
                <span className="tag-military" style={{ color: "#c4a96a", borderColor: "rgba(196,169,106,0.3)", background: "rgba(196,169,106,0.05)" }}>Набор открыт</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-[rgba(107,122,58,0.5)] mb-1">РЕЙТИНГ КЛАНА</div>
            <div className="heading-military text-2xl text-[#8fa040]">11 900</div>
            <div className="font-mono text-xs text-[#e5a830]">#2 В МИРЕ</div>
          </div>
        </div>
      </div>

      <div className="military-card overflow-hidden">
        <div className="grid grid-cols-5 px-5 py-2 bg-[rgba(19,22,16,0.6)] border-b border-[rgba(90,99,53,0.2)]">
          {["#", "КЛАН", "УЧАСТНИКИ", "ПОБЕДЫ", "РЕЙТИНГ"].map(h => (
            <div key={h} className="heading-military text-[11px] text-[rgba(107,122,58,0.6)]">{h}</div>
          ))}
        </div>
        {clans.map((c, i) => (
          <div key={c.rank} className="grid grid-cols-5 px-5 py-4 border-b border-[rgba(90,99,53,0.1)] hover:bg-[rgba(61,66,40,0.15)] transition-colors cursor-pointer">
            <div className="heading-military text-sm" style={{ color: i < 3 ? Object.values(tierColors)[i] : "rgba(232,240,176,0.7)" }}>#{c.rank}</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="heading-military text-xs text-[#8fa040] border border-[rgba(143,160,64,0.3)] px-1.5 py-0.5">{c.tag}</span>
                <span className="heading-military text-sm text-[rgba(232,240,176,0.85)]">{c.name}</span>
              </div>
              <div className="font-mono text-[10px] mt-0.5" style={{ color: c.status.includes("открыт") ? "#6ab04c" : "#888" }}>{c.status}</div>
            </div>
            <div className="flex items-center gap-1.5 text-[rgba(232,240,176,0.65)]">
              <Icon name="Users" size={12} className="text-[rgba(107,122,58,0.5)]" />
              <span className="font-mono text-sm">{c.members}/50</span>
            </div>
            <div className="font-mono text-sm text-[rgba(232,240,176,0.65)]">{c.wins.toLocaleString()}</div>
            <div className="font-mono text-sm text-[#8fa040]">{c.rating.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── SETTINGS ─────────────────────── */
function SettingsSection() {
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [language, setLanguage] = useState("ru");

  return (
    <div className="p-6 animate-fade-in-up">
      <h2 className="heading-military text-3xl text-[rgba(232,240,176,0.95)] mb-6">Настройки</h2>

      <div className="grid grid-cols-2 gap-5">
        <div className="military-card p-5">
          <div className="heading-military text-sm text-[rgba(232,240,176,0.7)] mb-4 flex items-center gap-2">
            <Icon name="User" size={14} className="text-[rgba(107,122,58,0.6)]" />
            Аккаунт
          </div>
          <div className="space-y-4">
            {[
              { label: "Игровой ник", value: "WOLF_19" },
              { label: "Email", value: "wolf19@mail.ru" },
              { label: "Клан", value: "[ALFA] ALFA GROUP" },
            ].map(f => (
              <div key={f.label}>
                <div className="font-mono text-[10px] text-[rgba(107,122,58,0.5)] uppercase tracking-wider mb-1">{f.label}</div>
                <input
                  type="text"
                  defaultValue={f.value}
                  className="w-full bg-[rgba(19,22,16,0.6)] border border-[rgba(90,99,53,0.25)] text-[rgba(232,240,176,0.8)] px-3 py-2 font-rubik text-sm focus:outline-none focus:border-[rgba(143,160,64,0.4)]"
                />
              </div>
            ))}
            <button className="btn-primary-military text-sm w-full mt-2">Сохранить изменения</button>
          </div>
        </div>

        <div className="military-card p-5">
          <div className="heading-military text-sm text-[rgba(232,240,176,0.7)] mb-4 flex items-center gap-2">
            <Icon name="Gamepad2" size={14} className="text-[rgba(107,122,58,0.6)]" />
            Игра
          </div>
          <div className="space-y-4">
            {[
              { label: "Уведомления", desc: "Матчи, рейтинг, клан", val: notifications, set: setNotifications },
              { label: "Звуки", desc: "Звуки интерфейса", val: sounds, set: setSounds },
            ].map(t => (
              <div key={t.label} className="flex items-center justify-between py-2 border-b border-[rgba(90,99,53,0.15)]">
                <div>
                  <div className="heading-military text-sm text-[rgba(232,240,176,0.8)]">{t.label}</div>
                  <div className="font-rubik text-xs text-[rgba(232,240,176,0.4)]">{t.desc}</div>
                </div>
                <button
                  onClick={() => t.set(!t.val)}
                  className={`w-10 h-5 rounded-sm transition-colors relative ${t.val ? "bg-[#6b7a3a]" : "bg-[rgba(19,22,16,0.8)] border border-[rgba(90,99,53,0.3)]"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-[#131610] rounded-sm transition-all ${t.val ? "right-0.5" : "left-0.5"}`} />
                </button>
              </div>
            ))}
            <div>
              <div className="font-mono text-[10px] text-[rgba(107,122,58,0.5)] uppercase tracking-wider mb-2">Язык интерфейса</div>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full bg-[rgba(19,22,16,0.6)] border border-[rgba(90,99,53,0.25)] text-[rgba(232,240,176,0.8)] px-3 py-2 font-rubik text-sm focus:outline-none"
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>

        <div className="military-card p-5">
          <div className="heading-military text-sm text-[rgba(232,240,176,0.7)] mb-4 flex items-center gap-2">
            <Icon name="Lock" size={14} className="text-[rgba(107,122,58,0.6)]" />
            Безопасность
          </div>
          <div className="space-y-3">
            {[
              { icon: "Key", label: "Сменить пароль" },
              { icon: "Smartphone", label: "Двухфакторная аутентификация" },
              { icon: "Download", label: "Выгрузить данные" },
            ].map(b => (
              <button key={b.label} className="btn-military text-sm w-full flex items-center justify-center gap-2">
                <Icon name={b.icon} size={14} />
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="military-card p-5">
          <div className="heading-military text-sm text-[rgba(232,240,176,0.7)] mb-4 flex items-center gap-2">
            <Icon name="Wallet" size={14} className="text-[rgba(107,122,58,0.6)]" />
            Кошелёк
          </div>
          <div className="bg-[rgba(19,22,16,0.5)] border border-[rgba(90,99,53,0.2)] p-4 mb-4">
            <div className="font-mono text-xs text-[rgba(107,122,58,0.5)] mb-1">ТЕКУЩИЙ БАЛАНС</div>
            <div className="heading-military text-3xl text-[#c4a96a]">2 840 ₿</div>
            <div className="font-mono text-xs text-[rgba(107,122,58,0.4)] mt-0.5">≈ 2 840 RUB</div>
          </div>
          <div className="flex gap-3">
            <button className="btn-primary-military text-sm flex-1 flex items-center justify-center gap-1">
              <Icon name="Plus" size={13} />
              Пополнить
            </button>
            <button className="btn-military text-sm flex-1 flex items-center justify-center gap-1">
              <Icon name="ArrowUpRight" size={13} />
              Вывести
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}