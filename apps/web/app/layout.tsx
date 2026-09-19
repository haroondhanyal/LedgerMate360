import type {Metadata} from "next"; import "./globals.css";
export const metadata:Metadata={title:{default:"LedgerMate 360",template:"%s | LedgerMate 360"},description:"Your money, khata, loans and savings — all in one place.",icons:{icon:"/icon.svg"}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="icon" type="image/svg+xml" href="/ledger-logo.svg"/><link rel="shortcut icon" href="/ledger-logo.svg"/></head><body>{children}</body></html>}
