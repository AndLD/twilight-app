import axios, { AxiosResponse } from 'axios'
import { InfectionDataItem } from '../utils/types'
import { API_URL } from '../utils/constants'
import { notification } from 'antd'

async function fetchDomainInfections(domain: string) {
  try {
    const res = await axios.post<{ domain: string }, AxiosResponse<InfectionDataItem[], any>>(
      `${API_URL}/api/domain/infections`,
      {
        domain
      }
    )

    return res.data
  } catch (error) {
    notification.error({ message: 'Failed to fetch domain infections data', description: (error as any).toString() })
  }
}

export const domainServices = {
  fetchDomainInfections
}
