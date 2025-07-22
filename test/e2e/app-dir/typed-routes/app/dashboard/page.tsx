import Link from 'next/link'

export default function DashboardPage(props: PageProps<'/dashboard'>) {
  return (
    <div>
      <p>Dashboard Home</p>
      <Link href="/shop/">Settings</Link>
      <Link href="/about">About</Link>
    </div>
  )
}
