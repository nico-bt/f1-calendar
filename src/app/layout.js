import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Calendario F1 - 2024",
  description: "Visualiza el calendario de F1 2024 en una experiencia web 3D interactiva",
  keywords: ["battaglia", "nicolas", "formula 1", "three", "fiber", "drei", "frontend"],
  creator: "Nicolas Battaglia",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
