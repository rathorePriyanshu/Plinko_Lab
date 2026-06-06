import DebugGridListener from "@/components/game/DebugGridListener";
import GameControls from "@/components/game/GameControls";
import KeyboardControls from "@/components/game/KeyboardControls";
import PayTable from "@/components/game/PayTable";
import Plinkoboard from "@/components/game/Plinkboard";
import RoundInfo from "@/components/game/RoundInfo";
import TiltListener from "@/components/game/Tiltlistener";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Block */}
        <div className="border-b border-zinc-800 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
            Plinko Lab
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Provably Fair Physics-Based Plinko Game
          </p>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* CENTER: Plinko Board (2nd on mobile, center top on desktop) */}
          <div className="order-2 lg:order-none lg:col-start-4 lg:col-span-6 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 md:p-6 shadow-xl shadow-black/10 transition-all duration-300 relative group flex flex-col items-center">
            <div className="absolute -inset-px bg-gradient-to-r from-yellow-500/5 to-amber-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <Plinkoboard />
          </div>

          {/* RIGHT SIDEBAR: Controls & Utilities (1st on mobile, right on desktop) */}
          <div className="order-1 lg:order-none lg:col-start-10 lg:col-span-3">
            <GameControls />
          </div>

          {/* LEFT SIDEBAR: Round Information (3rd on mobile, left on desktop) */}
          <div className="order-3 lg:order-none lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:row-span-2">
            <RoundInfo />
          </div>

          {/* CENTER BOTTOM: Paytable (4th on mobile, center bottom on desktop) */}
          <div className="order-4 lg:order-none lg:col-start-4 lg:col-span-6">
            <PayTable />
          </div>
        </div>

        {/* Action Listeners */}
        <TiltListener />
        <DebugGridListener />
        <KeyboardControls />
      </div>
    </main>
  );
}