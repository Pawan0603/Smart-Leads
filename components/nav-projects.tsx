"use client"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { LayoutDashboard, ShieldCheck, UsersRound } from "lucide-react"
import { Separator } from "./ui/separator"
import { useAppContext } from "@/context/AppContext"

export function NavProjects() {
  const { isMobile } = useSidebar()
  const {user} = useAppContext();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <Separator className="mb-2" />
      <SidebarMenu>
        <SidebarMenuItem key={"dashboard"}>
          <SidebarMenuButton asChild>
            <a href={"/dashboard"}>
              <LayoutDashboard />
              <span>{"Dashboard"}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem key={"Leads"}>
          <SidebarMenuButton asChild>
            <a href={"/dashboard/leads"}>
              <UsersRound />
              <span>{"Leads"}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {user?.role === "Admin" && (
          <SidebarMenuItem key={"Admin"}>
            <SidebarMenuButton asChild>
              <a href={"/dashboard/admin"}>
                <ShieldCheck />
                <span>{"Admin"}</span>
              </a>
          </SidebarMenuButton>
        </SidebarMenuItem>)}
      </SidebarMenu>
    </SidebarGroup>
  )
}
