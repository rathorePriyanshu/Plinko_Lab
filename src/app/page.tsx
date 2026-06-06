import DebugGridListener from "@/components/game/DebugGridListener";
import GameControls from "@/components/game/GameControls";
import KeyboardControls from "@/components/game/KeyboardControls";
import MuteButton from "@/components/game/MuteButton";
import PayTable from "@/components/game/PayTable";
import Plinkoboard from "@/components/game/Plinkboard";
import RoundInfo from "@/components/game/RoundInfo";
import TiltListener from "@/components/game/Tiltlistener";

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

      <TiltListener />

      <DebugGridListener />

      <div
        className="
    flex
    justify-end
    mb-4
  "
      >
        <MuteButton />
      </div>

      <Plinkoboard />

      <PayTable />

      <RoundInfo />

      <KeyboardControls />
    </main>
  );
}