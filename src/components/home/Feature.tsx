import { BarChart, ShieldCheck, Target, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BarChart,
    title: "Track Expenses",
    description: "Easily record and categorize your daily expenses.",
  },
  {
    icon: Target,
    title: "Plan Budget",
    description: "Set monthly budgets and track your progress with ease.",
  },
  {
    icon: TrendingUp,
    title: "Analyze Spending",
    description: "Get insights into your spending habits with detailed analysis and reports.",
  }, {
		icon: ShieldCheck,
		title: "Reliable Security",
		description: "Your data is safe with us. We use industry standard encryption to protect your data.",
	}
];

export const Feature = () => {
  return (
    <div className="flex flex-col w-full items-center justify-start max-w-7xl mx-auto mb-40 gap-10">
      <h1 className="text-5xl font-bold text-foreground">Discover Our Unique Features</h1>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-16 text-center">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col gap-2 items-center justify-center">
            <feature.icon className="h-10 w-10 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">{feature.title}</h1>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
