import axios from 'axios'

const TWILIGHTCYBER_API_URL = process.env.TWILIGHTCYBER_API_URL
const TWILIGHTCYBER_API_KEY = process.env.TWILIGHTCYBER_API_KEY

if (!TWILIGHTCYBER_API_KEY) {
  throw new Error('Missing TWILIGHTCYBER_API_KEY')
}

async function getDomainInfections(domain: string, next?: string) {
  const body: { domains: string[]; next?: string } = { domains: [domain] }

  if (next && typeof next === 'string') {
    body.next = next
  }

  const res = await axios.post(`${TWILIGHTCYBER_API_URL}/infections/_search`, body, {
    headers: { Authorization: `Bearer ${TWILIGHTCYBER_API_KEY}` }
  })

  if (res.data) {
    console.log({
      total_items_count: res.data.total_items_count,
      items_count: res.data.items_count,
      next: res.data.next
    })

    return res.data
  }
}

export const twilightcyberServices = {
  getDomainInfections
}
