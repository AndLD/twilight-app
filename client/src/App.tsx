import { useState } from 'react'
import DomainInfections from './components/DomainInfections'
import { InfectionDataItem } from './utils/types'
import Search from './components/Search'

export default function App() {
  const [searchedDomain, setSearchedDomain] = useState('')
  const [data, setData] = useState<InfectionDataItem[] | null>(null)

  return (
    <div style={{ maxWidth: '1280px', margin: 'auto' }}>
      <div
        style={{
          display: 'flex',
          height: searchedDomain ? 'auto' : '100vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1>Twilight Cyber App</h1>
          <p>Check if domain is infected</p>
          <Search setSearchedDomain={setSearchedDomain} setData={setData} />
        </div>
      </div>
      {searchedDomain && data && <DomainInfections searchedDomain={searchedDomain} data={data} />}
    </div>
  )
}
