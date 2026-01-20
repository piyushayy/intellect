import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Brain, Target, Star, Users } from "lucide-react";
import Image from "next/image";
import { HeroSection } from "@/components/ui/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans selection:bg-yellow-200 selection:text-black">
      <Navbar />

      <main className="flex-1 flex flex-col relative overflow-hidden">

        {/* HERO SECTION */}
        <HeroSection
          title={<>Practice smarter. <br /></>}
          animatedTexts={[
            "Reach a better college.",
            "Crack CUET with top ranks.",
            "Master your dream subjects.",
            "Achieve your potential."
          ]}
          subtitle="The intelligent learning ecosystem for ambitious Commerce & Humanities students."
          infoBadgeText="Trusted by 10,000+ Students"
          ctaButtonText="Start Learning Free"
          socialProofText="Join over 10k+ learners"
          avatars={[
            { src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "User 1", fallback: "U1" },
            { src: "https://randomuser.me/api/portraits/men/32.jpg", alt: "User 2", fallback: "U2" },
            { src: "https://randomuser.me/api/portraits/women/68.jpg", alt: "User 3", fallback: "U3" },
            { src: "https://randomuser.me/api/portraits/men/45.jpg", alt: "User 4", fallback: "U4" },
          ]}
        />

        {/* WHAT IS THIS? */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="aspect-square bg-indigo-50 rounded-[3rem] p-12 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-50"></div>
                  <div className="relative z-10 bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-indigo-50 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                    <div className="flex gap-4 items-center mb-6">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                        <Brain className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="h-2 w-24 bg-slate-100 rounded full mb-2"></div>
                        <div className="h-2 w-16 bg-slate-100 rounded full"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-slate-50 rounded"></div>
                      <div className="h-2 w-5/6 bg-slate-50 rounded"></div>
                      <div className="h-2 w-4/6 bg-slate-50 rounded"></div>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Correct</div>
                      <div className="text-xs text-slate-400">Analysis</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="font-serif text-5xl md:text-6xl text-slate-900 mb-6 leading-tight">
                  What is <br /><span className="text-indigo-600 italic">Intellect?</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                  It's not just another question bank. Intellect is an intelligent learning ecosystem designed specifically for CUET aspirants.
                  We combine rigorous mock tests with adaptive analytics to help you master concepts, not just memorize answers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO IS IT FOR? */}
        <section className="py-24 bg-[#F5F5F0]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-serif text-5xl md:text-6xl text-slate-900 mb-6 leading-tight">
                  Who is it <br /><span className="text-indigo-600 italic">for?</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                  If you're aiming for top-tier universities like DU, BHU, or JNU, this is for you.
                  Whether you're starting from scratch or polishing your weak areas, Intellect adapts to your pace.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Class 12 Students', 'Droppers', 'CUET Aspirants'].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-white rounded-[3rem] p-12 relative overflow-hidden flex items-center justify-center shadow-sm">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                    <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                      <Users className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-sm font-bold text-slate-600">Students</span>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                      <Target className="w-8 h-8 text-yellow-500 mb-2" />
                      <span className="text-sm font-bold text-slate-900">Top Rankers</span>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center col-span-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Targeting</span>
                      <span className="text-xl font-bold text-indigo-600">Dream College</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY IT'S BETTER? */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">
                Why it's <span className="text-indigo-400 italic">better.</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Most platforms overwhelm you. We clarify. Here is how we differ from the noise.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-all">
                <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">No Fluff</h3>
                <p className="text-slate-400 leading-relaxed">
                  We removed ads, distractions, and irrelevant topics. Just pure, focused questions that actually appear in exams.
                </p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-all">
                <div className="w-12 h-12 bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Adaptive & Smart</h3>
                <p className="text-slate-400 leading-relaxed">
                  Our system learns your weak spots. If you fail Algebra, we give you more Algebra until you master it.
                </p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-all">
                <div className="w-12 h-12 bg-rose-900/50 rounded-xl flex items-center justify-center text-rose-400 mb-6">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Premium Quality</h3>
                <p className="text-slate-400 leading-relaxed">
                  Hand-crafted explanations that actually teach you the concept, not just tell you the answer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Loved by learners.</h2>
              <p className="text-slate-400 text-lg">Join the community of students aiming for top colleges.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Aarav S.", from: "Delhi", text: "The explanations are actually intuitive. I finally understood Calculus concepts I struggled with for months." },
                { name: "Priya M.", from: "Mumbai", text: "I love the distraction-free design. No ads, no noise, just pure learning. My mock test scores increased by 40%." },
                { name: "Rohan K.", from: "Bangalore", text: "Specifically tailored for CUET pattern. The PYQs section is a goldmine. Highly recommended!" }
              ].map((t, i) => (
                <div key={i} className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:bg-slate-800 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-lg leading-relaxed mb-6 text-slate-200">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.from}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT / VISION */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-indigo-600">
              <Brain className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8">Our Vision</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-12">
              We believe that learning shouldn't be stressful or cluttered.
              Our mission is to create the calmest, most intelligent learning platform in India
              for competitive exams. We strip away the noise and focus on what truly matters:
              <span className="font-semibold text-slate-900"> conceptual clarity</span> and
              <span className="font-semibold text-slate-900"> consistent practice</span>.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-100 pt-12">
              <div>
                <div className="text-3xl font-bold text-slate-900 mb-1">10k+</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Questions</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-slate-900 mb-1">5k+</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Users</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-slate-900 mb-1">100%</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Focus</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-slate-900 mb-1">24/7</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#FAF9F6] border-t border-slate-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8">
              Ready to start your journey?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-12 rounded-full text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200">
                  Join for Free
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">No credit card required • Cancel anytime</p>
          </div>
        </section>

      </main>

      <footer className="bg-black text-slate-400 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
            {/* Logo Column */}
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-black rounded-sm" />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">Intellect</span>
              </div>
            </div>

            {/* Links Columns */}
            <div className="flex flex-col gap-4">
              <h4 className="text-slate-500 font-medium mb-2">Product</h4>
              <Link href="/practice" className="text-slate-300 hover:text-white transition-colors">Courses</Link>
              <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
              <Link href="/help" className="text-slate-300 hover:text-white transition-colors">Help</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-slate-500 font-medium mb-2">Company</h4>
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">About us</Link>
              <Link href="/careers" className="text-slate-300 hover:text-white transition-colors">Careers</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-slate-500 font-medium mb-2">Resources</h4>
              <Link href="/blog" className="text-slate-300 hover:text-white transition-colors">Blog</Link>
              <Link href="/success-stories" className="text-slate-300 hover:text-white transition-colors">Success Stories</Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-900 gap-6">
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">California Privacy Policy</Link>
            </div>
            <p className="text-sm text-slate-600">© 2026 Intellect Education Inc.</p>
            <div className="flex gap-6">
              {/* Social Icons (using text/emoji or imported icons if available) */}
              {/* Since I cannot easily add new imports without seeing the top of the file in the same turn reliably or breaking existing imports, I will use SVGs inline for absolute safety and precision */}
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 014.123 3.36c.636-.247 1.363-.416 2.427-.465C7.568 2.858 7.922 2.845 10.33 2h.67l-.685.001zM10.985 4H10.66C8.24 4.015 7.94 4.029 6.995 4.072c-.947.043-1.458.197-1.796.329a2.91 2.91 0 00-1.08.703 2.91 2.91 0 00-.703 1.08c-.131.338-.285.849-.328 1.796-.043.946-.057 1.25-.057 3.665v.67c0 2.415.014 2.719.057 3.665.043.947.197 1.458.328 1.796.228.59.693 1.055 1.283 1.283.338.131.849.285 1.796.328.946.043 1.25.057 3.665.057h.67c2.415 0 2.719-.014 3.665-.057.947-.043 1.458-.197 1.796-.328a2.91 2.91 0 001.08-.703 2.91 2.91 0 00.703-1.08c.131-.338.285-.849.328-1.796.043-.946.057-1.25.057-3.665v-.67c0-2.415-.014-2.719-.057-3.665-.043-.947-.197-1.458-.328-1.796a2.91 2.91 0 00-.703-1.08 2.91 2.91 0 00-1.08-.703c-.338-.131-.849-.285-1.796-.328-.946-.043-1.25-.057-3.665-.057zM12.315 7.848a4.152 4.152 0 110 8.304 4.152 4.152 0 010-8.304zm0 2a2.152 2.152 0 100 4.304 2.152 2.152 0 000-4.304zm5.534-2.885a1.16 1.16 0 110 2.32 1.16 1.16 0 010-2.32z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
