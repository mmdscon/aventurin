import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { q1, q2, name, phone, email, praxis } = body

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const webhookUrl = process.env.WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          source: 'digitalisierungshilfe.at – Arzt-Anfrage',
          fachrichtung: q1,
          aktuelle_privatpatienten: q2,
          name,
          phone,
          email,
          praxis: praxis || '–',
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Arzt Lead API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
