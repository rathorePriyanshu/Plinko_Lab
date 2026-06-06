import HistoryTable
    from "@/components/history/HistoryTable";

async function getRounds() {

    const response =
        await fetch(
            "http://localhost:3000/api/rounds?limit=20",
            {
                cache: "no-store",
            }
        );

    return response.json();
}

export default async function HistoryPage() {

    const rounds =
        await getRounds();
    const formattedRounds =
        rounds.map(
            (round: any) => ({
                ...round,
                createdAt:
                    new Date(
                        round.createdAt
                    ).toISOString(),
            })
        );

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="border-b border-zinc-800 pb-6">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                        Round History
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        View and verify your previous Plinko games.
                    </p>
                </div>

                <HistoryTable
                    rounds={formattedRounds}
                />
            </div>
        </main>
    );
}