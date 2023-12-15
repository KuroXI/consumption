import { Button } from "../ui/button";

const prices = [
  {
    title: "Free",
    price: 0,
    features: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    title: "Basic",
    price: 10,
    features: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    title: "Premium",
    price: 20,
    features: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
];

export const Pricing = () => {
  return (
    <div className="flex flex-col w-screen items-center justify-start mb-40 gap-10">
      <h1 className="text-5xl font-bold text-foreground">Pricing</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        {prices.map((price) => (
          <div
            key={price.title}
            className="flex flex-col p-6 gap-2 border border-muted shadow-lg rounded-lg justify-between"
          >
            <h1 className="text-xl font-semibold text-primary text-center">{price.title}</h1>
            <h1 className="text-3xl font-semibold text-foreground text-center mb-5">
              ${price.price}
              <span className="text-lg text-muted-foreground"> /month</span>
            </h1>
            <ul className="text-left text-foreground">
              {price.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="flex w-full justify-center mt-10">
              <Button className="w-1/3">Get Started</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
