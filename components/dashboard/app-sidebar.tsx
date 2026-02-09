"use client"

import { ChevronDown, LayoutDashboard, BarChart3, Database, FileText, Settings, LogOut, User } from "lucide-react"
import { signOut } from "next-auth/react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme/theme-toggle"

interface AppSidebarProps {
  user: {
    name?: string | null
    email?: string | null
    role?: string
  }
}

export function AppSidebar({ user }: AppSidebarProps) {
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/dashboard",
      isActive: true,
    },
    {
      title: "Analisis Data",
      icon: BarChart3,
      url: "#",
      disabled: true,
    },
    {
      title: "Data Lapangan",
      icon: Database,
      url: "#",
      disabled: true,
    },
    {
      title: "Laporan",
      icon: FileText,
      url: "#",
      disabled: true,
    },
  ]

  const getInitials = (name?: string | null) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between gap-2">
              <SidebarMenuButton size="lg" className="flex-1">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">BP Dashboard</span>
                  <span className="text-xs text-muted-foreground">LNG Analytics</span>
                </div>
              </SidebarMenuButton>
              <div className="pr-2 group-data-[collapsible=icon]:hidden">
                <ThemeToggle />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild={!item.disabled}
                    isActive={item.isActive}
                    disabled={item.disabled}
                    tooltip={item.disabled ? "Coming Soon" : item.title}
                  >
                    {item.disabled ? (
                      <div className="flex items-center gap-2 opacity-50">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </div>
                    ) : (
                      <a href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings (Coming Soon)" disabled>
                  <Settings className="size-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col gap-0.5 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name || "User"}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email || "user@example.com"}
                    </span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-56"
              >
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  <User className="mr-2 size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Settings className="mr-2 size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
