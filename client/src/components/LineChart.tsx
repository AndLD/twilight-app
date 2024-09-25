import { Line } from '@ant-design/plots'
import { isMobile } from 'react-device-detect'
import { InfectionDataItem, LineChartDataItem } from '../utils/types'
import { useEffect, useState } from 'react'

type LineChartProps = { data: InfectionDataItem[] }

export default function LineChart({ data }: LineChartProps) {
  const [chartData, setChartData] = useState<LineChartDataItem[] | null>(null)

  useEffect(() => {
    if (!data) {
      return setChartData(null)
    }

    const countByTypeAndDate: Record<string, Record<string, number>> = {}

    data.forEach((item) => {
      const {
        stealer_type,
        computer_information: { infection_date }
      } = item

      const yearMonth = infection_date.slice(0, 7)

      if (!countByTypeAndDate[stealer_type]) {
        countByTypeAndDate[stealer_type] = {}
      }

      if (!countByTypeAndDate[stealer_type][yearMonth]) {
        countByTypeAndDate[stealer_type][yearMonth] = 0
      }

      countByTypeAndDate[stealer_type][yearMonth]++
    })

    const chartData: LineChartDataItem[] = []

    for (const type in countByTypeAndDate) {
      for (const date in countByTypeAndDate[type]) {
        chartData.push({
          type,
          x: new Date(date),
          y: countByTypeAndDate[type][date]
        })
      }
    }

    setChartData(chartData)
  }, [data])

  const config = {
    data: chartData,
    colorField: 'type',
    label: {
      text: 'y',
      style: {
        fontWeight: 'bold'
      }
    },
    legend: {
      color: {
        title: false,
        position: isMobile ? 'bottom' : 'left',
        rowPadding: 5
      }
    },
    seriesField: 'type',
    xField: 'x',
    yField: 'y'
  }

  return <Line {...config} />
}
