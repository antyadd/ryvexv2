import { Card } from "@/components/ui/card";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { useState } from "react";
import { ChevronDown, Star, ShoppingCart, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
  features: string[];
  status?: "available" | "upcoming";
}

interface Testimonial {
  id: string;
  name: string;
  text: string;
  date: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Ryvex Temp",
    category: "Temporary",
    price: 5,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503886932/Ch4kod5s7mrb6bXh34MfdS/1774822701390_9623f924.png",
    description: "One-time temporary access to Ryvex services.",
    badge: "Popular",
    features: ["One-Time: $5", "Lifetime: $60", "Instant", "No setup"],
    status: "available"
  },
  {
    id: "2",
    name: "Ryvex Public",
    category: "Public",
    price: 5,
    image: "https://cdn.discordapp.com/attachments/1486408968585613354/1491431758300975377/Gemini_Generated_Image_737ylk737ylk737y.png?ex=69d7ab90&is=69d65a10&hm=39ac269cb74fff436964c769289c2093d73756a31d0ed653a643d4774401fe75&",
    description: "Premium Combat Software with private-to-public build.",
    badge: "Value",
    features: ["24H: $5", "7D: $20", "30D: $40", "Lifetime: $65"],
    status: "available"
  },
  {
    id: "3",
    name: "Ryvex Private",
    category: "Private",
    price: 20,
    image: "https://cdn.discordapp.com/attachments/1486408968585613354/1491432026639962182/Gemini_Generated_Image_572bnp572bnp572b.png?ex=69d7abd0&is=69d65a50&hm=d3d701c8ca0a3ce42ae2361c7ffbca641c40bd115e2377fca302e77f0c46eb47&",
    description: "Private Ryvex services being reworked.",
    badge: "Premium",
    features: ["Advanced", "Private", "Priority", "Coming"],
    status: "available"
  },
  {
    id: "4",
    name: "Ryvex Perm",
    category: "Permanent",
    price: 20,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503886932/Ch4kod5s7mrb6bXh34MfdS/Gemini_Generated_Image_8shwfc8shwfc8shw_d8f93d41.png",
    description: "Permanent Solution with lifetime access.",
    badge: "Flagship",
    features: ["One-Time: $20", "Lifetime: $30", "No renewals", "Permanent"],
    status: "available"
  },
  {
    id: "5",
    name: "Fortnite Premium",
    category: "Premium",
    price: 0,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503886932/Ch4kod5s7mrb6bXh34MfdS/1774822701390_9623f924.png",
    description: "Ultimate Fortnite Premium experience coming soon.",
    badge: "Coming Soon",
    features: ["Ultimate", "Premium", "Exclusive", "Limited"],
    status: "upcoming"
  }
];

const testimonials: Testimonial[] = [
  { id: "1", name: "Iris®", text: "+rep bought lifetime fortnite-private its ud", date: "3/22/2026" },
  { id: "2", name: "Chill Guy", text: "+rep @RyvexV2 custom cheat work", date: "3/22/2026" },
  { id: "3", name: "peki [UD]", text: "+rep @RyvexV2 fortnite premium", date: "3/22/2026" },
  { id: "4", name: "Gmoney", text: "+rep @RyvexV2 amazing support and w Fortnite premium", date: "3/27/2026" },
  { id: "5", name: "Naro [HONE]", text: "+rep @Ryvex fortnite acc from inv contest", date: "3/28/2026" },
  { id: "6", name: "flys [rich]", text: "+rep @Ryvex acc gen. FA acc", date: "3/31/2026" },
  { id: "7", name: "@ Active | RXD", text: "+rep @Ryvex for the best che3ts", date: "4/3/2026" },
  { id: "8", name: "ReosGoty7", text: "+rep @Ryvex free cheat working W", date: "4/3/2026" },
  { id: "9", name: "1Rinad", text: "+rep temp spoofer @ReosGoty7 @Ryvex", date: "4/5/2026" },
  { id: "10", name: "ItsxP3p [UE]", text: "+rep @Ryvex free temp spoofer", date: "4/5/2026" }
];

