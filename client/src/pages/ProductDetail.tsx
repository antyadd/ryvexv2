import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChevronLeft, Star, ShoppingCart, Check } from "lucide-react";
import { useRoute } from "wouter";

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

const products: Product[] = [
  {
    id: "1",
    name: "Ryvex Temp",
    category: "Temporary",
    price: 5,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503886932/Ch4kod5s7mrb6bXh34MfdS/1774822701390_9623f924.png",
    description: "One-time temporary access to Ryvex services. Perfect for testing or short-term use.",
    badge: "Popular",
    features: ["One-Time Access: $5", "Lifetime Access: $60", "Instant activation", "No installation required", "Works on all systems"]
  },
  {
    id: "2",
    name: "Ryvex Public",
    category: "Public",
    price: 5,
    image: "https://cdn.discordapp.com/attachments/1486408968585613354/1491431758300975377/Gemini_Generated_Image_737ylk737ylk737y.png?ex=69d7ab90&is=69d65a10&hm=39ac269cb74fff436964c769289c2093d73756a31d0ed653a643d4774401fe75&",
    description: "Premium Combat Software Experience. Private-to-public build with seamless, high-performance experience without compromising on security.",
    badge: "Value",
    features: ["24-Hour Access: $5", "7-Day Access: $20", "30-Day Access: $40", "Lifetime Access: $65"]
  },
  {
    id: "3",
    name: "Ryvex Private",
    category: "Private",
    price: 20,
    image: "https://cdn.discordapp.com/attachments/1486408968585613354/1491432026639962182/Gemini_Generated_Image_572bnp572bnp572b.png?ex=69d7abd0&is=69d65a50&hm=d3d701c8ca0a3ce42ae2361c7ffbca641c40bd115e2377fca302e77f0c46eb47&",
    description: "Private Ryvex services currently being reworked. Premium features coming soon.",
    badge: "Premium",
    features: ["Advanced features", "Private servers", "Priority support", "Coming soon"]
  },
  {
    id: "4",
    name: "Ryvex Perm",
    category: "Permanent",
    price: 20,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503886932/Ch4kod5s7mrb6bXh34MfdS/Gemini_Generated_Image_8shwfc8shwfc8shw_d8f93d41.png",
    description: "Permanent Solution. Get lifetime access to our premium permanent services. No subscriptions, no renewals—just one payment for total access.",
    badge: "Flagship",
    features: ["One-Time Access: $20", "Lifetime Access: $30", "No renewals", "Permanent access"]
  },
];

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  
  const availableProducts = products.filter(p => p.status !== "upcoming");
  const product = availableProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
          <a href="/" className="text-primary hover:text-primary/80">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ChevronLeft className="w-5 h-5 text-foreground" />
            <span className="text-foreground">Back to Products</span>
          </a>
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-lg">RX</span>
          </div>
        </div>
      </header>

      {/* Product Detail */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square bg-card rounded-lg overflow-hidden border border-border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-primary text-black px-4 py-2 rounded-full text-sm font-semibold">
                    {product.badge}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                <h1 className="text-5xl font-bold text-foreground mb-4">{product.name}</h1>
                <p className="text-xl text-foreground">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-foreground font-semibold">(248 reviews)</span>
              </div>

              {/* Price */}
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground mb-2">Price</p>
                <p className="text-5xl font-bold text-primary">${product.price.toFixed(2)}</p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Features</h3>
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 pt-6">
                <a href="https://discord.gg/mJhhdSrpGS" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-black font-semibold btn-smooth">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Purchase Now
                  </Button>
                </a>
                <a href="/" className="w-full">
                  <Button size="lg" variant="outline" className="w-full border-border hover:bg-secondary btn-smooth text-foreground">
                    Continue Shopping
                  </Button>
                </a>
              </div>

              {/* Trust Badge */}
              <div className="bg-secondary/50 border border-border rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">✓ Secure Payment • ✓ Instant Delivery • ✓ 24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
