export function requireUserId(userId: string | null | undefined): string {
  if (!userId) {
    throw new Error("Unauthorized")
  }

  return userId
}
