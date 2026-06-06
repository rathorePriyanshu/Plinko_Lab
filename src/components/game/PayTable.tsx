import { PAYOUTS } from "@/constants/payouts";

export default function PayTable() {
    return (
        <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold">
                Paytable
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead>
                        <tr>
                            <th className="border p-2">
                                Bin
                            </th>

                            <th className="border p-2">
                                Multiplier
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {PAYOUTS.map(
                            (
                                multiplier,
                                index
                            ) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">
                                        {index}
                                    </td>

                                    <td className="border p-2 text-center">
                                        {multiplier}x
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}