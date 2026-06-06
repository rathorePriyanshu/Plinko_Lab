"use client";

import { useState } from "react";
import { Clipboard, Check } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-zinc-500 hover:text-yellow-500 transition-all cursor-pointer p-0.5 rounded hover:bg-zinc-800/50"
            title="Copy to clipboard"
        >
            {copied ? (
                <Check className="h-3 w-3 text-emerald-500" />
            ) : (
                <Clipboard className="h-3 w-3" />
            )}
        </button>
    );
}
