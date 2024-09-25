export type PieChartDataItem = {
  type: string
  value: number
}

export type LineChartDataItem = {
  type: string
  x: Date
  y: number
}

export type InfectionDataItem = {
  id: string
  log_checksum: string
  log_file_name: string
  stealer_type: string
  computer_information: {
    build_id: string
    infection_date: string
    ip: string
    malware_path: string
    username: string
    country: string
    os: string
    hwid: string
  }
  credentials: Array<{
    url: string
    creds: Array<{
      username: string
      password: string
    }>
  }>
}
