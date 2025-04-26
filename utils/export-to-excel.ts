import * as XLSX from "xlsx"

export function exportToExcel<T>(data: T[], filename: string): void {
  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data)

  // Create a workbook
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data")

  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, `${filename}.xlsx`)
}
