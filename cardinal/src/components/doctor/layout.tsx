import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'
const inter = Inter({ subsets: ['latin'] })
import Navbar from './Navbar'



export default function DoctorLayout({children,}: {children: React.ReactNode}) 
{
  
  return (
    
       <div>
          <Navbar />

          <div className="flex">
        
              {/* Main Content */}
              <div className="flex-1  min-h-screen">
                
                {children}
              </div>
            </div>
        </div>
  );
      
}