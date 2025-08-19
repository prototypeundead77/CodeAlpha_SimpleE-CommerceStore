import { useState } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { useCart } from "@/hooks/useCart";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { cartItemsCount } = useCart();

  const categories = [
    { name: "All", value: "" },
    { name: "Electronics", value: "Electronics" },
    { name: "Fashion", value: "Fashion" },
    { name: "Home & Kitchen", value: "Home & Kitchen" },
    { name: "Books", value: "Books" },
    { name: "Sports", value: "Sports" }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartItemsCount} 
        onSearch={handleSearch}
      />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-light to-background border-b">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                Welcome to <span className="text-primary">CartFlow</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover amazing products at unbeatable prices. Shop from thousands of items with fast delivery and secure checkout.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge className="bg-success text-success-foreground">Free Shipping</Badge>
                <Badge className="bg-primary text-primary-foreground">24/7 Support</Badge>
                <Badge className="bg-secondary text-secondary-foreground">Easy Returns</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Categories & Products */}
        <section className="container mx-auto px-4 py-8">
          {/* Category Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Badge
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "secondary"}
                    className={`cursor-pointer transition-colors ${
                      selectedCategory === category.value
                        ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                        : "hover:bg-accent"
                    }`}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Search results for "{searchQuery}"
              </h2>
            </div>
          )}

          {/* Products Grid */}
          <ProductGrid 
            searchQuery={searchQuery} 
            category={selectedCategory}
          />
        </section>
      </main>
    </div>
  );
};

export default Index;
