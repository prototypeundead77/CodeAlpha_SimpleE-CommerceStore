import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category?: string;
  stock?: number;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onClick?: (productId: string) => void;
}

const ProductCard = ({ product, onAddToCart, onClick }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-rating text-rating'
                : 'fill-muted text-muted-foreground'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">
          ({rating?.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg hover:bg-card-hover"
      onClick={() => onClick?.(product.id)}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.image_url || '/placeholder.svg'}
            alt={product.name}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.stock !== undefined && product.stock <= 10 && product.stock > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute right-2 top-2 bg-sale text-sale-foreground"
            >
              Only {product.stock} left
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge 
              variant="secondary" 
              className="absolute right-2 top-2 bg-muted text-muted-foreground"
            >
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          {product.category && (
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              {product.category}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="mb-3">
              {renderStars(product.rating)}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product.id);
            }}
            disabled={product.stock === 0}
            className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground transition-colors"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;