import { useState } from "react";
import { BalanceCard } from "../components/BalanceCard";
import { RecentActivity } from "../components/RecentActivity";
import { TransferMoney } from "../components/TransferMoney";
import { AddMoney } from "../components/AddMoney";

// Enum for different dashboard views
const DashboardViews = {
  RECENT_ACTIVITY: "RECENT_ACTIVITY",
  SEND_MONEY: "SEND_MONEY",
  ADD_MONEY: "ADD_MONEY",
};

export const Dashboard = () => {
  const [activeView, setActiveView] = useState(DashboardViews.RECENT_ACTIVITY);

  const handleAddMoneyClick = () => {
    setActiveView(DashboardViews.ADD_MONEY);
  };

  const handleTransferMoneyClick = () => {
    setActiveView(DashboardViews.SEND_MONEY);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case DashboardViews.SEND_MONEY:
        return <TransferMoney />;
      case DashboardViews.ADD_MONEY:
        return <AddMoney />;
      default:
        return <AddMoney />;
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <BalanceCard
                onTransferMoneyClick={handleTransferMoneyClick}
                onAddMoneyClick={handleAddMoneyClick}
              />
            </div>
            <div className="col-span-8">{renderActiveView()}</div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-center">
            <div className="w-[61%] pt-5">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
