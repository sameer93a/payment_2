import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const RecentTransaction = () => {
  const [backendData, setBackendData] = useState(null);
  const jwt = localStorage.getItem("token");

  useEffect(() => {
    if (jwt) {
      axios
        .get("http://localhost:3000/api/v1/payment/status", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((result) => {
          setBackendData(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Jwt toke is missing");
    }
  }, [jwt]);

  // console.log(backendData);

  return (
    <div>
      <CardData backendData={backendData} />
    </div>
  );
};

function CardData({ backendData }: any) {
  if (!backendData || !backendData.extractedValues) return null; // Check if extractedValues exists
  const latestTransactions = backendData.extractedValues.slice(-10).reverse();

  console.log(latestTransactions);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your last 10 transaction.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>
              {latestTransactions.length
                ? backendData.msg
                : "No transactions available"}
            </TableCaption>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestTransactions.map((transaction: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {transaction.date ? transaction.date.split("T")[0] : ""}
                  </TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>{transaction.type || ""}</TableCell>
                  <TableCell className="text-right">
                    {transaction.amount || ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
