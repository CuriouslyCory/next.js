import Link from 'next/link'

export default function DashboardSettingsPage(
  props: PageProps<'/dashboard/settings'>
) {
  return (
    <div>
      <h4>Dashboard Settings</h4>
      <Link href="/dashboard?foo=bar">Dashboard</Link>
      <p>Main dashboard configuration settings.</p>
    </div>
  )
}
