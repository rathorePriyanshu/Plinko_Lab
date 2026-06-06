import VerifyForm
    from "@/components/verifier/VerifyForm";

export default function VerifyPage() {
    return (
        <main
            className="
        max-w-4xl
        mx-auto
        p-6
      "
        >
            <h1
                className="
          text-4xl
          font-bold
          mb-8
        "
            >
                Verify Round
            </h1>

            <VerifyForm />
        </main>
    );
}