import { redirect } from "next/navigation"
import { auth } from "@/lib/auth-config"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { FilterProviderWrapper } from "@/components/dashboard/filter-provider-wrapper"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check authentication
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <AppSidebar user={session.user} />
      <SidebarInset>
        <FilterProviderWrapper>
          <div className="flex flex-1 flex-col">
            {children}
          </div>
        </FilterProviderWrapper>
      </SidebarInset>
    </SidebarProvider>
  )
}
