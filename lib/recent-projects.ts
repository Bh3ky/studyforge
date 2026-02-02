export type ProcessedFileType = "pdf" | "image"

export interface ProcessedFile {
  name: string
  type: ProcessedFileType
  size?: number
  recordId?: string
  error?: string
}

export interface RecentProject {
  id: string
  name: string
  type: ProcessedFileType
  date: string
  thumbnail: string
}

const DEFAULT_PDF_THUMBNAIL = "/history-timeline.png"
const DEFAULT_IMAGE_THUMBNAIL = "/math-calculus-notes.jpg"

export function buildRecentProjects(processedFiles: ProcessedFile[], limit = 3): RecentProject[] {
  return processedFiles
    .filter((file) => !file.error)
    .slice(0, limit)
    .map((file, index) => ({
      id: file.recordId ?? `${file.name}-${index}`,
      name: file.name,
      type: file.type,
      date: "Just now",
      thumbnail: file.type === "pdf" ? DEFAULT_PDF_THUMBNAIL : DEFAULT_IMAGE_THUMBNAIL,
    }))
}
