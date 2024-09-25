import PieChart from './PieChart'
import LineChart from './LineChart'
import { InfectionDataItem } from '../utils/types'
import { isMobile } from 'react-device-detect'

type DomainInfectionsProps = {
  searchedDomain: string
  data: InfectionDataItem[]
}

export default function DomainInfections({ searchedDomain, data }: DomainInfectionsProps) {
  return (
    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
      <h2>Domain name: {searchedDomain}</h2>

      {data.length ? (
        <>
          <h3 style={{ color: 'red' }}>{data.length} infections found</h3>
          <PieChart data={data} />
          <LineChart data={data} />
        </>
      ) : (
        <h3 style={{ color: 'green' }}>No infections found</h3>
      )}
    </div>
  )
}
