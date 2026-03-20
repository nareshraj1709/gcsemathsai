import AuthGuard from '@/components/AuthGuard'

export default function DownloadsLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
