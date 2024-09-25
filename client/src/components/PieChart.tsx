import { Pie } from '@ant-design/plots'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { InfectionDataItem, PieChartDataItem } from '../utils/types'

type PieChartProps = { data: InfectionDataItem[] }

export default function PieChart({ data }: PieChartProps) {
  const [chartData, setChartData] = useState<PieChartDataItem[] | null>(null)

  useEffect(() => {
    if (!data) {
      return setChartData(null)
    }

    const countedByType: Record<string, number> = data.reduce((acc: Record<string, number>, curr) => {
      if (!acc[curr.stealer_type]) {
        acc[curr.stealer_type] = 1
      } else {
        acc[curr.stealer_type]++
      }

      return acc
    }, {})

    const chartData = Object.keys(countedByType).map((type) => ({ type, value: countedByType[type] }))

    setChartData(chartData)
  }, [data])

  const config = {
    data: chartData,
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0,
    legend: {
      color: {
        title: false,
        position: isMobile ? 'bottom' : 'left',
        rowPadding: 5
      }
    },
    label: {
      text: 'value'
    },
    tooltip: {
      title: 'type'
    },
    interaction: {
      elementHighlight: true
    },
    state: {
      inactive: { opacity: 0.5 }
    }
  }

  return <Pie {...config} />
}
