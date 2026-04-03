import BalanceTrendChart from "./BalanceTrendChart";
import SpendingBreakdownChart from "./SpendingBreakdownChart";

export function ChartGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Each wrapper is flex + h-full + shared min-height so both cards stretch equally */}
      <div className="flex flex-col sm:min-h-[580px]">
        <BalanceTrendChart />
      </div>
      <div className="flex flex-col sm:min-h-[580px]">
        <SpendingBreakdownChart />
      </div>
    </div>
  );
}