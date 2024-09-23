'use client';
import { createContext, ReactNode, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Sử dụng default import
import Logout from "@/apis/user/logout"

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  address: any[]; 
  cart: any[];
  telephone: string | null;
};
interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  user: User | null;
  setUser: (value: User | null) => void;
  logout: () => void;
};

const defaultAuthContext: AuthContextType = {
  isAuth: false,
  user: null,
  setUser: () => {},
  setIsAuth: () => {}, 
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProp {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProp) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = Cookies.get('AccessToken') || "";
      console.log("Checking auth status...");
      if (token) {
        try {
          const decode = jwtDecode(token);
          if (decode && decode.exp) {
            const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
            if (decode.exp < currentTime) {
              Cookies.remove('AccessToken');
              Cookies.remove('User')
              setIsAuth(false);
              setUser(null);
              alert("Phiên đăng nhập hết hạn");
            } else {
              setIsAuth(true);
              const dataUser: any = Cookies.get('User');
              console.log("Raw cookie data:", dataUser);
              
              if(dataUser){
                try {
                  const parsedUser = JSON.parse(dataUser);
                  setUser(parsedUser);
                  console.log("User in AuthProvider updated:", parsedUser);
                } catch (error) {
                  console.error("Failed to parse user data:", error);
                }
              } else {
                console.log("No user data found in cookies");
              }
              
            }
          }
        } catch (error) {
          console.error("Token không hợp lệ", error);
          setUser(null);
          setIsAuth(false);
        }
      } else {
        setUser(null);
        setIsAuth(false);
      }
    };

   
      checkAuthStatus();
    

    
  }, []); // Chỉ chạy một lần khi component mount
  const logout = async () => {
    try {
        const rs = await Logout();
        
        // Kiểm tra xem rs có hợp lệ không
        if (rs && rs.success) {
            // Xóa cookies từ phía frontend
            Cookies.remove('AccessToken');
            Cookies.remove('User');
            Cookies.remove('RefreshToken');
            
            // Cập nhật trạng thái
            setUser(null);
            setIsAuth(false);
            
            alert("Đăng xuất thành công");
        } else {
            alert("Đăng xuất thất bại: " + (rs ? rs.message : 'Không có phản hồi từ server'));
            console.error(rs ? rs.message : 'Không có phản hồi từ server');
        }
    } catch (error : any) {
        console.error("Logout error:", error.message);
    }
};

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth , logout, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}
