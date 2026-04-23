import React, { useState } from "react";
import {
  LayoutDashboard, Users, Activity, FileText, Settings, Bell, Search,
  ChevronRight, TrendingUp, TrendingDown, Zap, Target, Gauge, Heart,
  AlertTriangle, Sparkles, Calendar, Trophy, Video, Download, MoreHorizontal,
  ArrowUpRight, Scale, Plus, Filter, Upload, FileUp, Database, Wifi,
  CheckCircle2, Circle, XCircle, Clock, Eye, Edit3, Share2, Copy,
  FileCheck, BarChart3, GitBranch, Layers, Shield, Flame, Snowflake,
  MapPin, ChevronDown, ArrowRight, Star, Timer, Dumbbell, Waves,
  Maximize2, SlidersHorizontal, Check, Play, Pause, Grid3x3, List,
} from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart,
  Bar, CartesianGrid, Legend, PieChart, Pie, Cell, ScatterChart, Scatter,
  RadialBarChart, RadialBar, Area, AreaChart,
} from "recharts";

// ================================================================
// SHARED DATA
// ================================================================
const TEAM_ATHLETES = [
  { id: 1, name: "阿部 円海", no: "#7", pos: "短距離", score: 78, trend: +6, status: "優秀", color: "emerald", type: "スピード素質型", last: "2日前", injury: "low" },
  { id: 2, name: "佐藤 美咲", no: "#12", pos: "中距離", score: 74, trend: +4, status: "優秀", color: "emerald", type: "バランス型", last: "1日前", injury: "low" },
  { id: 3, name: "田中 彩", no: "#3", pos: "跳躍", score: 72, trend: +2, status: "良好", color: "blue", type: "パワー型", last: "4日前", injury: "medium" },
  { id: 4, name: "鈴木 理子", no: "#18", pos: "長距離", score: 70, trend: +1, status: "良好", color: "blue", type: "持久型", last: "3日前", injury: "low" },
  { id: 5, name: "山田 千里", no: "#5", pos: "短距離", score: 66, trend: -1, status: "要観察", color: "amber", type: "スピード素質型", last: "5日前", injury: "medium" },
  { id: 6, name: "伊藤 葵", no: "#22", pos: "中距離", score: 58, trend: -3, status: "要介入", color: "rose", type: "不均衡型", last: "1週間前", injury: "high" },
  { id: 7, name: "小林 真菜", no: "#9", pos: "跳躍", score: 76, trend: +5, status: "優秀", color: "emerald", type: "パワー型", last: "本日", injury: "low" },
  { id: 8, name: "高橋 桜", no: "#14", pos: "短距離", score: 73, trend: +3, status: "良好", color: "blue", type: "スピード素質型", last: "2日前", injury: "low" },
  { id: 9, name: "渡辺 美羽", no: "#11", pos: "長距離", score: 68, trend: +2, status: "良好", color: "blue", type: "持久型", last: "1日前", injury: "medium" },
  { id: 10, name: "中村 愛子", no: "#6", pos: "中距離", score: 62, trend: 0, status: "要観察", color: "amber", type: "バランス型", last: "3日前", injury: "medium" },
  { id: 11, name: "松本 莉乃", no: "#20", pos: "跳躍", score: 71, trend: +4, status: "良好", color: "blue", type: "パワー型", last: "本日", injury: "low" },
  { id: 12, name: "吉田 楓", no: "#15", pos: "短距離", score: 69, trend: +1, status: "良好", color: "blue", type: "スピード素質型", last: "4日前", injury: "low" },
];

const RADAR_DATA = [
  { axis: "下肢パワー", value: 95, avg: 72, fullMark: 100 },
  { axis: "水平推進力", value: 80, avg: 68, fullMark: 100 },
  { axis: "SSC能力", value: 95, avg: 70, fullMark: 100 },
  { axis: "左右バランス", value: 85, avg: 75, fullMark: 100 },
  { axis: "柔軟性", value: 65, avg: 71, fullMark: 100 },
  { axis: "動的安定性", value: 50, avg: 69, fullMark: 100 },
];

// ================================================================
// ATOMS
// ================================================================
const SoftCard = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-[0_4px_20px_0_rgba(0,0,0,0.04)] border border-slate-100 ${className}`}>
    {children}
  </div>
);

const GradientIcon = ({ Icon, gradient, size = "md" }) => {
  const sizeClass = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-14 h-14" : "w-12 h-12";
  const iconSize = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-7 h-7" : "w-6 h-6";
  return (
    <div className={`${sizeClass} rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} shadow-md`}>
      <Icon className={`${iconSize} text-white`} strokeWidth={2.2} />
    </div>
  );
};

const StatusChip = ({ status, color }) => {
  const map = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-sky-50 text-sky-600 border-sky-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    slate: "bg-slate-50 text-slate-600 border-slate-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[color]}`}>
      {status}
    </span>
  );
};

const AthleteAvatar = ({ name, size = "md", variant = 0 }) => {
  const gradients = [
    "from-rose-400 to-red-500", "from-indigo-400 to-purple-500",
    "from-emerald-400 to-teal-500", "from-amber-400 to-orange-500",
    "from-sky-400 to-blue-500", "from-violet-400 to-fuchsia-500",
  ];
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-14 h-14 text-lg" : "w-10 h-10 text-sm";
  const initials = name.slice(0, 1);
  return (
    <div className={`${sizeClass} rounded-xl bg-gradient-to-br ${gradients[variant % 6]} text-white font-bold flex items-center justify-center shadow-sm shrink-0`}>
      {initials}
    </div>
  );
};

