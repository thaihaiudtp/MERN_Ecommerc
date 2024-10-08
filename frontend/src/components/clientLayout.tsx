// src/components/ClientLayout.tsx
"use client"; 

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const Header = dynamic(() => import("@/components/Header"));
const Sidebar = dynamic(() => import("@/components/Nav"));

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
  
    const isSignupPage = pathname === "/signup";
    const isLoginPage = pathname.startsWith("/login");
    const isProductInfo = pathname.startsWith("/product");
    const isProfile = pathname.startsWith("/profile");
    const isCart = pathname.startsWith("/cart");
    const isRenderSidebar = !(isLoginPage || isProductInfo || isSignupPage || isProfile || isCart);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Chỉ render Header và Sidebar nếu không phải trang /signup */}
      {isRenderSidebar && <Sidebar />}
      {!isSignupPage && !isLoginPage&&<Header />}
      
      
      {children}

      <Footer />
    </div>
  );
}
