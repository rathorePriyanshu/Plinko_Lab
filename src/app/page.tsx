import GameControls from "@/components/game/GameControls";
import KeyboardControls from "@/components/game/KeyboardControls";
import PayTable from "@/components/game/PayTable";
import PlinkoBoard from "@/components/game/Plinkboard";
import RoundInfo from "@/components/game/RoundInfo";

export default function Home() {
  return (
    <main
      className="
        min-h-screen
        p-6
        max-w-7xl
        mx-auto
      "
    >
      <h1
        className="
          mb-8
          text-4xl
          font-bold
        "
      >
        Plinko Lab
      </h1>

      <GameControls />

      <PlinkoBoard />

      <PayTable />

      <RoundInfo />

      <KeyboardControls />
    </main>
  );
}