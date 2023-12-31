import { MaxWidthWrapper } from "../ui/max-width-wrapper";

export const Footer = () => {
  return (
    <MaxWidthWrapper className="w-full text-sm text-muted-foreground">
      <p className="my-10">
        The source code is available on{" "}
        <a className="text-primary hover:underline" href="https://github.com/KuroXI/consumption">
          Github
        </a>
      </p>
    </MaxWidthWrapper>
  );
};
