export type PageProps = {
  params: Record<string, any>
  searchParams?: { [key: string]: string | string[] | undefined }
}

export type ErrorProps = {
  error: Error
  reset: () => void
}

export type RouteProps = {
  params: Record<string, string>
}
