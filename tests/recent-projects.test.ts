import { describe, it, expect } from "vitest"
import { buildRecentProjects } from "../lib/recent-projects"

describe("buildRecentProjects", () => {
  it("returns recent projects from processed files", () => {
    const projects = buildRecentProjects([
      { name: "notes.jpg", type: "image" },
      { name: "book.pdf", type: "pdf" },
    ])

    expect(projects).toHaveLength(2)
    expect(projects[0].name).toBe("notes.jpg")
    expect(projects[1].type).toBe("pdf")
  })

  it("skips files with errors and limits the result", () => {
    const projects = buildRecentProjects(
      [
        { name: "a.jpg", type: "image" },
        { name: "b.pdf", type: "pdf", error: "Failed" },
        { name: "c.pdf", type: "pdf" },
        { name: "d.jpg", type: "image" },
      ],
      2,
    )

    expect(projects).toHaveLength(2)
    expect(projects[0].name).toBe("a.jpg")
    expect(projects[1].name).toBe("c.pdf")
  })
})
