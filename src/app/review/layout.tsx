import AuthGuard from '@/components/AuthGuard'

export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