const KpiCard = ({ label, value, sub, delta, up, Icon, gradient }) => (
  <SoftCard className="p-5">
    <div className="flex items-start justify-between">
      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</div>
        <div className="text-3xl font-extrabold text-slate-800 mt-1.5">{value}</div>
        <div className="flex items-center gap-1.5 mt-2 text-xs">
          <span className={`inline-flex items-center gap-0.5 font-semibold ${up ? "text-emerald-500" : "text-rose-500"}`}>
            {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {delta}
          </span>
          <span className="text-slate-400">{sub}</span>
        </div>
      </div>
      <GradientIcon Icon={Icon} gradient={gradient} />
    </div>
  </SoftCard>
);

const MiniStat = ({ label, value, Icon, gradient, trend }) => (
  <SoftCard className="p-4">
    <div className="flex items-center gap-3">
      <GradientIcon Icon={Icon} gradient={gradient} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{label}</div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold text-slate-800">{value}</span>
          {trend && <span className="text-[10px] font-bold text-emerald-500">{trend}</span>}
        </div>
      </div>
    </div>
  </SoftCard>
);

const SectionHeader = ({ title, sub, right }) => (
  <div className="flex items-end justify-between mb-4">
    <div>
      <h3 className="text-base font-extrabold text-slate-800">{title}</h3>
      {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
    </div>
    {right}
  </div>
);

const TabBar = ({ tabs, current, setCurrent }) => (
  <div className="inline-flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-100 shadow-sm">
    {tabs.map((t) => {
      const active = current === t.key;
      return (
        <button
          key={t.key}
          onClick={() => setCurrent(t.key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
            active ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          {t.Icon && <t.Icon className="w-3.5 h-3.5" />}
          {t.label}
          {t.count != null && (
            <span className={`ml-0.5 text-[10px] font-extrabold px-1.5 py-0.5 rounded ${active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
              {t.count}
            </span>
          )}
        </button>
      );
    })}
  </div>
);

const FilterPill = ({ label, active, onClick, count }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
      active ? "bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-sm shadow-rose-200" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
    }`}
  >
    {label}
    {count != null && (
      <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${active ? "bg-white/20" : "bg-slate-100"}`}>
        {count}
      </span>
    )}
  </button>
);

// ================================================================
// SIDEBAR
// ================================================================
const Sidebar = ({ current, setCurrent }) => {
  const items = [
    { key: "dashboard", label: "ダッシュボード", Icon: LayoutDashboard },
    { key: "athletes", label: "選手一覧", Icon: Users },
    { key: "measure", label: "測定データ", Icon: Activity },
    { key: "analysis", label: "分析", Icon: Gauge },
    { key: "prescribe", label: "AI処方", Icon: Sparkles },
    { key: "reports", label: "レポート出力", Icon: FileText },
    { key: "video", label: "動画評価", Icon: Video },
    { key: "settings", label: "設定", Icon: Settings },
  ];
  return (
    <aside className="w-64 bg-white border-r border-slate-100 p-5 flex flex-col shrink-0">
      <div className="flex items-center gap-2.5 px-2 pb-6 mb-4 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 via-red-500 to-orange-500 flex items-center justify-center shadow-md">
          <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <div className="font-extrabold text-slate-800 tracking-tight leading-none">VALORISE</div>
          <div className="text-[10px] text-slate-400 tracking-wider mt-0.5">PHYSICAL DATA OS</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map(({ key, label, Icon }) => {
          const active = current === key;
          return (
            <button
              key={key}
              onClick={() => setCurrent(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active ? "bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-md shadow-rose-200" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={active ? 2.5 : 2} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white">
        <div className="text-xs text-slate-300 font-medium">今週のコーチング</div>
        <div className="text-sm font-bold mt-1 leading-snug">中越式8週間プランの<br />Phase 2に進行中</div>
        <button className="mt-3 w-full bg-white text-slate-900 text-xs font-bold py-2 rounded-xl hover:bg-slate-100 transition">進捗を見る</button>
      </div>
    </aside>
  );
};

// ================================================================
// TOP BAR (dynamic per page)
// ================================================================
const PAGE_META = {
  dashboard: { title: "総合ダッシュボード", crumbs: ["チーム", "UNIQLO 女子陸上競技部", "総合ダッシュボード"] },
  athletes: { title: "選手一覧", crumbs: ["チーム", "UNIQLO 女子陸上競技部", "選手一覧"] },
  measure: { title: "測定データ", crumbs: ["データ管理", "測定データ"] },
  analysis: { title: "分析", crumbs: ["インサイト", "分析"] },
  prescribe: { title: "AI処方", crumbs: ["トレーニング", "AI処方"] },
  reports: { title: "レポート出力", crumbs: ["成果物", "レポート出力"] },
  video: { title: "動画評価", crumbs: ["データ管理", "動画評価"] },
  settings: { title: "設定", crumbs: ["管理", "設定"] },
};

const TopBar = ({ page }) => {
  const meta = PAGE_META[page] || PAGE_META.dashboard;
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-transparent">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          {meta.crumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight className="w-3 h-3" />}
              <span className={i === meta.crumbs.length - 1 ? "text-slate-600 font-semibold" : ""}>{c}</span>
            </React.Fragment>
          ))}
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800 mt-1 tracking-tight">{meta.title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="選手・測定項目を検索"
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm w-64 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition" />
        </div>
        <button className="relative w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">
          <Bell className="w-4 h-4 text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2.5 pl-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-bold flex items-center justify-center text-sm shadow-md">NK</div>
          <div className="text-sm leading-tight">
            <div className="font-semibold text-slate-800">中越 清登</div>
            <div className="text-xs text-slate-400">ヘッドコーチ</div>
          </div>
        </div>
      </div>
    </header>
  );
};

// ================================================================
// PAGE 1: DASHBOARD (from v1)
// ================================================================
const trendData = [
  { m: "5月", sprint: 62, power: 70, agility: 60 }, { m: "6月", sprint: 65, power: 74, agility: 63 },
  { m: "7月", sprint: 68, power: 78, agility: 65 }, { m: "8月", sprint: 70, power: 81, agility: 67 },
  { m: "9月", sprint: 73, power: 86, agility: 69 }, { m: "10月", sprint: 76, power: 92, agility: 71 },
];
const positionData = [
  { pos: "短距離", power: 88, sprint: 85, endurance: 55 }, { pos: "中距離", power: 72, sprint: 78, endurance: 80 },
  { pos: "長距離", power: 60, sprint: 62, endurance: 92 }, { pos: "跳躍", power: 92, sprint: 82, endurance: 58 },
  { pos: "投擲", power: 90, sprint: 65, endurance: 50 },
];
const recentMeasurements = [
  { athlete: "阿部 円海", item: "SL RDL 挙上速度", value: "R 1.11 / L 1.05 m/s", time: "1時間前" },
  { athlete: "佐藤 美咲", item: "CMJ", value: "34.2 cm", time: "2時間前" },
  { athlete: "田中 彩", item: "P-SLR (他動)", value: "R 73° / L 76°", time: "3時間前" },
  { athlete: "鈴木 理子", item: "片脚バウンディング", value: "R 720 / L 735 cm", time: "本日" },
  { athlete: "山田 千里", item: "ドロップSQ", value: "スコア 2/1/2", time: "昨日" },
];

const DashboardPage = () => (
  <div className="px-8 pb-8">
    <div className="grid grid-cols-4 gap-5 mb-5">
      <KpiCard label="登録選手数" value="24" sub="前月比" delta="+2名" up Icon={Users} gradient="from-rose-500 to-red-500" />
      <KpiCard label="今月の測定件数" value="128" sub="前月比" delta="+18%" up Icon={Activity} gradient="from-indigo-500 to-purple-500" />
      <KpiCard label="平均総合スコア" value="72.4" sub="前回比" delta="+3.2" up Icon={Gauge} gradient="from-emerald-500 to-teal-500" />
      <KpiCard label="要注意アラート" value="3" sub="今週発生" delta="-1件" up={false} Icon={AlertTriangle} gradient="from-amber-500 to-orange-500" />
    </div>

    <div className="grid grid-cols-12 gap-5 mb-5">
      <SoftCard className="p-6 col-span-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">フィジカルプロファイル</div>
            <div className="flex items-center gap-3 mt-1">
              <h3 className="text-xl font-extrabold text-slate-800">阿部 円海</h3>
              <StatusChip status="Team 1位" color="emerald" />
              <span className="text-xs text-slate-400">短距離 / 100m</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> PDF出力
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-7 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: "#475569", fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="チーム平均" dataKey="avg" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.35} strokeWidth={1.5} />
                <Radar name="本人" dataKey="value" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} strokeWidth={2.5} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#64748b", paddingTop: 10 }} iconType="circle" />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-5 space-y-2.5">
            {RADAR_DATA.map((r) => {
              const diff = r.value - r.avg;
              const barColor = r.value >= 80 ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                : r.value >= 60 ? "bg-gradient-to-r from-sky-400 to-indigo-500"
                : "bg-gradient-to-r from-amber-400 to-rose-500";
              return (
                <div key={r.axis} className="flex items-center gap-3">
                  <div className="w-24 text-xs font-semibold text-slate-600 shrink-0">{r.axis}</div>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full ${barColor} rounded-full`} style={{ width: `${r.value}%` }} />
                  </div>
                  <div className="w-14 text-right">
                    <span className="text-sm font-extrabold text-slate-800">{r.value}</span>
                    <span className={`ml-1 text-[10px] font-bold ${diff >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                      {diff >= 0 ? "+" : ""}{diff}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">総合平均スコア</div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <div className="text-4xl font-extrabold">78</div>
              <div className="text-sm text-emerald-400 font-bold">+6 vs 前回</div>
            </div>
          </div>
          <div className="text-right max-w-xs">
            <div className="text-xs text-slate-400 font-medium">コーチメッセージ</div>
            <div className="text-sm font-bold mt-0.5 leading-snug">高弾性・速度主導でランニングをコントロール</div>
          </div>
        </div>
      </SoftCard>

      <SoftCard className="col-span-4 p-6 flex flex-col">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-md shadow-violet-200">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI 処方（自動生成）</div>
        </div>
        <h3 className="text-lg font-extrabold text-slate-800 mt-1 leading-snug">8週間ロードマップ — Phase 2</h3>
        <div className="text-xs text-slate-400 mt-0.5">片脚での基礎筋力構築 / Week 3–4</div>

        <div className="mt-4 space-y-2.5 flex-1">
          {[
            { w: "WHY", t: "高エキセントリック時に体幹・骨盤の崩れを検出（右3/左2）", c: "rose" },
            { w: "HOW", t: "スプリットスクワット＋フォワードランジで左右差を整える", c: "sky" },
            { w: "FUTURE", t: "推進力の直進化・ロスゼロの走りに接続", c: "emerald" },
          ].map((b) => (
            <div key={b.w} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
              <div className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md text-white shrink-0 ${
                b.c === "rose" ? "bg-rose-500" : b.c === "sky" ? "bg-sky-500" : "bg-emerald-500"}`}>{b.w}</div>
              <div className="text-xs text-slate-700 leading-relaxed">{b.t}</div>
            </div>
          ))}
        </div>

        <button className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm font-bold flex items-center justify-center gap-2 hover:from-slate-800 hover:to-slate-700 transition shadow-md">
          処方詳細を開く <ArrowUpRight className="w-4 h-4" />
        </button>
      </SoftCard>
    </div>

    <div className="grid grid-cols-12 gap-5 mb-5">
      <SoftCard className="col-span-7 p-6">
        <SectionHeader title="チーム能力推移" sub="過去6ヶ月 / 領域別スコア平均"
          right={<div className="flex items-center gap-1 text-xs font-semibold">
            {["1M", "3M", "6M", "1Y"].map((k, i) => (
              <button key={k} className={`px-3 py-1 rounded-lg ${i === 2 ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}>{k}</button>
            ))}
          </div>} />
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
              <YAxis domain={[40, 100]} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#64748b", paddingTop: 6 }} />
              <Line type="monotone" dataKey="power" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: "#f43f5e", strokeWidth: 0 }} name="パワー" />
              <Line type="monotone" dataKey="sprint" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }} name="スプリント" />
              <Line type="monotone" dataKey="agility" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: "#10b981", strokeWidth: 0 }} name="アジリティ" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SoftCard>

      <SoftCard className="col-span-5 p-6">
        <SectionHeader title="ポジション別プロファイル" sub="領域別チーム平均" right={<button className="text-xs font-semibold text-slate-500 hover:text-slate-700">詳細</button>} />
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={positionData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="pos" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} cursor={{ fill: "#f1f5f9" }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#64748b", paddingTop: 6 }} />
              <Bar dataKey="power" fill="#f43f5e" radius={[6, 6, 0, 0]} name="パワー" />
              <Bar dataKey="sprint" fill="#6366f1" radius={[6, 6, 0, 0]} name="スプリント" />
              <Bar dataKey="endurance" fill="#10b981" radius={[6, 6, 0, 0]} name="持久力" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SoftCard>
    </div>

    <div className="grid grid-cols-12 gap-5">
      <SoftCard className="col-span-8 p-6">
        <SectionHeader title="トップパフォーマー" sub="総合スコアでソート / 10月度"
          right={<button className="text-xs font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-1">全24名を表示 <ArrowUpRight className="w-3 h-3" /></button>} />
        <table className="w-full">
          <thead>
            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="text-left pb-3">選手</th>
              <th className="text-left pb-3">ポジション</th>
              <th className="text-right pb-3">総合スコア</th>
              <th className="text-right pb-3">前回比</th>
              <th className="text-right pb-3">ステータス</th>
            </tr>
          </thead>
          <tbody>
            {TEAM_ATHLETES.slice(0, 6).map((a, i) => (
              <tr key={a.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm ${
                      i === 0 ? "bg-gradient-to-br from-amber-400 to-orange-500"
                      : i === 1 ? "bg-gradient-to-br from-slate-300 to-slate-400"
                      : i === 2 ? "bg-gradient-to-br from-amber-600 to-amber-700"
                      : "bg-gradient-to-br from-indigo-400 to-purple-500"}`}>
                      {i < 3 ? <Trophy className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <div className="text-sm font-bold text-slate-800">{a.name}</div>
                  </div>
                </td>
                <td className="py-3 text-sm text-slate-600">{a.pos}</td>
                <td className="py-3 text-right"><span className="text-lg font-extrabold text-slate-800">{a.score}</span></td>
                <td className="py-3 text-right">
                  <span className={`text-xs font-bold ${a.trend >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    {a.trend >= 0 ? "+" : ""}{a.trend}
                  </span>
                </td>
                <td className="py-3 text-right"><StatusChip status={a.status} color={a.color} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SoftCard>

      <SoftCard className="col-span-4 p-6">
        <SectionHeader title="直近の測定" sub="自動取込・手入力ログ" />
        <div className="space-y-3">
          {recentMeasurements.map((m, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-bold text-slate-800 truncate">{m.athlete}</div>
                  <div className="text-[10px] text-slate-400 shrink-0">{m.time}</div>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {m.item} — <span className="font-semibold text-slate-700">{m.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">全件を見る</button>
      </SoftCard>
    </div>
  </div>
);

// ================================================================
// PAGE 2: ATHLETES LIST (選手一覧)
// ================================================================
const AthletesPage = () => {
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");

  const miniRadar = (score) => [
    { a: "スピード", v: Math.round(score * 0.9 + 10) },
    { a: "パワー", v: Math.round(score * 1.1) },
    { a: "SSC", v: Math.round(score * 0.95) },
    { a: "バランス", v: Math.round(score * 0.85 + 15) },
    { a: "柔軟性", v: Math.round(score * 0.8 + 10) },
    { a: "安定性", v: Math.round(score * 0.75 + 15) },
  ];

  return (
    <div className="px-8 pb-8">
      <div className="grid grid-cols-4 gap-5 mb-5">
        <MiniStat label="登録選手数" value="24名" Icon={Users} gradient="from-rose-500 to-red-500" trend="+2" />
        <MiniStat label="優秀" value="8名" Icon={Trophy} gradient="from-emerald-500 to-teal-500" />
        <MiniStat label="要観察" value="4名" Icon={Eye} gradient="from-amber-500 to-orange-500" />
        <MiniStat label="要介入" value="1名" Icon={AlertTriangle} gradient="from-rose-500 to-red-500" />
      </div>

      <SoftCard className="p-5 mb-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <FilterPill label="すべて" count={24} active={filter === "all"} onClick={() => setFilter("all")} />
            <FilterPill label="短距離" count={6} active={filter === "sp"} onClick={() => setFilter("sp")} />
            <FilterPill label="中距離" count={5} active={filter === "mid"} onClick={() => setFilter("mid")} />
            <FilterPill label="長距離" count={7} active={filter === "long"} onClick={() => setFilter("long")} />
            <FilterPill label="跳躍" count={4} active={filter === "jump"} onClick={() => setFilter("jump")} />
            <FilterPill label="投擲" count={2} active={filter === "throw"} onClick={() => setFilter("throw")} />
            <div className="w-px h-6 bg-slate-200 mx-1" />
            <FilterPill label="要介入のみ" active={filter === "alert"} onClick={() => setFilter("alert")} />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 p-0.5 bg-slate-100 rounded-lg">
              <button onClick={() => setView("grid")} className={`p-1.5 rounded-md transition ${view === "grid" ? "bg-white shadow-sm" : ""}`}>
                <Grid3x3 className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={() => setView("list")} className={`p-1.5 rounded-md transition ${view === "list" ? "bg-white shadow-sm" : ""}`}>
                <List className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 text-white text-xs font-bold shadow-md shadow-rose-200 hover:opacity-90 transition">
              <Plus className="w-4 h-4" /> 選手を追加
            </button>
          </div>
        </div>
      </SoftCard>

      {view === "grid" ? (
        <div className="grid grid-cols-3 gap-5">
          {TEAM_ATHLETES.map((a, i) => (
            <SoftCard key={a.id} className="p-5 hover:shadow-[0_8px_30px_0_rgba(0,0,0,0.08)] transition cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <AthleteAvatar name={a.name} variant={i} size="lg" />
                  <div>
                    <div className="font-extrabold text-slate-800">{a.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <span className="font-semibold">{a.no}</span>
                      <span>•</span>
                      <span>{a.pos}</span>
                    </div>
                  </div>
                </div>
                <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center">
                  <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={miniRadar(a.score)}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="a" tick={{ fill: "#94a3b8", fontSize: 8 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar dataKey="v" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.35} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">総合スコア</div>
                  <div className="flex items-baseline gap-1.5">
                    <div className="text-3xl font-extrabold text-slate-800">{a.score}</div>
                    <div className={`text-xs font-bold ${a.trend >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                      {a.trend >= 0 ? "+" : ""}{a.trend}
                    </div>
                  </div>
                  <div className="mt-2">
                    <StatusChip status={a.status} color={a.color} />
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400">
                    最終測定: <span className="font-semibold text-slate-600">{a.last}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{a.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  {a.injury === "high" && <span className="flex items-center gap-1 text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md"><AlertTriangle className="w-3 h-3" /> 怪我リスク高</span>}
                  {a.injury === "medium" && <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">注意</span>}
                  {a.injury === "low" && <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md"><CheckCircle2 className="w-3 h-3" /> 良好</span>}
                </div>
              </div>
            </SoftCard>
          ))}
        </div>
      ) : (
        <SoftCard className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="text-left pb-3">選手</th>
                <th className="text-left pb-3">ポジション</th>
                <th className="text-left pb-3">タイプ</th>
                <th className="text-right pb-3">スコア</th>
                <th className="text-right pb-3">前回比</th>
                <th className="text-right pb-3">最終測定</th>
                <th className="text-right pb-3">ステータス</th>
              </tr>
            </thead>
            <tbody>
              {TEAM_ATHLETES.map((a, i) => (
                <tr key={a.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <AthleteAvatar name={a.name} variant={i} size="sm" />
                      <div>
                        <div className="text-sm font-bold text-slate-800">{a.name}</div>
                        <div className="text-[10px] text-slate-400">{a.no}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-slate-600">{a.pos}</td>
                  <td className="py-3 text-xs text-slate-500">{a.type}</td>
                  <td className="py-3 text-right"><span className="text-base font-extrabold text-slate-800">{a.score}</span></td>
                  <td className="py-3 text-right">
                    <span className={`text-xs font-bold ${a.trend >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                      {a.trend >= 0 ? "+" : ""}{a.trend}
                    </span>
                  </td>
                  <td className="py-3 text-right text-xs text-slate-500">{a.last}</td>
                  <td className="py-3 text-right"><StatusChip status={a.status} color={a.color} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </SoftCard>
      )}
    </div>
  );
};

// ================================================================
// PAGE 3: MEASUREMENTS (測定データ)
// ================================================================
const MeasurementsPage = () => {
  const [tab, setTab] = useState("manual");
  const [category, setCategory] = useState("sprint");

  const categories = {
    sprint: {
      label: "SPRINT",
      icon: Timer,
      gradient: "from-rose-500 to-orange-500",
      items: [
        { name: "5m Split", unit: "秒", val: "1.02", target: "< 1.05", ok: true },
        { name: "10m Split", unit: "秒", val: "1.83", target: "< 1.80", ok: false },
        { name: "30m Sprint", unit: "秒", val: "4.25", target: "< 4.20", ok: false },
        { name: "Max Velocity", unit: "km/h", val: "33.5", target: "> 32.0", ok: true },
      ],
    },
    jump: {
      label: "JUMP",
      icon: Flame,
      gradient: "from-indigo-500 to-purple-500",
      items: [
        { name: "CMJ", unit: "cm", val: "36.1", target: "> 35", ok: true },
        { name: "SCMJ", unit: "cm", val: "+12.5", target: "> +10", ok: true },
        { name: "Rebound Jump Index", unit: "RSI", val: "2.75", target: "> 2.0", ok: true },
        { name: "片脚CMJ (R/L)", unit: "cm", val: "22.9 / 28.6", target: "差 < 10%", ok: false },
      ],
    },
    strength: {
      label: "STRENGTH",
      icon: Dumbbell,
      gradient: "from-emerald-500 to-teal-500",
      items: [
        { name: "Squat 1RM", unit: "xBW", val: "1.25", target: "> 1.6", ok: false },
        { name: "Deadlift 1RM", unit: "xBW", val: "1.57", target: "> 2.0", ok: false },
        { name: "Bench Press 1RM", unit: "xBW", val: "1.07", target: "> 1.2", ok: false },
      ],
    },
    power: {
      label: "POWER",
      icon: Zap,
      gradient: "from-amber-500 to-orange-500",
      items: [
        { name: "Push Press Velocity", unit: "m/s", val: "1.89", target: "> 1.5", ok: true },
        { name: "SL RDL 挙上速度 (R)", unit: "m/s", val: "1.11", target: "> 1.0", ok: true },
        { name: "SL RDL 挙上速度 (L)", unit: "m/s", val: "1.05", target: "> 1.0", ok: true },
      ],
    },
    coord: {
      label: "COORD",
      icon: Waves,
      gradient: "from-sky-500 to-cyan-500",
      items: [
        { name: "Med Ball Throw (Overhead)", unit: "m", val: "-", target: "-", ok: null },
        { name: "Rotational Throw (R)", unit: "m", val: "-", target: "-", ok: null },
        { name: "Rotational Throw (L)", unit: "m", val: "-", target: "-", ok: null },
      ],
    },
    flex: {
      label: "FLEX",
      icon: GitBranch,
      gradient: "from-violet-500 to-fuchsia-500",
      items: [
        { name: "A-SLR (R)", unit: "°", val: "64", target: "> 70", ok: false },
        { name: "P-SLR (R)", unit: "°", val: "73", target: "> 75", ok: false },
        { name: "A-SLR (L)", unit: "°", val: "75", target: "> 70", ok: true },
        { name: "P-SLR (L)", unit: "°", val: "76", target: "> 75", ok: true },
        { name: "股関節外旋 (R/L)", unit: "°", val: "34 / 36", target: "差 < 5°", ok: true },
      ],
    },
  };

  const cat = categories[category];

  return (
    <div className="px-8 pb-8">
      <div className="flex items-center justify-between mb-5">
        <TabBar current={tab} setCurrent={setTab} tabs={[
          { key: "manual", label: "手入力", Icon: Edit3, count: 12 },
          { key: "csv", label: "CSV一括", Icon: FileUp },
          { key: "video", label: "動画アップロード", Icon: Video },
          { key: "gps", label: "GPS取込", Icon: Wifi },
        ]} />
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition">
            <Download className="w-4 h-4" /> エクスポート
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 text-white text-xs font-bold shadow-md shadow-rose-200">
            <Check className="w-4 h-4" /> セッション確定
          </button>
        </div>
      </div>

      {tab === "manual" && (
        <div className="grid grid-cols-12 gap-5">
          <SoftCard className="col-span-3 p-5">
            <SectionHeader title="対象選手" sub="検索または直近から選択" />
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="選手名で検索"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100" />
            </div>
            <div className="space-y-1 max-h-[520px] overflow-auto">
              {TEAM_ATHLETES.slice(0, 8).map((a, i) => (
                <button key={a.id} className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition ${
                  i === 0 ? "bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100" : "hover:bg-slate-50"
                }`}>
                  <AthleteAvatar name={a.name} variant={i} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-800 truncate">{a.name}</div>
                    <div className="text-[10px] text-slate-400">{a.pos} / {a.no}</div>
                  </div>
                  {i === 0 && <ArrowRight className="w-3.5 h-3.5 text-rose-500" />}
                </button>
              ))}
            </div>
          </SoftCard>

          <SoftCard className="col-span-9 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2026年4月23日</span>
                  <span>•</span>
                  <span>Session #2026-042</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-xl font-extrabold text-slate-800">阿部 円海</h3>
                  <StatusChip status="測定中" color="amber" />
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">入力進捗</div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-36 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" style={{ width: "64%" }} />
                  </div>
                  <span className="text-sm font-extrabold text-slate-800">16 / 25</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-5 pb-5 border-b border-slate-100 overflow-x-auto">
              {Object.entries(categories).map(([k, v]) => {
                const active = category === k;
                return (
                  <button key={k} onClick={() => setCategory(k)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      active ? `bg-gradient-to-br ${v.gradient} text-white shadow-md` : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}>
                    <v.icon className="w-3.5 h-3.5" />
                    {v.label}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              {cat.items.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-3 items-center p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition">
                  <div className="col-span-4">
                    <div className="text-sm font-bold text-slate-800">{item.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Target: {item.target}</div>
                  </div>
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <input type="text" defaultValue={item.val !== "-" ? item.val : ""} placeholder="未入力"
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100" />
                      <span className="text-xs font-semibold text-slate-500 w-10">{item.unit}</span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    {item.ok === true && <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg"><CheckCircle2 className="w-3.5 h-3.5" /> 基準クリア</span>}
                    {item.ok === false && <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg"><XCircle className="w-3.5 h-3.5" /> 基準未達</span>}
                    {item.ok === null && <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg"><Circle className="w-3.5 h-3.5" /> 未入力</span>}
                  </div>
                  <div className="col-span-1 text-right">
                    <button className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center ml-auto">
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between pt-5 border-t border-slate-100">
              <button className="text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1">
                <ArrowRight className="w-3.5 h-3.5 rotate-180" /> 前のカテゴリ
              </button>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition">下書き保存</button>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-xs font-bold">
                  次のカテゴリ <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </SoftCard>
        </div>
      )}

      {tab === "csv" && (
        <div className="grid grid-cols-12 gap-5">
          <SoftCard className="col-span-8 p-8">
            <SectionHeader title="CSV / TSV 一括アップロード" sub="複数選手・複数項目を一度に取込" />
            <div className="mt-2 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center bg-gradient-to-br from-slate-50 to-white">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div className="mt-4 text-base font-extrabold text-slate-800">ファイルをドロップ、または選択</div>
              <div className="text-xs text-slate-500 mt-1">CSV / TSV / Excel (.xlsx) に対応 / 最大 10MB</div>
              <button className="mt-5 px-5 py-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-sm font-bold shadow-md shadow-indigo-200">
                ファイルを選ぶ
              </button>
              <div className="mt-5 flex items-center justify-center gap-4 text-[11px] text-slate-400">
                <a className="font-semibold text-indigo-500 hover:underline cursor-pointer">テンプレートをダウンロード</a>
                <span>•</span>
                <a className="font-semibold text-indigo-500 hover:underline cursor-pointer">フォーマット仕様</a>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">最近のアップロード</div>
              {[
                { file: "measurements_2026-04-22.csv", status: "取込完了", rows: 180, color: "emerald", time: "本日 10:42" },
                { file: "team_bulk_april.xlsx", status: "検証エラー 3件", rows: 240, color: "amber", time: "昨日 16:15" },
                { file: "sprint_session_0418.csv", status: "取込完了", rows: 48, color: "emerald", time: "4/18" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <FileUp className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-800 truncate">{f.file}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{f.rows}行 / {f.time}</div>
                  </div>
                  <StatusChip status={f.status} color={f.color} />
                </div>
              ))}
            </div>
          </SoftCard>

          <SoftCard className="col-span-4 p-6">
            <SectionHeader title="データ検証" sub="アップロード前に整合性確認" />
            <div className="space-y-2.5">
              {[
                { label: "選手ID整合性", status: "OK", detail: "24/24 マッチ", ok: true },
                { label: "測定項目マスタ", status: "OK", detail: "全項目有効", ok: true },
                { label: "数値型チェック", status: "WARN", detail: "3行で数値変換エラー", ok: false },
                { label: "重複検出", status: "OK", detail: "重複なし", ok: true },
                { label: "日付範囲", status: "OK", detail: "2026-04-01 〜 04-22", ok: true },
              ].map((v, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  {v.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-700">{v.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{v.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800 leading-relaxed">
                  数値変換エラー3件を修正後、「取込確定」を押してください。
                </div>
              </div>
            </div>
          </SoftCard>
        </div>
      )}

      {tab === "gps" && (
        <div className="grid grid-cols-12 gap-5">
          <SoftCard className="col-span-8 p-6">
            <SectionHeader title="GPSデータ統合" sub="既存GPSシステムからのCSV取込" />
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { name: "Catapult", status: "connected", color: "emerald", icon: Wifi },
                { name: "STATSports", status: "connected", color: "emerald", icon: Wifi },
                { name: "その他", status: "CSV対応", color: "blue", icon: FileUp },
              ].map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 text-center">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-white shadow-sm flex items-center justify-center mb-2">
                    <p.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="text-sm font-extrabold text-slate-800">{p.name}</div>
                  <div className={`text-[10px] font-bold mt-1 inline-block px-2 py-0.5 rounded ${p.color === "emerald" ? "bg-emerald-50 text-emerald-600" : "bg-sky-50 text-sky-600"}`}>
                    {p.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">統合分析：スプリント発揮率</div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" dataKey="test" name="測定値" domain={[28, 36]}
                      label={{ value: "Test Max Speed (km/h)", position: "insideBottom", offset: -5, fontSize: 10, fill: "#94a3b8" }}
                      tick={{ fill: "#64748b", fontSize: 10 }} />
                    <YAxis type="number" dataKey="game" name="試合値" domain={[28, 36]}
                      label={{ value: "Game Max (km/h)", angle: -90, position: "insideLeft", fontSize: 10, fill: "#94a3b8" }}
                      tick={{ fill: "#64748b", fontSize: 10 }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                    <Scatter data={[
                      { test: 33.5, game: 32.4, label: "A" }, { test: 32.0, game: 31.2, label: "B" },
                      { test: 30.8, game: 30.1, label: "C" }, { test: 34.1, game: 29.8, label: "D" },
                      { test: 29.8, game: 29.0, label: "E" }, { test: 31.5, game: 30.9, label: "F" },
                    ]} fill="#f43f5e" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </SoftCard>

          <SoftCard className="col-span-4 p-6">
            <SectionHeader title="発揮率ランキング" sub="能力値 vs 実戦値" />
            <div className="space-y-3">
              {[
                { rank: "A", util: 96, status: "HIGH PERFORMANCE", test: "33.5", game: "32.4", color: "emerald" },
                { rank: "B", util: 92, status: "良好", test: "32.0", game: "29.5", color: "emerald" },
                { rank: "C", util: 88, status: "良好", test: "31.0", game: "27.3", color: "blue" },
                { rank: "D", util: 87, status: "未発揮", test: "34.1", game: "29.8", color: "amber" },
              ].map((r, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-800">Player {r.rank}</span>
                      <StatusChip status={r.status} color={r.color} />
                    </div>
                    <div className="text-lg font-extrabold text-slate-800">{r.util}%</div>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className={`h-full rounded-full ${r.util >= 95 ? "bg-gradient-to-r from-emerald-400 to-emerald-500" : r.util >= 90 ? "bg-gradient-to-r from-sky-400 to-indigo-500" : "bg-gradient-to-r from-amber-400 to-orange-500"}`} style={{ width: `${r.util}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-500">
                    <span>Test {r.test} km/h</span>
                    <span>Game {r.game} km/h</span>
                  </div>
                </div>
              ))}
            </div>
          </SoftCard>
        </div>
      )}

      {tab === "video" && (
        <SoftCard className="p-8">
          <SectionHeader title="動画アップロード＋評価" sub="体幹・骨盤・膝の3軸スコアリング" />
          <div className="grid grid-cols-2 gap-5 mt-2">
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center bg-gradient-to-br from-slate-50 to-white">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div className="mt-4 text-base font-extrabold text-slate-800">動画をアップロード</div>
              <div className="text-xs text-slate-500 mt-1">MP4 / MOV / 最大 500MB</div>
              <button className="mt-5 px-5 py-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white text-sm font-bold shadow-md shadow-rose-200">選択</button>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">評価フォーム（ドロップSQ）</div>
              <div className="space-y-3">
                {["体幹", "骨盤", "膝"].map((part, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-bold text-slate-700">{part}</div>
                      <div className="text-[10px] text-slate-400">1=安定 / 3=崩れ</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3].map((s) => (
                        <button key={s} className={`flex-1 py-2 rounded-lg text-sm font-extrabold transition ${
                          s === (i === 2 ? 3 : i === 1 ? 1 : 1)
                            ? s === 3 ? "bg-rose-500 text-white shadow-md"
                              : s === 2 ? "bg-amber-500 text-white shadow-md"
                              : "bg-emerald-500 text-white shadow-md"
                            : "bg-white text-slate-500 border border-slate-200"
                        }`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-100">
                  <div className="text-[11px] font-bold text-rose-600 uppercase">総合スコア</div>
                  <div className="text-2xl font-extrabold text-rose-700 mt-1">1 / 1 / 3</div>
                  <div className="text-xs text-rose-600 mt-1">膝のKnee-in顕著、体幹は安定</div>
                </div>
              </div>
            </div>
          </div>
        </SoftCard>
      )}
    </div>
  );
};

// ================================================================
// PAGE 4: ANALYSIS (分析)
// ================================================================
const AnalysisPage = () => {
  const [subtab, setSubtab] = useState("overall");

  const typeDistribution = [
    { name: "スピード素質型", value: 7, color: "#f43f5e" },
    { name: "パワー型", value: 5, color: "#6366f1" },
    { name: "バランス型", value: 6, color: "#10b981" },
    { name: "持久型", value: 4, color: "#f59e0b" },
    { name: "不均衡型", value: 2, color: "#94a3b8" },
  ];

  const multiAthleteRadar = [
    { axis: "下肢パワー", 阿部: 95, 佐藤: 82, 田中: 88, avg: 72 },
    { axis: "水平推進力", 阿部: 80, 佐藤: 78, 田中: 72, avg: 68 },
    { axis: "SSC能力", 阿部: 95, 佐藤: 74, 田中: 85, avg: 70 },
    { axis: "左右バランス", 阿部: 85, 佐藤: 88, 田中: 70, avg: 75 },
    { axis: "柔軟性", 阿部: 65, 佐藤: 82, 田中: 75, avg: 71 },
    { axis: "動的安定性", 阿部: 50, 佐藤: 75, 田中: 68, avg: 69 },
  ];

  return (
    <div className="px-8 pb-8">
      <div className="mb-5">
        <TabBar current={subtab} setCurrent={setSubtab} tabs={[
          { key: "overall", label: "総合評価", Icon: Target },
          { key: "asymmetry", label: "左右差", Icon: Scale },
          { key: "injury", label: "怪我予防", Icon: Shield },
          { key: "gps", label: "GPS統合", Icon: MapPin },
          { key: "type", label: "タイプ分類", Icon: Layers },
        ]} />
      </div>

      {subtab === "overall" && (
        <>
          <div className="grid grid-cols-12 gap-5 mb-5">
            <SoftCard className="col-span-7 p-6">
              <SectionHeader title="選手プロファイル比較" sub="トップ3選手 × チーム平均"
                right={<button className="text-xs font-bold text-slate-500 flex items-center gap-1">選手を追加 <Plus className="w-3.5 h-3.5" /></button>} />
              <div className="h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={multiAthleteRadar}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="axis" tick={{ fill: "#475569", fontSize: 11, fontWeight: 600 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="チーム平均" dataKey="avg" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.3} strokeWidth={1.5} />
                    <Radar name="阿部" dataKey="阿部" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} strokeWidth={2.5} />
                    <Radar name="佐藤" dataKey="佐藤" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="田中" dataKey="田中" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#64748b", paddingTop: 10 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </SoftCard>

            <SoftCard className="col-span-5 p-6">
              <SectionHeader title="チーム6軸ヒートマップ" sub="全24選手 × 6領域" />
              <div className="mt-3">
                <div className="grid grid-cols-7 gap-1 text-[10px] font-bold text-slate-400 mb-1">
                  <div className="col-span-1"></div>
                  <div className="col-span-1 text-center">パワ</div>
                  <div className="col-span-1 text-center">推進</div>
                  <div className="col-span-1 text-center">SSC</div>
                  <div className="col-span-1 text-center">バラ</div>
                  <div className="col-span-1 text-center">柔軟</div>
                  <div className="col-span-1 text-center">安定</div>
                </div>
                {TEAM_ATHLETES.slice(0, 10).map((a, i) => {
                  const scores = [
                    Math.round(a.score * 1.1), Math.round(a.score * 0.95),
                    Math.round(a.score * 1.05), Math.round(a.score * 0.9 + 5),
                    Math.round(a.score * 0.8 + 10), Math.round(a.score * 0.75 + 10),
                  ];
                  return (
                    <div key={a.id} className="grid grid-cols-7 gap-1 mb-1">
                      <div className="col-span-1 text-[10px] font-bold text-slate-700 py-1 truncate">{a.name.split(" ")[0]}</div>
                      {scores.map((s, j) => {
                        const clamped = Math.min(Math.max(s, 30), 100);
                        const color = clamped >= 85 ? "bg-emerald-500" : clamped >= 75 ? "bg-emerald-400" : clamped >= 65 ? "bg-sky-400" : clamped >= 55 ? "bg-amber-400" : "bg-rose-400";
                        const opacity = 0.3 + (clamped / 100) * 0.7;
                        return (
                          <div key={j} className={`col-span-1 h-5 rounded ${color} flex items-center justify-center text-[9px] font-extrabold text-white`} style={{ opacity }}>
                            {clamped}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </SoftCard>
          </div>

          <div className="grid grid-cols-12 gap-5">
            <SoftCard className="col-span-5 p-6">
              <SectionHeader title="フィジカルタイプ分類" sub="24選手の自動診断結果" />
              <div className="grid grid-cols-2 gap-3 items-center">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={typeDistribution} innerRadius={40} outerRadius={80} paddingAngle={3} dataKey="value">
                        {typeDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {typeDistribution.map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ background: t.color }} />
                      <div className="text-xs font-semibold text-slate-700 flex-1">{t.name}</div>
                      <div className="text-xs font-extrabold text-slate-800">{t.value}名</div>
                    </div>
                  ))}
                </div>
              </div>
            </SoftCard>

            <SoftCard className="col-span-7 p-6">
              <SectionHeader title="総合スコア分布" sub="24選手のスコア帯別人数" />
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { range: "40-50", n: 1 }, { range: "50-60", n: 2 }, { range: "60-70", n: 7 },
                    { range: "70-80", n: 10 }, { range: "80-90", n: 3 }, { range: "90-100", n: 1 },
                  ]} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="range" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                    <Bar dataKey="n" radius={[8, 8, 0, 0]}>
                      {[0, 1, 2, 3, 4, 5].map((i) => {
                        const colors = ["#f43f5e", "#fb7185", "#fbbf24", "#6366f1", "#10b981", "#059669"];
                        return <Cell key={i} fill={colors[i]} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SoftCard>
          </div>
        </>
      )}

      {subtab === "asymmetry" && (
        <div className="grid grid-cols-12 gap-5">
          <SoftCard className="col-span-6 p-6">
            <SectionHeader title="Power Asymmetry (片脚パワー)" sub="CMJ 左右差" />
            <div className="space-y-3">
              {TEAM_ATHLETES.slice(0, 5).map((a, i) => {
                const gap = Math.round((Math.random() * 20 + 3) * 10) / 10;
                const alert = gap > 15;
                return (
                  <div key={a.id} className="p-3 rounded-xl bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <AthleteAvatar name={a.name} variant={i} size="sm" />
                        <div>
                          <div className="text-sm font-bold text-slate-800">{a.name}</div>
                          <div className="text-[10px] text-slate-400">{a.pos}</div>
                        </div>
                      </div>
                      <div className={`text-sm font-extrabold ${alert ? "text-rose-500" : gap > 8 ? "text-amber-500" : "text-emerald-500"}`}>{gap}%</div>
                    </div>
                    <div className="flex items-center gap-1 h-3">
                      <div className="flex-1 h-2 rounded bg-gradient-to-r from-rose-400 to-rose-300" style={{ opacity: 0.5 + gap / 30 }} />
                      <div className="w-1 h-3 bg-slate-300 rounded-full" />
                      <div className="flex-1 h-2 rounded bg-gradient-to-l from-emerald-400 to-emerald-300" />
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[10px] font-bold">
                      <span className="text-rose-500">R: {(28 - gap * 0.2).toFixed(1)}cm</span>
                      <span className="text-emerald-500">L: 28.6cm</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </SoftCard>

          <SoftCard className="col-span-6 p-6">
            <SectionHeader title="ROM ギャップ (A-SLR vs P-SLR)" sub="自動可動域と他動可動域の差" />
            <div className="space-y-3">
              {TEAM_ATHLETES.slice(0, 5).map((a, i) => {
                const gapR = Math.round(Math.random() * 10 + 1);
                const gapL = Math.round(Math.random() * 5 + 1);
                return (
                  <div key={a.id} className="p-3 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-2.5 mb-3">
                      <AthleteAvatar name={a.name} variant={i} size="sm" />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-800">{a.name}</div>
                      </div>
                      {gapR > 7 && <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">制御不足</span>}
                    </div>
                    <div className="space-y-2">
                      {[{ side: "右脚", gap: gapR }, { side: "左脚", gap: gapL }].map((r) => (
                        <div key={r.side} className="flex items-center gap-2 text-xs">
                          <span className="w-10 font-bold text-slate-600">{r.side}</span>
                          <div className="flex-1 h-5 relative bg-slate-200 rounded overflow-hidden">
                            <div className={`absolute h-full ${r.gap > 7 ? "bg-rose-400" : "bg-emerald-400"}`} style={{ width: `${70 - r.gap}%` }} />
                            <div className="absolute h-full bg-slate-300 opacity-50" style={{ left: `${70 - r.gap}%`, width: `${r.gap + 5}%` }} />
                          </div>
                          <span className={`w-12 text-right font-extrabold ${r.gap > 7 ? "text-rose-500" : "text-emerald-500"}`}>{r.gap}° Gap</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </SoftCard>
        </div>
      )}

      {subtab === "injury" && (
        <>
          <div className="grid grid-cols-3 gap-5 mb-5">
            {[
              { title: "H:Q Ratio", sub: "ハム／大腿四頭比", val: "0.64", range: "基準内 (>0.6)", color: "emerald", Icon: Scale, alert: 1 },
              { title: "Force Asymmetry", sub: "左右筋力差", val: "12%", range: "ATTENTION (>10%)", color: "amber", Icon: AlertTriangle, alert: 3 },
              { title: "RSI Trend", sub: "腱負荷耐性", val: "2.75", range: "正常 (>2.0)", color: "emerald", Icon: TrendingUp, alert: 0 },
            ].map((c, i) => (
              <SoftCard key={i} className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <GradientIcon Icon={c.Icon} gradient={c.color === "emerald" ? "from-emerald-500 to-teal-500" : c.color === "amber" ? "from-amber-500 to-orange-500" : "from-rose-500 to-red-500"} />
                  {c.alert > 0 && <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">{c.alert}名要注意</span>}
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{c.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{c.sub}</div>
                <div className="text-3xl font-extrabold text-slate-800 mt-2">{c.val}</div>
                <div className={`text-[11px] font-bold mt-1 ${c.color === "emerald" ? "text-emerald-600" : "text-amber-600"}`}>{c.range}</div>
              </SoftCard>
            ))}
          </div>

          <SoftCard className="p-6">
            <SectionHeader title="怪我リスク高選手" sub="3系統アラート + 左右差分析を統合判定" />
            <table className="w-full">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="text-left pb-3">選手</th>
                  <th className="text-center pb-3">H:Q Ratio</th>
                  <th className="text-center pb-3">Force Asym.</th>
                  <th className="text-center pb-3">RSI Trend</th>
                  <th className="text-center pb-3">可動域ギャップ</th>
                  <th className="text-right pb-3">総合リスク</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { i: 5, hq: "0.58", fa: "18%", rsi: "1.8", rom: "9°", risk: "HIGH", color: "rose" },
                  { i: 2, hq: "0.62", fa: "14%", rsi: "2.1", rom: "6°", risk: "MEDIUM", color: "amber" },
                  { i: 9, hq: "0.64", fa: "11%", rsi: "2.4", rom: "5°", risk: "MEDIUM", color: "amber" },
                  { i: 4, hq: "0.66", fa: "8%", rsi: "2.6", rom: "3°", risk: "LOW", color: "emerald" },
                ].map((r, idx) => {
                  const a = TEAM_ATHLETES[r.i];
                  return (
                    <tr key={idx} className="border-b border-slate-50 last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <AthleteAvatar name={a.name} variant={r.i} size="sm" />
                          <div>
                            <div className="text-sm font-bold text-slate-800">{a.name}</div>
                            <div className="text-[10px] text-slate-400">{a.pos}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-center"><span className={`text-xs font-bold ${parseFloat(r.hq) < 0.6 ? "text-rose-500" : "text-slate-700"}`}>{r.hq}</span></td>
                      <td className="py-3 text-center"><span className={`text-xs font-bold ${parseInt(r.fa) > 10 ? "text-rose-500" : "text-slate-700"}`}>{r.fa}</span></td>
                      <td className="py-3 text-center"><span className={`text-xs font-bold ${parseFloat(r.rsi) < 2.0 ? "text-rose-500" : "text-slate-700"}`}>{r.rsi}</span></td>
                      <td className="py-3 text-center"><span className={`text-xs font-bold ${parseInt(r.rom) > 7 ? "text-rose-500" : "text-slate-700"}`}>{r.rom}</span></td>
                      <td className="py-3 text-right"><StatusChip status={r.risk} color={r.color} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </SoftCard>
        </>
      )}

      {subtab === "gps" && (
        <div className="grid grid-cols-12 gap-5">
          <SoftCard className="col-span-12 p-6">
            <SectionHeader title="能力 vs 試合発揮率" sub="測定値（内的能力）と試合値（外的負荷）の相関" />
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-8 h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 30, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" dataKey="test" name="Test Max Speed" domain={[28, 36]} tick={{ fill: "#64748b", fontSize: 11 }}
                      label={{ value: "測定最高速度 (km/h)", position: "insideBottom", offset: -10, fontSize: 11, fill: "#64748b" }} />
                    <YAxis type="number" dataKey="game" name="Game Max Speed" domain={[26, 34]} tick={{ fill: "#64748b", fontSize: 11 }}
                      label={{ value: "試合最高速度 (km/h)", angle: -90, position: "insideLeft", fontSize: 11, fill: "#64748b" }} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                    <Scatter data={TEAM_ATHLETES.slice(0, 10).map((a, i) => ({
                      test: 30 + i * 0.5, game: 28 + i * 0.4 - (i === 8 ? 2 : 0), name: a.name,
                    }))} fill="#f43f5e" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="col-span-4 flex flex-col gap-3">
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">HIGH PERFORMER</div>
                  <div className="text-lg font-extrabold text-emerald-800 mt-1">発揮率 96%以上</div>
                  <div className="text-xs text-emerald-700 mt-1">4名 — 能力をほぼ全て発揮</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-100">
                  <div className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">AVERAGE</div>
                  <div className="text-lg font-extrabold text-sky-800 mt-1">発揮率 90-95%</div>
                  <div className="text-xs text-sky-700 mt-1">14名 — 順調な発揮状態</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                  <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">UNDER-PERFORMING</div>
                  <div className="text-lg font-extrabold text-amber-800 mt-1">発揮率 90%未満</div>
                  <div className="text-xs text-amber-700 mt-1">6名 — 隠れた課題あり</div>
                </div>
              </div>
            </div>
          </SoftCard>
        </div>
      )}

      {subtab === "type" && (
        <div className="grid grid-cols-5 gap-5">
          {[
            { name: "スピード素質型", n: 7, color: "from-rose-500 to-red-500", desc: "SSC・連動性◎ × 最大筋力△", sample: ["阿部 円海", "山田 千里"] },
            { name: "パワー型", n: 5, color: "from-indigo-500 to-purple-500", desc: "最大筋力◎ × SSC○", sample: ["田中 彩", "小林 真菜"] },
            { name: "バランス型", n: 6, color: "from-emerald-500 to-teal-500", desc: "全領域で均等に高水準", sample: ["佐藤 美咲", "中村 愛子"] },
            { name: "持久型", n: 4, color: "from-amber-500 to-orange-500", desc: "持久力◎ × 瞬発系○", sample: ["鈴木 理子", "渡辺 美羽"] },
            { name: "不均衡型", n: 2, color: "from-slate-400 to-slate-500", desc: "左右差・可動域に課題", sample: ["伊藤 葵"] },
          ].map((t, i) => (
            <SoftCard key={i} className="p-5">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center shadow-md mb-3`}>
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm font-extrabold text-slate-800">{t.name}</div>
              <div className="text-3xl font-extrabold text-slate-800 mt-1">{t.n}<span className="text-sm font-bold text-slate-400 ml-1">名</span></div>
              <div className="text-[11px] text-slate-500 mt-2 leading-relaxed">{t.desc}</div>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">代表選手</div>
                <div className="space-y-1">
                  {t.sample.map((s, j) => (
                    <div key={j} className="text-xs font-semibold text-slate-700">{s}</div>
                  ))}
                </div>
              </div>
            </SoftCard>
          ))}
        </div>
      )}
    </div>
  );
};

// ================================================================
// PAGE 5: AI PRESCRIPTION (AI処方)
// ================================================================
const PrescriptionPage = () => {
  return (
    <div className="px-8 pb-8">
      <SoftCard className="p-5 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AthleteAvatar name="阿部 円海" variant={0} size="lg" />
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">対象選手</div>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="text-xl font-extrabold text-slate-800">阿部 円海</h3>
                <StatusChip status="スピード素質型" color="violet" />
                <span className="text-xs text-slate-400">#7 / 短距離 / 100m</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 transition">
              <ChevronDown className="w-3.5 h-3.5" /> 別の選手
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-xs font-bold shadow-md shadow-violet-200">
              <Sparkles className="w-4 h-4" /> 再生成
            </button>
          </div>
        </div>
      </SoftCard>

      <SoftCard className="p-6 mb-5">
        <SectionHeader title="8週間ロードマップ" sub="測定結果から自動生成された4フェーズのプラン"
          right={<div className="flex items-center gap-2">
            <StatusChip status="Phase 2 進行中" color="amber" />
            <span className="text-xs text-slate-500 font-semibold">Week 3 of 8</span>
          </div>} />

        <div className="relative">
          <div className="absolute top-9 left-0 right-0 h-1 bg-slate-100 rounded-full" />
          <div className="absolute top-9 left-0 h-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full" style={{ width: "37.5%" }} />

          <div className="grid grid-cols-4 gap-3 relative">
            {[
              {
                n: 1, w: "Week 1-2", title: "可動域×モーターコントロール",
                desc: ["片脚レッグレイズ腹筋（仰臥位）", "股関節回旋モビリティ"],
                Icon: GitBranch, color: "emerald", done: true,
              },
              {
                n: 2, w: "Week 3-4", title: "片脚での基礎筋力構築",
                desc: ["スプリットスクワット（ランジ）", "フォワードランジ"],
                Icon: Dumbbell, color: "rose", done: false, active: true,
              },
              {
                n: 3, w: "Week 5-6", title: "エキセントリック耐性・体幹安定",
                desc: ["低段差SLドロップ着地", "SL RDL下降ゆっくり"],
                Icon: Shield, color: "slate", done: false,
              },
              {
                n: 4, w: "Week 7-8", title: "連動・水平推進",
                desc: ["20mバウンディング", "片脚ホップ＋腕振り同調"],
                Icon: Zap, color: "slate", done: false,
              },
            ].map((p, i) => (
              <div key={i} className={`relative rounded-2xl border-2 p-5 ${
                p.active ? "border-rose-300 bg-gradient-to-br from-rose-50 to-orange-50" :
                p.done ? "border-emerald-200 bg-white" : "border-slate-100 bg-white"
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white relative z-10 mx-auto -mt-12 ${
                  p.active ? "bg-gradient-to-br from-rose-500 to-orange-500 shadow-md shadow-rose-300" :
                  p.done ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md" : "bg-slate-200 text-slate-500"
                }`}>
                  {p.done ? <Check className="w-5 h-5" /> : p.n}
                </div>
                <div className="text-center mt-3">
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${p.active ? "text-rose-600" : p.done ? "text-emerald-600" : "text-slate-400"}`}>
                    PHASE {p.n} • {p.w}
                  </div>
                  <div className="text-sm font-extrabold text-slate-800 mt-1 leading-snug">{p.title}</div>
                </div>
                <div className="mt-4 space-y-1.5">
                  {p.desc.map((d, j) => (
                    <div key={j} className="flex items-start gap-1.5">
                      <div className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${p.active ? "bg-rose-500" : p.done ? "bg-emerald-500" : "bg-slate-400"}`} />
                      <div className="text-[11px] text-slate-600 leading-relaxed">{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">GOAL</div>
            <div className="text-base font-extrabold mt-1">上半身のエネルギーを逃がさない、強靭な片脚の「出力源」を完成させる</div>
          </div>
          <button className="shrink-0 ml-4 px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold">計画を編集</button>
        </div>
      </SoftCard>

      <div className="grid grid-cols-12 gap-5 mb-5">
        <SoftCard className="col-span-5 p-6">
          <SectionHeader title="Why / How / Future" sub="Phase 2 処方の論理構造" />
          <div className="space-y-3">
            {[
              { tag: "WHY", color: "from-rose-500 to-red-500", title: "なぜ起きているのか",
                desc: "A-SLR(自動) 64° vs P-SLR(他動) 73° のギャップ 9° を検出。右脚のコントロール不足がドロップSQでの崩れに直結。" },
              { tag: "HOW", color: "from-sky-500 to-indigo-500", title: "どうすれば良くなるか",
                desc: "モーターコントロール学習（A-SLR）の習得。正しい筋肉の使い方を脳に学習させ、膝が内に入る物理的制限を取り除く。" },
              { tag: "FUTURE", color: "from-emerald-500 to-teal-500", title: "手に入る未来",
                desc: "推進力の直進化・ロスゼロの走り。テンポ制御とニーイン抑制で「膝の軌道」を固定。ブレない着地が推進力へ直結。" },
            ].map((b, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md text-white bg-gradient-to-br ${b.color} shadow-sm`}>{b.tag}</div>
                  <div className="text-xs font-bold text-slate-700">{b.title}</div>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">{b.desc}</div>
              </div>
            ))}
          </div>
        </SoftCard>

        <SoftCard className="col-span-7 p-6">
          <SectionHeader title="年間ロードマップ" sub="測定 → ゲート移行基準 → 期分け"
            right={<StatusChip status="2026年" color="slate" />} />
          <div className="space-y-2">
            {[
              { m: "12-1月", label: "OFF期", sub: "基礎構築", status: "完了", gate: "痛みなし / 可動域", done: true },
              { m: "2月", label: "Adaptation", sub: "パワー転換", status: "完了", gate: "SQ > 1.6倍", done: true },
              { m: "3月", label: "Preparation", sub: "試合対応", status: "完了", gate: "30-15 IFT", done: true },
              { m: "4-7月", label: "Competition-1", sub: "リーグ前期", status: "進行中", gate: "試合維持", done: false, active: true },
              { m: "8月", label: "Recovery", sub: "機能改善", status: "未着手", gate: "左右差 < 10%", done: false },
              { m: "9月", label: "Competition-2", sub: "全社予選", status: "未着手", gate: "体重減 < 2%", done: false },
              { m: "9月", label: "Compt-2 最終調整", sub: "ピーク調整", status: "未着手", gate: "ピーク出力発揮", done: false },
              { m: "10-11月", label: "Competition-3", sub: "シーズン最終", status: "未着手", gate: "地域CL優勝", done: false },
              { m: "12月", label: "POST オフシーズン", sub: "リハビリ", status: "未着手", gate: "-", done: false },
            ].map((p, i) => (
              <div key={i} className={`grid grid-cols-12 gap-3 items-center p-2.5 rounded-xl ${
                p.active ? "bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100" : "hover:bg-slate-50"
              }`}>
                <div className="col-span-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">{p.m}</div>
                  <div className={`text-xs font-extrabold ${p.active ? "text-rose-600" : "text-slate-800"}`}>{p.label}</div>
                </div>
                <div className="col-span-3 text-xs text-slate-600">{p.sub}</div>
                <div className="col-span-5">
                  <div className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-slate-400" />
                    <span className="text-[11px] font-semibold text-slate-600">GATE: {p.gate}</span>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  {p.done ? <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">完了</span>
                    : p.active ? <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">進行中</span>
                    : <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">未着手</span>}
                </div>
              </div>
            ))}
          </div>
        </SoftCard>
      </div>

      <SoftCard className="p-6">
        <SectionHeader title="ポジション別戦略マトリクス" sub="測定データをポジション特性に応じて最適化"
          right={<button className="text-xs font-bold text-slate-500 flex items-center gap-1">マトリクス編集 <Edit3 className="w-3.5 h-3.5" /></button>} />
        <table className="w-full">
          <thead>
            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="text-left pb-3">ポジション</th>
              <th className="text-left pb-3">WEIGHT PRIORITY</th>
              <th className="text-left pb-3">PLYO INTENSITY</th>
              <th className="text-left pb-3">SPRINT FOCUS</th>
              <th className="text-left pb-3">KEY KPI</th>
            </tr>
          </thead>
          <tbody>
            {[
              { pos: "DF", role: "Defenders", weight: { level: "HIGH", color: "rose", text: "筋力底上げ最優先 SQ 1.26 → 1.6倍" },
                plyo: { level: "MIDDLE-HIGH", color: "amber", text: "足関節安定性 / 片脚機能" },
                sprint: "Agility / COD 横方向切り返し 対人対応", kpi: "Arrowhead < 7.8s / Squat 1.6x BW" },
              { pos: "MF", role: "Midfielders", weight: { level: "MEDIUM", color: "amber", text: "筋力向上も維持 SQ 1.34 → 1.6倍" },
                plyo: { level: "HIGH", color: "rose", text: "SSC活用 / リピート 連続ジャンプ能力" },
                sprint: "RSA / Accel 10-30m中間加速", kpi: "Pro-Agility < 4.5s / IFT Keep High" },
              { pos: "FW", role: "Forwards", weight: { level: "MAINTENANCE", color: "slate", text: "高水準を維持 SQ 1.83倍 (達成済)" },
                plyo: { level: "HIGH", color: "rose", text: "爆発的パワー発揮 低回数・高強度" },
                sprint: "Initial Speed 0-5m初速特化 反応速度", kpi: "5m Sprint < 0.93s / Shoot Precision" },
              { pos: "GK", role: "Goalkeepers", weight: { level: "SPECIFIC", color: "violet", text: "上肢・体幹・パワー 特異的動作強化" },
                plyo: { level: "HIGH / SPEC", color: "rose", text: "RB向上 (バネ係数) ダイブ動作連動" },
                sprint: "Reaction ダイブ&復帰 短距離アジリティ", kpi: "RB Index > 4.0 / CMJ > 50cm" },
            ].map((r, i) => (
              <tr key={i} className="border-b border-slate-50 last:border-0">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 text-white font-extrabold flex items-center justify-center text-xs">{r.pos}</div>
                    <div className="text-xs text-slate-500">{r.role}</div>
                  </div>
                </td>
                <td className="py-3">
                  <div className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-1 ${r.weight.color === "rose" ? "bg-rose-100 text-rose-700" : r.weight.color === "amber" ? "bg-amber-100 text-amber-700" : r.weight.color === "violet" ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-700"}`}>{r.weight.level}</div>
                  <div className="text-[11px] text-slate-600 leading-snug">{r.weight.text}</div>
                </td>
                <td className="py-3">
                  <div className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-1 ${r.plyo.color === "rose" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>{r.plyo.level}</div>
                  <div className="text-[11px] text-slate-600 leading-snug">{r.plyo.text}</div>
                </td>
                <td className="py-3 text-[11px] text-slate-600 leading-snug">{r.sprint}</td>
                <td className="py-3 text-[11px] font-bold text-slate-700 leading-snug">{r.kpi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SoftCard>
    </div>
  );
};

// ================================================================
// PAGE 6: REPORTS (レポート出力)
// ================================================================
const ReportsPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const templates = [
    { name: "身体能力総合評価", desc: "6軸レーダー＋項目別詳細＋メッセージ", pages: "1p", gradient: "from-rose-500 to-red-500", icon: Target, category: "総合" },
    { name: "フィジカルタイプ診断", desc: "タイプ分類＋根拠データ＋推奨アクション", pages: "1p", gradient: "from-indigo-500 to-purple-500", icon: Layers, category: "診断" },
    { name: "アジリティ左右差分析", desc: "L/R ターン＋RDL差分＋COD分析", pages: "1p", gradient: "from-amber-500 to-orange-500", icon: Scale, category: "左右差" },
    { name: "片脚パワー非対称性", desc: "CMJ左右差＋改善方針", pages: "1p", gradient: "from-rose-500 to-orange-500", icon: Zap, category: "左右差" },
    { name: "最大筋力ボトルネック", desc: "SQ/DL/BP対エリート基準比較", pages: "1p", gradient: "from-emerald-500 to-teal-500", icon: Dumbbell, category: "筋力" },
    { name: "片脚SSC左右差", desc: "RB左右差＋プライオメトリクス推奨", pages: "1p", gradient: "from-sky-500 to-cyan-500", icon: Flame, category: "左右差" },
    { name: "アジリティ強み特定", desc: "得意ターン方向の特定＋戦術活用", pages: "1p", gradient: "from-violet-500 to-fuchsia-500", icon: Trophy, category: "強み" },
    { name: "総合プロファイル（3頁）", desc: "強み＋伸びしろ＋8週プラン", pages: "3p", gradient: "from-slate-800 to-black", icon: FileText, category: "総合" },
  ];

  return (
    <div className="px-8 pb-8">
      <div className="grid grid-cols-4 gap-5 mb-5">
        <MiniStat label="利用可能テンプレート" value="8種類" Icon={FileText} gradient="from-rose-500 to-red-500" />
        <MiniStat label="今月の生成数" value="186件" Icon={FileCheck} gradient="from-indigo-500 to-purple-500" trend="+42" />
        <MiniStat label="一括生成" value="24名分" Icon={Layers} gradient="from-emerald-500 to-teal-500" />
        <MiniStat label="保留中" value="2件" Icon={Clock} gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-12 gap-5 mb-5">
        <SoftCard className="col-span-8 p-6">
          <SectionHeader title="レポートテンプレート" sub="8種類の分析レポートから選択"
            right={<div className="flex items-center gap-2">
              <button className="text-xs font-bold text-slate-500 hover:text-slate-700">プレビュー</button>
              <button className="text-xs font-bold text-slate-500 hover:text-slate-700">カスタム追加</button>
            </div>} />
          <div className="grid grid-cols-4 gap-3">
            {templates.map((t, i) => {
              const selected = selectedTemplate === i;
              return (
                <button key={i} onClick={() => setSelectedTemplate(i)}
                  className={`text-left p-4 rounded-xl transition relative ${
                    selected ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg" : "bg-slate-50 hover:bg-slate-100"
                  }`}>
                  {selected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <Check className="w-3 h-3 text-slate-900" />
                    </div>
                  )}
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center shadow-md mb-3`}>
                    <t.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${selected ? "text-slate-400" : "text-slate-400"}`}>{t.category} • {t.pages}</div>
                  <div className={`text-sm font-extrabold leading-tight ${selected ? "text-white" : "text-slate-800"}`}>{t.name}</div>
                  <div className={`text-[11px] mt-1.5 leading-relaxed ${selected ? "text-slate-300" : "text-slate-500"}`}>{t.desc}</div>
                </button>
              );
            })}
          </div>
        </SoftCard>

        <SoftCard className="col-span-4 p-6">
          <SectionHeader title="生成設定" sub={templates[selectedTemplate].name} />
          <div className="space-y-4">
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">対象</div>
              <div className="flex items-center gap-2 mb-2">
                <FilterPill label="個別" active />
                <FilterPill label="チーム一括" />
                <FilterPill label="ポジション別" />
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50">
                <AthleteAvatar name="阿部 円海" variant={0} size="sm" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-800">阿部 円海</div>
                  <div className="text-[10px] text-slate-400">#7 / 短距離</div>
                </div>
                <button className="text-xs font-bold text-rose-500">変更</button>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">測定日</div>
              <div className="grid grid-cols-2 gap-2">
                <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
                  <option>2026年4月</option>
                  <option>2026年3月</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
                  <option>最新測定</option>
                  <option>全期間</option>
                </select>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">AI処方文</div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 flex-1 p-2.5 rounded-xl bg-violet-50 border border-violet-200 cursor-pointer">
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-bold text-violet-700">生成する（GPT-5）</span>
                </label>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">ブランディング</div>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 rounded-xl bg-slate-900 text-white text-xs font-bold">VALORISE標準</button>
                <button className="py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold">チームロゴ</button>
              </div>
            </div>

            <button className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-rose-200">
              <FileCheck className="w-4 h-4" /> レポート生成
            </button>
          </div>
        </SoftCard>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <SoftCard className="col-span-8 p-6">
          <SectionHeader title="最近の生成履歴" sub="過去30日分"
            right={<button className="text-xs font-bold text-slate-500 hover:text-slate-700">すべて表示</button>} />
          <table className="w-full">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="text-left pb-3">レポート</th>
                <th className="text-left pb-3">対象</th>
                <th className="text-left pb-3">テンプレート</th>
                <th className="text-left pb-3">生成日時</th>
                <th className="text-right pb-3">ステータス</th>
                <th className="text-right pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {[
                { file: "abe_overall_2026-04-22.pdf", target: "阿部 円海", tpl: "総合評価", time: "本日 10:42", status: "完了", color: "emerald" },
                { file: "team_bulk_20260421.zip", target: "チーム全24名", tpl: "総合評価 × 24", time: "昨日 18:30", status: "完了", color: "emerald" },
                { file: "sato_asymmetry.pdf", target: "佐藤 美咲", tpl: "アジリティ左右差", time: "4/21 14:12", status: "完了", color: "emerald" },
                { file: "tanaka_power.pdf", target: "田中 彩", tpl: "片脚パワー非対称性", time: "4/20 09:20", status: "完了", color: "emerald" },
                { file: "forward_group.pdf", target: "跳躍選手 4名", tpl: "総合プロファイル", time: "4/19 16:45", status: "生成中", color: "amber" },
                { file: "ito_overall.pdf", target: "伊藤 葵", tpl: "総合評価", time: "4/18 11:30", status: "エラー", color: "rose" },
              ].map((r, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-slate-500" />
                      </div>
                      <div className="text-xs font-bold text-slate-800 truncate max-w-[200px]">{r.file}</div>
                    </div>
                  </td>
                  <td className="py-3 text-xs text-slate-600">{r.target}</td>
                  <td className="py-3 text-xs text-slate-500">{r.tpl}</td>
                  <td className="py-3 text-xs text-slate-500">{r.time}</td>
                  <td className="py-3 text-right"><StatusChip status={r.status} color={r.color} /></td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center" title="ダウンロード">
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center" title="共有">
                        <Share2 className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SoftCard>

        <SoftCard className="col-span-4 p-6">
          <SectionHeader title="プレビュー" sub="選択中のテンプレート" />
          <div className="rounded-xl border border-slate-100 p-4 bg-gradient-to-br from-slate-50 to-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-rose-400" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="flex-1 text-[9px] text-slate-400 text-center font-mono">valorise_report.pdf</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-100">
              <div className="text-[9px] font-bold text-rose-500 uppercase tracking-wider">PHYSICAL REPORT</div>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="text-base font-extrabold text-slate-800">阿部 円海</div>
                <div className="w-8 h-8 rounded bg-slate-900 text-white text-xs font-extrabold flex items-center justify-center">78</div>
              </div>
              <div className="text-[8px] text-slate-500 mt-1">高弾性・速度主導でランニングをコントロール</div>
              <div className="mt-3 grid grid-cols-4 gap-1">
                {["2.84", "36cm", "1.11", "790"].map((v, i) => (
                  <div key={i} className="p-1.5 rounded bg-slate-50">
                    <div className="text-[6px] font-bold text-slate-400">METRIC</div>
                    <div className="text-[10px] font-extrabold text-slate-800">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded p-2">
                <div className="text-[7px] font-bold text-slate-400">MESSAGE</div>
                <div className="text-[8px] font-bold text-white leading-tight mt-0.5">
                  速さ＝備わった武器。受け止めと整合で最後まで乗り切る8週間。
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold">フルプレビュー</button>
            <button className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center">
              <Maximize2 className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </SoftCard>
      </div>
    </div>
  );
};

// ================================================================
// PAGE 7/8: VIDEO / SETTINGS (stubs)
// ================================================================
const StubPage = ({ title, Icon }) => (
  <div className="px-8 pb-8">
    <SoftCard className="p-16 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-md">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="mt-4 text-lg font-extrabold text-slate-800">{title}</div>
      <div className="text-xs text-slate-500 mt-1">このページはPhase 2で実装予定</div>
    </SoftCard>
  </div>
);

// ================================================================
// MAIN
// ================================================================
export default function VALORISEDashboard() {
  const [current, setCurrent] = useState("dashboard");

  const renderPage = () => {
    switch (current) {
      case "athletes": return <AthletesPage />;
      case "measure": return <MeasurementsPage />;
      case "analysis": return <AnalysisPage />;
      case "prescribe": return <PrescriptionPage />;
      case "reports": return <ReportsPage />;
      case "video": return <StubPage title="動画評価" Icon={Video} />;
      case "settings": return <StubPage title="設定" Icon={Settings} />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-700">
      <Sidebar current={current} setCurrent={setCurrent} />
      <main className="flex-1 overflow-x-hidden">
        <TopBar page={current} />
        {renderPage()}
      </main>
    </div>
  );
}

