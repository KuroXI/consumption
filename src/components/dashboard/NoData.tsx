import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";

type NoDataProps = {
  colSpan: number;
  src: string;
  title: string;
};

export const NoData = ({ colSpan, src, title }: NoDataProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <h1 className="text-center text-xl font-medium">{title}</h1>
        <Image
          draggable={false}
          src={src}
          alt="NoData"
          width={550}
          height={550}
          quality={100}
          className="mx-auto"
        />
      </TableCell>
    </TableRow>
  );
};
