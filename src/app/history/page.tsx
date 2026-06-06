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
        <main
            className="
                mx-auto
                max-w-7xl
                p-6
            "
        >
            <h1
                className="
                    mb-8
                    text-4xl
                    font-bold
                "
            >
                Round History
            </h1>

            <HistoryTable
                rounds={formattedRounds}
            />
        </main>
    );
}