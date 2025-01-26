import { Resturant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  resturant: Resturant;
};

const ResturantInfo = ({ resturant }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {resturant.resturantName}
        </CardTitle>
        <CardDescription>
          {resturant.city}, {resturant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {resturant.cuisines.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < resturant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default ResturantInfo;
