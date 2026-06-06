export default function RoundInfo() {
    return (
        <div
            className="
        mt-8
        rounded-lg
        border
        p-4
      "
        >
            <h2 className="mb-4 text-xl font-bold">
                Round Info
            </h2>

            <div className="space-y-2">
                <p>
                    Commit Hash:
                    {" "}
                    -
                </p>

                <p>
                    Peg Map Hash:
                    {" "}
                    -
                </p>

                <p>
                    Bin Index:
                    {" "}
                    -
                </p>

                <p>
                    Multiplier:
                    {" "}
                    -
                </p>
            </div>
        </div>
    );
}