interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function ProductQuantitySelector({ 
  quantity, 
  onQuantityChange 
}: ProductQuantitySelectorProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-bbd-ivory mb-2">
        Quantity
      </label>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="w-10 h-10 bg-bbd-charcoal/50 border border-bbd-ivory/20 rounded-md flex items-center justify-center text-bbd-ivory hover:bg-bbd-orange hover:text-bbd-black transition-all"
        >
          -
        </button>
        <span className="w-16 text-center text-bbd-ivory font-bold">{quantity}</span>
        <button
          onClick={() => onQuantityChange(quantity + 1)}
          className="w-10 h-10 bg-bbd-charcoal/50 border border-bbd-ivory/20 rounded-md flex items-center justify-center text-bbd-ivory hover:bg-bbd-orange hover:text-bbd-black transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
}