import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: 'Property Pulse',
  keywords: 'rental, property, real state',
  description: 'Find the perfect rental property'
}
export default function RootLayout({ children }) {
  return (
    <AuthProvider> 
    <html lang="en">
      <body className=''>
        <Navbar/>
        <main className='min-h-screen'>{children}</main>
        <Footer/>
      </body>
    </html>
    </AuthProvider>
  );
}
