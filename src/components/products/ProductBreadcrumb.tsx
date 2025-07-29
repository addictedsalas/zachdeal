import Link from 'next/link';

interface ProductBreadcrumbProps {
  productTitle: string;
  productType: 'supplement' | 'program';
}

export default function ProductBreadcrumb({ productTitle, productType }: ProductBreadcrumbProps) {
  const categoryName = productType === 'supplement' ? 'Supplements' : 'Programs';
  const categoryPath = productType === 'supplement' ? '/supplements' : '/programs';

  return (
    <div className="bg-bbd-charcoal/20 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-bbd-ivory/60 hover:text-bbd-orange transition-colors">
            Home
          </Link>
          <span className="text-bbd-ivory/40">/</span>
          <Link href={categoryPath} className="text-bbd-ivory/60 hover:text-bbd-orange transition-colors">
            {categoryName}
          </Link>
          <span className="text-bbd-ivory/40">/</span>
          <span className="text-bbd-ivory">{productTitle}</span>
        </nav>
      </div>
    </div>
  );
}