const faqs: FAQ[] = [
  {
    id: "1",
    question: "What is a spoofer and how does it work?",
    answer: "A spoofer is security software that masks your hardware identification. It works by creating a virtual layer between your system and game servers, making your device appear different each time you connect."
  },
  {
    id: "2",
    question: "Is Ryvex safe to use?",
    answer: "Yes, Ryvex is designed with security as the top priority. We use advanced encryption and regularly update our systems to stay ahead of detection methods."
  },
  {
    id: "3",
    question: "What's the difference between Temp and Permanent?",
    answer: "Temp provides short-term access (24 hours to 30 days), while Permanent gives you lifetime access with no renewal needed. Choose based on your usage needs."
  },
  {
    id: "4",
    question: "How do I get access after purchase?",
    answer: "After joining our Discord and completing your purchase, you'll receive instant access to your product. Our support team is available 24/7 to help with setup."
  },
  {
    id: "5",
    question: "Can I upgrade from Temp to Permanent?",
    answer: "Yes! You can upgrade anytime. Contact our support team in Discord and we'll help you transition to a permanent plan with credit for your previous purchase."
  },
  {
    id: "6",
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods through our Discord server. Our team will guide you through the payment process securely."
  }
];

const categories = ["All", "Temporary", "Public", "Private", "Permanent", "Premium"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState("all");

  const filteredProducts = products.filter(p => {
    if (p.status === "upcoming") return false;
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
    const priceMatch = 
      priceFilter === "all" ||
      (priceFilter === "under10" && p.price < 10) ||
      (priceFilter === "10-50" && p.price >= 10 && p.price < 50) ||
      (priceFilter === "50plus" && p.price >= 50);
    return categoryMatch && priceMatch;
  });

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between animate-fade-in-up">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center animate-pulse-glow">
              <span className="text-black font-bold text-lg">RX</span>
            </div>
            <span className="text-xl font-bold text-foreground">Ryvex</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-foreground hover:text-primary transition-colors">Products</a>
            <a href="#reviews" className="text-foreground hover:text-primary transition-colors">Reviews</a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90 text-black btn-smooth font-semibold">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-spacing relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="space-y-4 max-w-4xl">
              <div className="inline-block mx-auto animate-slide-in-left">
                <span className="px-4 py-2 bg-secondary text-foreground rounded-full text-sm font-medium">
                  Premium Gaming Solutions
                </span>
              </div>
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-none animate-slide-in-right">
                  The Ultimate
                </h1>
                <GooeyText
                  texts={["Spoofer", "Cheating", "Undetected", "Tournament Ready"]}
                  morphTime={1}
                  cooldownTime={0.25}
                  className="h-40 md:h-48"
                />
              </div>

              {/* Discord Invite Button */}
              <div className="pt-4">
                <a href="https://discord.gg/mJhhdSrpGS" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white btn-smooth font-semibold">
                    Join Our Discord Community
                  </Button>
                </a>
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
                Premium spoofing and security solutions designed for serious gamers. Reliable, secure, and always updated.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 pt-8 justify-center">
              <div className="text-center animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                <p className="text-3xl font-bold text-primary animate-scale-bounce">10K+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="text-center animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <p className="text-3xl font-bold text-primary animate-scale-bounce">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
                <p className="text-3xl font-bold text-primary animate-scale-bounce">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a href="#products">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-black btn-smooth font-semibold animate-slide-in-left">
                  Explore Products
                </Button>
              </a>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary btn-smooth text-foreground animate-slide-in-right">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section-spacing bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">Ryvex Premium Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Carefully curated solutions for every gaming need
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Category Filters */}
            <div className="flex gap-3 overflow-x-auto pb-2 justify-center flex-wrap">
              {categories.map((category, idx) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap animate-fade-in-up ${
                    selectedCategory === category
                      ? "bg-primary text-black font-semibold animate-pulse-glow"
                      : "bg-card text-foreground border border-border hover:bg-muted"
                  }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="flex gap-2 justify-center flex-wrap">
              {[
                { value: "all", label: "All Prices" },
                { value: "under10", label: "Under $10" },
                { value: "10-50", label: "$10-$50" },
                { value: "50plus", label: "$50+" }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setPriceFilter(filter.value)}
                  className={`px-4 py-1 rounded-full text-sm transition-all duration-200 ${
                    priceFilter === filter.value
                      ? "bg-primary text-black font-semibold"
                      : "bg-secondary text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <div key={product.id} className="card-premium overflow-hidden group stagger-item hover:animate-scale-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.badge && (
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold animate-bounce-custom ${
                      product.status === "upcoming" 
                        ? "bg-yellow-500 text-black" 
                        : "bg-primary text-black"
                    }`}>
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                    <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                  {/* Features */}
                  <div className="space-y-2">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 animate-slide-in-left" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-glow"></span>
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting at</p>
                      <p className="text-2xl font-bold text-primary">${product.price}</p>
                    </div>
                    {product.status === "upcoming" ? (
                      <Button disabled className="bg-gray-600 text-white font-semibold">
                        Coming Soon
                      </Button>
                    ) : (
                      <a href={`/product/${product.id}`}>
                        <Button className="bg-primary hover:bg-primary/90 text-black btn-smooth font-semibold animate-bounce-custom">
                          View Details
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="section-spacing bg-card/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">Community Vouches</h2>
            <p className="text-lg text-muted-foreground">Real reviews from our satisfied customers</p>
          </div>

          {/* Testimonial Carousel */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4 animate-scale-bounce">
              <div className="flex justify-center gap-1 animate-slide-in-left">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary animate-rotate" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <p className="text-lg text-foreground italic animate-fade-in-up">"{testimonials[currentTestimonial].text}"</p>
              <div className="flex items-center justify-center gap-3 animate-slide-in-right">
                <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center animate-pulse-glow">
                  <span className="text-primary font-bold">{testimonials[currentTestimonial].name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonials[currentTestimonial].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].date}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 hover:bg-secondary rounded-full transition-colors animate-bounce-custom"
                >
                  <ChevronDown className="w-5 h-5 text-foreground rotate-90" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 hover:bg-secondary rounded-full transition-colors animate-bounce-custom"
                >
                  <ChevronDown className="w-5 h-5 text-foreground -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-spacing bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know</p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={faq.id}
                className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in-up stagger-item"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-foreground text-left">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform duration-300 ${
                      expandedFAQ === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6 text-muted-foreground animate-slide-in-left">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Program Section */}
      <section id="affiliate" className="section-spacing bg-card/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">Earn with Ryvex Affiliate Program</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Turn your audience into passive income. Create custom discount codes and earn 5-10% commission on every sale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 text-center animate-fade-in-up">
              <div className="text-4xl font-bold text-primary mb-3">5-10%</div>
              <p className="text-foreground font-semibold mb-2">Commission Rate</p>
              <p className="text-muted-foreground text-sm">Choose your own discount percentage</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl font-bold text-primary mb-3">Real-Time</div>
              <p className="text-foreground font-semibold mb-2">Earnings Tracking</p>
              <p className="text-muted-foreground text-sm">Monitor clicks, conversions & earnings</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold text-primary mb-3">24/7</div>
              <p className="text-foreground font-semibold mb-2">Passive Income</p>
              <p className="text-muted-foreground text-sm">Earn while you sleep with your codes</p>
            </div>
          </div>

          <div className="text-center">
            <a href="/affiliate">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-black btn-smooth font-semibold animate-bounce-custom">
                Join Affiliate Program
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-black">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground">Ready to Elevate Your Game?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of gamers using our premium solutions. Secure, reliable, and always updated.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="https://discord.gg/mJhhdSrpGS" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-black btn-smooth font-semibold animate-bounce-custom">
                  Get Started Now
                </Button>
              </a>
              <a href="#products">
                <Button size="lg" variant="outline" className="border-border hover:bg-secondary btn-smooth text-foreground">
                  View Products
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black border-t border-border text-foreground py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4 animate-slide-in-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">RX</span>
                </div>
                <span className="font-bold">Ryvex</span>
              </div>
              <p className="text-sm text-muted-foreground">Premium spoofing solutions for serious gamers.</p>
            </div>

            {/* Products */}
            <div className="space-y-4 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
              <h4 className="font-semibold">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#products" className="hover:text-primary transition-colors">Ryvex Temp</a></li>
                <li><a href="#products" className="hover:text-primary transition-colors">Ryvex Public</a></li>
                <li><a href="#products" className="hover:text-primary transition-colors">Ryvex Private</a></li>
                <li><a href="#products" className="hover:text-primary transition-colors">Ryvex Perm</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#reviews" className="hover:text-primary transition-colors">Reviews</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4 animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
              <h4 className="font-semibold">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://discord.gg/mJhhdSrpGS" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground animate-fade-in-up">
            <p>&copy; 2026 Ryvex. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
