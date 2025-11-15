import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  title: {
    default: "Task Manager - Управляйте задачами эффективно",
    template: "%s | Task Manager"
  },
  description: "Современное веб-приложение для управления личными задачами. Создавайте, отслеживайте и выполняйте задачи эффективно.",
  keywords: ["task manager", "задачи", "управление задачами", "productivity", "продуктивность"],
  authors: [{ name: "Task Manager Team" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://taskmanager.example.com",
    siteName: "Task Manager",
    title: "Task Manager - Управляйте задачами эффективно",
    description: "Современное веб-приложение для управления личными задачами",
  },
  twitter: {
    card: "summary_large_image",
    title: "Task Manager",
    description: "Управляйте задачами эффективно",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
