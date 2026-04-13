export type GroqChatRole = 'system' | 'user' | 'assistant'

export type GroqChatMessage = {
  role: GroqChatRole
  content: string
}

const DEFAULT_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct'

/** Shown for any Copilot / Groq / resume failure in the UI (no technical details). */
export const COPILOT_LIMIT_MESSAGE = 'Copilot limit is reached.'

export async function groqChat(messages: GroqChatMessage[]): Promise<string> {
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY?.trim()
  if (!API_KEY) return COPILOT_LIMIT_MESSAGE

  const endpoint = 'https://api.groq.com/openai/v1/chat/completions'
  const model = import.meta.env.VITE_GROQ_MODEL ?? DEFAULT_MODEL

  const payload = {
    model,
    messages: messages.filter((msg) => msg.role !== 'system' || msg.content.trim() !== ''),
    temperature: 0.7,
    max_tokens: 1024,
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      try {
        const errorText = await res.text()
        console.error(`Groq API error (${res.status}):`, errorText)
      } catch {
        /* ignore */
      }
      return COPILOT_LIMIT_MESSAGE
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[]
    }
    const text = data.choices?.[0]?.message?.content?.trim()
    return text && text.length > 0 ? text : COPILOT_LIMIT_MESSAGE
  } catch (e) {
    console.error('Groq request error:', e)
    return COPILOT_LIMIT_MESSAGE
  }
}
