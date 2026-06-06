import { Suspense } from "react";
import VerifyForm from "@/components/verifier/VerifyForm";

export default function VerifyPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Block */}
                <div className="border-b border-zinc-800 pb-6">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                        Verify Round
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        Verify the integrity of a round&apos;s physics calculations.
                    </p>
                </div>
                <Suspense fallback={
                    <div className="flex items-center justify-center p-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                    </div>
                }>
                    <VerifyForm />
                </Suspense>
            </div>
        </main>
    );
}