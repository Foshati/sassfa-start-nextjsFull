import { GetStartedButton } from "@/components/auth/get-started-button";
import {
  Code2,
  Cpu,
  Globe,
  Layers,
  LayoutTemplate,
  ShieldCheck,
  Zap,
  Github,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Layers className="size-5" />
            </div>
            <span>Sassfa</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="hover:text-foreground transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="https://github.com/Foshati/sassfa-start-nextjsFull"
              target="_blank"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <GetStartedButton />
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm animate-fade-in-up">
                <span className="flex size-2 rounded-full bg-primary mr-2 animate-pulse" />
                Next.js 16+ Enterprise Starter
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-in-up [animation-delay:200ms]">
                Build faster with <br className="hidden md:block" />
                <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Sassfa
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:400ms]">
                The ultimate full-stack starter kit for modern web applications.
                Authentication, database, payments, and UI components
                pre-configured.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-fade-in-up [animation-delay:600ms]">
                <GetStartedButton />
                <a
                  href="https://github.com/Foshati/sassfa-start-nextjsFull"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium transition-colors bg-background border border-input hover:bg-accent hover:text-accent-foreground rounded-md h-11"
                >
                  <Github className="size-4" />
                  Star on GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Decorative blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl opacity-20 -z-10 animate-pulse" />
        </section>

        {/* Features Grid */}
        <section
          id="features"
          className="py-24 bg-muted/30 border-y border-border/50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Everything you need
              </h2>
              <p className="text-lg text-muted-foreground">
                Packed with the latest technologies to help you build scalable
                applications in record time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="size-6 text-yellow-500" />}
                title="Lightning Fast"
                description="Built on Next.js 16 with Turbopack for instant HMR and blazing fast page loads."
              />
              <FeatureCard
                icon={<ShieldCheck className="size-6 text-green-500" />}
                title="Secure Authentication"
                description="Enterprise-grade auth with Better Auth. Social logins, magic links, and more."
              />
              <FeatureCard
                icon={<LayoutTemplate className="size-6 text-blue-500" />}
                title="Modern UI Components"
                description="Beautifully designed components using Shadcn UI and Tailwind CSS."
              />
              <FeatureCard
                icon={<Cpu className="size-6 text-purple-500" />}
                title="Type-Safe Database"
                description="Prisma ORM with PostgreSQL for robust data management and type safety."
              />
              <FeatureCard
                icon={<Globe className="size-6 text-cyan-500" />}
                title="Edge Ready"
                description="Deploy anywhere. Optimized for Vercel Edge Functions and global distribution."
              />
              <FeatureCard
                icon={<Code2 className="size-6 text-pink-500" />}
                title="Developer Experience"
                description="TypeScript, ESLint, Prettier, and Biome configured for code quality."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 text-center max-w-5xl mx-auto shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-size-[250%_250%] animate-[shimmer_3s_infinite]" />

              <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
                Ready to build your next big thing?
              </h2>
              <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
                Join thousands of developers building the future with Sassfa.
                Open source and free to use.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <GetStartedButton />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                  <Layers className="size-5" />
                </div>
                <span>Sassfa</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The modern full-stack starter kit for Next.js applications.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Sassfa. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-foreground">
                <Github className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
      <div className="mb-4 p-3 rounded-xl bg-primary/5 w-fit group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
