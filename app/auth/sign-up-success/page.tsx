import Link from "next/link"
import { Logo } from "@/components/logo"
import { Mail } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-secondary px-4 py-12">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
          <Mail className="h-8 w-8 text-accent" />
        </div>
        <h1 className="text-3xl font-bold text-balance">Check Your Email</h1>
        <p className="font-mono text-sm text-muted-foreground">
          {"We've sent you a confirmation link. Please check your email inbox and click the link to verify your account."}
        </p>
        <Link href="/auth/login" className="inline-block font-mono text-sm text-accent hover:underline">
          Back to Sign In
        </Link>
      </div>
    </main>
  )
}
