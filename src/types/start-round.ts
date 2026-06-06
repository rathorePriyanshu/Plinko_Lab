import { z } from "zod";

export const startRoundSchema =
    z.object({
        clientSeed: z
            .string()
            .min(1),

        betCents: z
            .number()
            .int()
            .positive(),

        dropColumn: z
            .number()
            .int()
            .min(0)
            .max(12),
    });

export type StartRoundInput = z.infer<typeof startRoundSchema>;