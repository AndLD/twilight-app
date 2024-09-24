import { GetProps, Input, Space } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { API_URL } from './utils/constants'

type SearchProps = GetProps<typeof Input.Search>

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [domain, setDomain] = useState('')

  async function fetchDomainAnalysis(domain: string, next?: string) {
    setIsLoading(true)

    try {
      const res = await axios.post(`${API_URL}/api/domain/infections`, {
        domain,
        next
      })

      if (res.data) {
        console.log({
          total_items_count: res.data.total_items_count,
          items_count: res.data.items_count,
          next: res.data.next
        })

        return res.data
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSearch: SearchProps['onSearch'] = (value) => {
    if (isLoading) return

    fetchDomainAnalysis(value)
  }

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Twilight App</h1>
        <p>Check your domain</p>
        <Input.Search
          // placeholder="type a domain"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          onSearch={onSearch}
          style={{ maxWidth: 300, width: '80vw' }}
          size="large"
          loading={isLoading}
        />
      </div>
    </div>
  )
}
