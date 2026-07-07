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

  const result = (await response.json()) as T & {
    ok?: boolean
    message?: string
  }

  if (!response.ok || result.ok === false) {
    throw new Error(result.message || 'Operazione non riuscita.')
  }

  return result
}
