export interface SubscriptionPlan {
  name: "Starter" | "Professional" | "Enterprise";
  status: "active" | "trialing" | "canceled";
  price: number;
  renewalDate: string;
}

const defaultPlan: SubscriptionPlan = {
  name: "Professional",
  status: "trialing",
  price: 4990,
  renewalDate: "2026-07-06" // 14 days from 2026-06-22
};

export const paymentService = {
  getSubscription(): SubscriptionPlan {
    const val = localStorage.getItem("fleetpulse_subscription");
    if (!val) {
      localStorage.setItem("fleetpulse_subscription", JSON.stringify(defaultPlan));
      return defaultPlan;
    }
    try {
      return JSON.parse(val);
    } catch {
      return defaultPlan;
    }
  },
  saveSubscription(plan: SubscriptionPlan): void {
    localStorage.setItem("fleetpulse_subscription", JSON.stringify(plan));
  },
  upgradePlan(name: "Starter" | "Professional" | "Enterprise"): SubscriptionPlan {
    const plan = this.getSubscription();
    plan.name = name;
    plan.status = "active";
    plan.price = name === "Starter" ? 1990 : name === "Professional" ? 4990 : 9990;
    plan.renewalDate = "2026-07-22"; // 1 month after
    this.saveSubscription(plan);
    return plan;
  }
};
