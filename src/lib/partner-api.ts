const PARTNER_API_BASE =
  process.env.NEXT_PUBLIC_PARTNER_API_BASE ||
  'https://alessiothrasos.app.n8n.cloud/webhook'

export async function partnerRequest<T>(
  path: string,
  payload: Record<string, unknown>,
) {
  const response = await fetch(`${PARTNER_API_BASE}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
    body: JSON.stringify(payload),
  })

  const raw = await response.text()
  let result = {} as T & {
    ok?: boolean
    message?: string
  }

  if (raw.trim()) {
    try {
      result = JSON.parse(raw) as T & {
        ok?: boolean
        message?: string
      }
    } catch {
      if (!response.ok) {
        throw new Error('Il servizio ha restituito una risposta non valida.')
      }
    }
  }

  if (!response.ok || result.ok === false) {
    throw new Error(result.message || 'Operazione non riuscita.')
  }

  return result
}
