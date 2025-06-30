
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenTool, BookOpen, Search, Shield, Smartphone, Cloud, Star, ArrowRight, Check } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen paper-bg">
      {/* Navigation */}
      <nav className="border-b-2 border-gray-200 paper-bg note-shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold handwritten">Paper Notes</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="handwritten">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="btn-paper handwritten">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold handwritten mb-6 transform -rotate-1">
              Write Like You Mean It
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 handwritten max-w-3xl mx-auto leading-relaxed">
              {
                "Experience the joy of pen and paper in a digital world. Paper Notes brings the tactile feel of handwriting to your screen with a clean, distraction-free interface."
              }
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild className="btn-paper handwritten text-xl px-8 py-4">
              <Link href="/signup">
                Start Writing Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="handwritten text-lg">
              <Link href="/demo">See It In Action</Link>
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="max-w-4xl mx-auto">
            <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-8 transform rotate-1">
              <div className="ruled-paper rounded p-8 min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <PenTool className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="handwritten text-2xl text-gray-600">{"Your thoughts, beautifully organized"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold handwritten mb-4 transform rotate-1">Why Paper Notes?</h2>
            <p className="text-xl text-gray-600 handwritten max-w-2xl mx-auto">
              {"We've reimagined note-taking to feel as natural as writing in your favorite notebook"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-6 transform -rotate-1 hover:rotate-0 transition-transform">
              <BookOpen className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-xl font-bold handwritten mb-3">Notebook Feel</h3>
              <p className="text-gray-600 handwritten">
                {"Ruled lines, paper textures, and handwritten fonts make every note feel authentic and personal."}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-6 transform rotate-1 hover:rotate-0 transition-transform">
              <Search className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-xl font-bold handwritten mb-3">Smart Search</h3>
              <p className="text-gray-600 handwritten">
                {"Find any note instantly with powerful search that understands your handwritten-style content."}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-6 transform -rotate-1 hover:rotate-0 transition-transform">
              <Shield className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-xl font-bold handwritten mb-3">Private & Secure</h3>
              <p className="text-gray-600 handwritten">
                {"Your thoughts are yours alone. End-to-end encryption keeps your notes completely private."}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-6 transform rotate-1 hover:rotate-0 transition-transform">
              <Smartphone className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-xl font-bold handwritten mb-3">Works Everywhere</h3>
              <p className="text-gray-600 handwritten">
                {"Write on any device. Your notes sync seamlessly across phone, tablet, and computer."}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-6 transform -rotate-1 hover:rotate-0 transition-transform">
              <Cloud className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-xl font-bold handwritten mb-3">Auto-Save</h3>
              <p className="text-gray-600 handwritten">
                {"Never lose a thought. Every keystroke is automatically saved as you write."}
              </p>
            </div>

            {/* Feature 6 */}
            <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-6 transform rotate-1 hover:rotate-0 transition-transform">
              <PenTool className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-xl font-bold handwritten mb-3">Distraction-Free</h3>
              <p className="text-gray-600 handwritten">
                {"Clean, minimal interface lets you focus on what matters most - your ideas."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold handwritten mb-4 transform -rotate-1">Loved by Writers</h2>
            <p className="text-xl text-gray-600 handwritten">{"See what people are saying about Paper Notes"}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-6 torn-paper">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 handwritten mb-4">
                {
                  '"Finally, a notes app that doesn\'t feel like work. The paper aesthetic makes writing feel natural and enjoyable again."'
                }
              </p>
              <div className="handwritten text-sm text-gray-600">— Sarah Chen, Writer</div>
            </div>

            {/* Testimonial 2 */}
            <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-6 transform rotate-1">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 handwritten mb-4">
                {
                  '"I\'ve tried dozens of note apps, but Paper Notes is the first one that actually feels like writing. Love the handwritten fonts!"'
                }
              </p>
              <div className="handwritten text-sm text-gray-600">— Marcus Rodriguez, Student</div>
            </div>

            {/* Testimonial 3 */}
            <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-6 transform -rotate-1">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 handwritten mb-4">
                {
                  '"The clean, minimal design helps me focus on my thoughts without distractions. Perfect for journaling and brainstorming."'
                }
              </p>
              <div className="handwritten text-sm text-gray-600">— Emma Thompson, Designer</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold handwritten mb-4 transform rotate-1">Simple Pricing</h2>
            <p className="text-xl text-gray-600 handwritten">{"Start free, upgrade when you're ready"}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-8 transform -rotate-1">
              <h3 className="text-2xl font-bold handwritten mb-2">Free</h3>
              <div className="text-4xl font-bold handwritten mb-6">
                $0<span className="text-lg text-gray-600">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center handwritten">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  Up to 50 notes
                </li>
                <li className="flex items-center handwritten">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  Basic search
                </li>
                <li className="flex items-center handwritten">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  Mobile & web access
                </li>
                <li className="flex items-center handwritten">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  Paper-style themes
                </li>
              </ul>

              <Button className="w-full btn-paper handwritten text-lg py-3" asChild>
                <Link href="/signup">Start Free</Link>
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-8 transform rotate-1 relative">
              <div className="absolute -top-3 -right-3 bg-black text-white px-3 py-1 handwritten text-sm transform rotate-12">
                Popular
              </div>

              <h3 className="text-2xl font-bold handwritten mb-2">Pro</h3>
              <div className="text-4xl font-bold handwritten mb-6">
                $5<span className="text-lg text-gray-600">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center handwritten">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  Unlimited notes
                </li>
                <li className="flex items-center handwritten">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  Advanced search & tags
                </li>
                <li className="flex items-center handwritten">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  Offline access
                </li>
                <li className="flex items-center handwritten">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  Export to PDF
                </li>
                <li className="flex items-center handwritten">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  Priority support
                </li>
              </ul>

              <Button className="w-full btn-paper handwritten text-lg py-3" asChild>
                <Link href="/signup">Start Pro Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="paper-bg note-shadow rounded-lg border-2 border-gray-200 p-12 transform -rotate-1">
            <h2 className="text-4xl md:text-5xl font-bold handwritten mb-6">Ready to Start Writing?</h2>
            <p className="text-xl text-gray-600 handwritten mb-8 max-w-2xl mx-auto">
              {"Join thousands of writers who've rediscovered the joy of note-taking with Paper Notes."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild className="btn-paper handwritten text-xl px-8 py-4">
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <p className="text-sm text-gray-500 handwritten">No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-gray-200 paper-bg py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold handwritten mb-4">Paper Notes</h3>
              <p className="text-gray-600 handwritten text-sm">
                {"Beautiful, distraction-free note-taking with the feel of pen and paper."}
              </p>
            </div>

            <div>
              <h4 className="font-bold handwritten mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/features" className="text-gray-600 handwritten hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-600 handwritten hover:underline">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="text-gray-600 handwritten hover:underline">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold handwritten mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-gray-600 handwritten hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 handwritten hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="text-gray-600 handwritten hover:underline">
                    Status
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold handwritten mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-600 handwritten hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 handwritten hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 handwritten hover:underline">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500 handwritten text-sm">© 2025 Paper Notes. Made with ❤️ for writers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
