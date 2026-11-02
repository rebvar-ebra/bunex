"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrailCardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  category: string;
  price: string;
  ingredients?: string;
  favorite: boolean;
  onFavoriteClick: () => void;
  orderUrl: string;
}

export function TrailCard({ imageUrl, imageAlt, title, category, price, ingredients, favorite, onFavoriteClick, orderUrl }: TrailCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="productCard"
      whileHover={reduceMotion ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="productImage">
        <Image src={imageUrl} alt={imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />
        <div className="productImageOverlay">
          <p>{category}</p>
          <h3>{title}</h3>
        </div>
        <button
          className="favoriteButton"
          type="button"
          aria-label={favorite ? `${title} nicht mehr merken` : `${title} als Favoriten merken`}
          aria-pressed={favorite}
          onClick={onFavoriteClick}
        >
          <Heart aria-hidden="true" />
        </button>
      </div>
      <div className="productInfo">
        <div className="productDetails">
          {ingredients ? <p>{ingredients}</p> : null}
          <strong className="priceTag">{price}</strong>
        </div>
        <Button asChild variant="secondary" className="productOrder">
          <a href={orderUrl} target="_blank" rel="noreferrer" aria-label={`${title} in der Online-Karte ansehen`}>
            Zur Online-Karte <ArrowRight aria-hidden="true" size={17} />
          </a>
        </Button>
      </div>
    </motion.article>
  );
}
