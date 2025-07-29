import Image from 'next/image';
import { type ProductImage as ProductImageType } from '@/lib/shopify';

interface ProductImageProps {
  image: ProductImageType | null;
  title: string;
  placeholder?: 'program' | 'supplement';
}

export default function ProductImage({ image, title, placeholder = 'program' }: ProductImageProps) {
  if (!image) {
    return (
      <div className="aspect-square relative rounded-2xl overflow-hidden bg-bbd-charcoal/20">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            {placeholder === 'program' ? (
              <>
                <svg className="w-24 h-24 text-bbd-ivory/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-bbd-ivory/40">Program Image</p>
              </>
            ) : (
              <>
                <svg className="w-24 h-24 text-bbd-ivory/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p className="text-bbd-ivory/40">Supplement Image</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-square relative rounded-2xl overflow-hidden bg-bbd-charcoal/20">
      <Image
        src={image.url}
        alt={image.altText || title}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}