import "./globals.css"

export const metadata = {
  title: "Kelechi Timothy - Full Stack Developer",
  description:
    "Professional portfolio of Kelechi Timothy, a passionate full stack developer specializing in modern web technologies.",
  keywords: "web developer, full stack developer, react, next.js, node.js, portfolio",
  author: "Kelechi Timothy",
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
