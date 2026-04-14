import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getPlantSuggestion(
  plantName: string,
  description: string
): Promise<string> {
  
  if (!process.env.ANTHROPIC_API_KEY) {
    return "Modulo AI non configurato. Controlla la chiave API nelle impostazioni.";
  }

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Sei un esperto di giardinaggio. Un utente ti descrive un problema con la sua pianta.

Pianta: ${plantName}
Descrizione del problema: ${description}

Rispondi in italiano con:
1. **Diagnosi probabile** — cosa potrebbe avere la pianta
2. **Cause possibili** — perché succede
3. **Soluzione consigliata** — cosa fare concretamente
4. **Prevenzione** — come evitarlo in futuro

Sii conciso, pratico e incoraggiante. Massimo 200 parole.`,
        },
      ],
    });

    const block = message.content[0];
    return block.type === "text" ? block.text : "Nessuna risposta ricevuta.";
  } catch (error) {
    console.error("AI error:", error);
    return "Il servizio AI non è disponibile al momento. Consulta la sezione Problemi comuni per suggerimenti.";
  }
}

export async function getWeeklyCareplan(
  plantName: string,
  species: string | null,
  location: string | null,
  sunlight: string | null,
  wateringFrequency: string | null
): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return "Modulo AI non configurato. Controlla la chiave API nelle impostazioni.";
  }

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Sei un esperto di giardinaggio. Crea un piano di cura settimanale per questa pianta.

Pianta: ${plantName}
${species ? `Specie: ${species}` : ""}
${location ? `Posizione: ${location}` : ""}
${sunlight ? `Luce: ${sunlight}` : ""}
${wateringFrequency ? `Annaffiatura attuale: ${wateringFrequency}` : ""}

Crea un piano settimanale semplice in italiano con un task al giorno.
Usa questo formato:
**Lunedì** — azione
**Martedì** — azione
...e così via.

Sii pratico e specifico. Massimo 150 parole.`,
        },
      ],
    });

    const block = message.content[0];
    return block.type === "text" ? block.text : "Nessuna risposta ricevuta.";
  } catch (error) {
    console.error("AI error:", error);
    return "Il servizio AI non è disponibile al momento. Consulta la sezione Problemi comuni per suggerimenti.";
  }
}