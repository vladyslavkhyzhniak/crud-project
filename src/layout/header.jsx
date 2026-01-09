export const Header = ({ balance }) => {
  const formattedBalance = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  }).format(balance);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md border-b border-gray-800">
      <div className="text-xl md:text-2xl font-bold text-emerald-400 tracking-wide flex items-center gap-2">
        <a href="/"><span>Emerald Manager</span></a>
      </div>

      <div className="flex items-center gap-3 bg-gray-800 px-5 py-2 rounded-full border border-gray-700 shadow-sm transition-transform hover:scale-105">
        <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-semibold">
          Środki:
        </span>
        <span className="text-lg font-bold text-emerald-400 tabular-nums">
          {formattedBalance}
        </span>
      </div>
    </header>
  );
};