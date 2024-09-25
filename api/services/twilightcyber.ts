import axios from 'axios'
import { sleep } from '../utils/utils'
import { getLogger } from '../utils/logger'

const TWILIGHTCYBER_API_URL = process.env.TWILIGHTCYBER_API_URL
const TWILIGHTCYBER_API_KEY = process.env.TWILIGHTCYBER_API_KEY

if (!TWILIGHTCYBER_API_URL) {
  throw new Error('Missing TWILIGHTCYBER_API_URL')
}
if (!TWILIGHTCYBER_API_KEY) {
  throw new Error('Missing TWILIGHTCYBER_API_KEY')
}

const MAX_REQUESTS_PER_SEARCH = 50
const PAGE_SIZE = 400

const logger = getLogger('services/twilightcyber')

async function getDomainInfections(domain: string, next?: string, i: number = 0) {
  const body: {
    domains?: string[]
    root_domains?: string[]
    app_domains?: string[]
    email_domains?: string[]
    next?: string
    size?: number
  } = {
    domains: [domain],
    root_domains: [domain],
    app_domains: [domain],
    email_domains: [domain],
    size: PAGE_SIZE
  }

  if (next) {
    body.next = next
  }

  if (i >= MAX_REQUESTS_PER_SEARCH) {
    return []
  }

  // Delay to avoid sending requests too often
  if (i > 0) {
    await sleep(100)
  }

  const res = await axios.post(`${TWILIGHTCYBER_API_URL}/infections/_search`, body, {
    headers: { Authorization: `Bearer ${TWILIGHTCYBER_API_KEY}` }
  })

  if (res.data) {
    logger.info(`Request ${i + 1}/${Math.round(res.data.total_items_count / PAGE_SIZE)}`, {
      total_items_count: res.data.total_items_count,
      items_count: res.data.items_count,
      next: res.data.next
    })

    const items = res.data.data

    if (res.data.next) {
      items.push(...(await twilightcyberServices.getDomainInfections(domain, res.data.next, i + 1)))
    }

    return items
  }
}

export const twilightcyberServices = {
  getDomainInfections
}
