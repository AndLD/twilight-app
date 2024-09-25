import { GetProps, Input } from 'antd'
import { domainServices } from '../services/domain'
import { useState } from 'react'
import { InfectionDataItem } from '../utils/types'

type AntdSearchProps = GetProps<typeof Input.Search>

type SearchProps = {
  setSearchedDomain: React.Dispatch<React.SetStateAction<string>>
  setData: React.Dispatch<React.SetStateAction<InfectionDataItem[] | null>>
}

export default function Search({ setSearchedDomain, setData }: SearchProps) {
  const [domain, setDomain] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSearch: AntdSearchProps['onSearch'] = async (value) => {
    if (isLoading || !domain) return

    setSearchedDomain('')
    setData(null)
    setIsLoading(true)

    try {
      const data = await domainServices.fetchDomainInfections(value)

      if (data) {
        setDomain('')
        setSearchedDomain(domain)
        setData(data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 300, width: '80vw' }}>
      <Input.Search
        placeholder="example.com"
        value={domain}
        onChange={(event) => setDomain(event.target.value)}
        onSearch={onSearch}
        size="large"
        loading={isLoading}
      />
      {isLoading && (
        <p style={{ color: 'lightgray' }}>
          Don't worry, it may take a while depends on how many infections the domain holds
        </p>
      )}
    </div>
  )
}
