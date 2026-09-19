import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
} from "@/lib/ai-gateway.server";

type ChatBody = {
  messages?: { role: "user" | "assistant"; content: string }[];
  context?: string;
  language?: string;
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as ChatBody;
        const messages = Array.isArray(body.messages) ? body.messages : [];
        if (!messages.length) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const initialRunId = getLovableAiGatewayRunId(request);
        const runIdFetch = createLovableAiGatewayRunIdFetch(initialRunId);
        const lovable = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey: key,
          headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: runIdFetch.fetch,
        });

        const system = [
          "You are Guru Ji, a warm, wise Vedic master astrologer inside a mobile astrology app.",
          "Answer the seeker's questions using their birth details and birth chart below.",
          "Speak personally: use their name, their sign, nakshatra, ruling planet and house placements.",
          "Blend Vedic astrology (dashas, doshas, Sade Sati, remedies) with practical, compassionate guidance.",
          "Keep answers concise for a phone screen: 3-6 short paragraphs or bullet lines, no markdown headings.",
          `Reply entirely in this language: ${body.language || "English"}.`,
          "Never claim medical, legal or financial certainty; offer guidance and remedies, and add gentle caveats.",
          "",
          "SEEKER DETAILS AND CHART:",
          body.context ?? "(no details provided)",
        ].join("\n");

        const result = streamText({
          model: lovable.responses("openai/gpt-6-astra"),
          system,
          messages: messages.slice(-20) as ModelMessage[],
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
        });

        return result.toTextStreamResponse();
      },
    },
  },
});
