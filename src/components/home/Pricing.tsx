import { Button } from "../ui/button";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { Separator } from "../ui/separator";

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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
];

export const Pricing = () => {
  return (
    <MaxWidthWrapper className="text-center py-10 items-start">
      <h1 className="text-5xl font-bold text-foreground pb-5">Pricing</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        {prices.map((price) => (
          <div
            key={price.title}
            className="flex flex-col py-6 gap-2 border border-muted shadow-lg rounded-lg justify-start w-full"
          >
            <h1 className="text-xl font-semibold text-primary text-center px-6">{price.title}</h1>
            <h1 className="text-3xl font-semibold text-foreground text-center mb-5 px-6">
              ${price.price}
              <span className="text-lg text-muted-foreground"> /month</span>
            </h1>
            <ul className="text-left text-foreground px-6">
              {price.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <div className="flex flex-col gap-6 w-full h-full justify-end mt-10 items-center">
              <Separator className="bottom-0" />
              <div className="w-full px-6">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
    // <div className="flex flex-col w-screen items-center justify-start mb-40 gap-10">

    // </div>
  );
};
