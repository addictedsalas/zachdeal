interface TrustIndicator {
  icon: React.ReactNode;
  text: string;
}

interface ProductTrustIndicatorsProps {
  indicators?: TrustIndicator[];
}

const defaultIndicators: TrustIndicator[] = [
  {
    icon: (
      <svg className="w-8 h-8 text-bbd-orange mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    text: "Instant Access"
  },
  {
    icon: (
      <svg className="w-8 h-8 text-bbd-orange mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    text: "30-Day Guarantee"
  },
  {
    icon: (
      <svg className="w-8 h-8 text-bbd-orange mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    text: "Secure Checkout"
  }
];

export default function ProductTrustIndicators({ 
  indicators = defaultIndicators 
}: ProductTrustIndicatorsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-bbd-ivory/10">
      {indicators.map((indicator, index) => (
        <div key={index} className="text-center">
          {indicator.icon}
          <p className="text-xs text-bbd-ivory/60">{indicator.text}</p>
        </div>
      ))}
    </div>
  );
}