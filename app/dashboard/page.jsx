import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import Dashboard from "@/components/dashboard/dashboard"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return <Dashboard user={session.user} />
}

