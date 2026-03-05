"use client";

import { RechartsDevtools } from "@recharts/devtools";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, DataTable, DatePicker } from "@/components";
import { cn } from "@/utils";

type Props = {
  goldPrices: any;
  pricesRange: any;
};

const HomeTemplate = ({ goldPrices, pricesRange }: Props) => {
  const [goldPricesData, setGoldPricesData] = useState<any>(goldPrices);
  ``;
  const handleChangeDate = async (date?: Date) => {
    if (!date) return;
    setDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const goldPrices = await fetch(
      `https://www.vang.today/api/prices.php?date=${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`,
    ).then((res) => res.json());

    setGoldPricesData(goldPrices);
  };

  const goldTypes: { value: string; label: string }[] = [
    {
      value: "XAUUSD",
      label: "Giá vàng thế giới (XAU/USD)",
    },
    {
      value: "SJL1L10",
      label: "Vàng miếng SJC 9999",
    },
    {
      value: "SJ9999",
      label: "Vàng nhẫn SJC 9999",
    },
    {
      value: "DOHNL",
      label: "Vàng DOJI tại Hà Nội",
    },
    {
      value: "DOHCML",
      label: "Vàng DOJI tại TP.HCM",
    },
    {
      value: "DOJINHTV",
      label: "Vàng trang sức DOJI",
    },
    {
      value: "BTSJC",
      label: "Vàng miếng Bảo Tín SJC",
    },
    {
      value: "BT9999NTT",
      label: "Vàng nhẫn tròn trơn Bảo Tín 9999",
    },
    {
      value: "PQHNVM",
      label: "Vàng PNJ tại Hà Nội",
    },
    {
      value: "PQHN24NTT",
      label: "Vàng 24K PNJ (nhẫn tròn trơn)",
    },
    {
      value: "VNGSJC",
      label: "Vàng SJC của VN Gold",
    },
    {
      value: "VIETTINMSJC",
      label: "Vàng SJC VietinBank",
    },
  ];

  const [date, setDate] = useState<Date | undefined>(new Date());
  const columns: ColumnDef<{ label: string; value: string }>[] = [
    {
      accessorKey: "goldType",
      header: "",
      cell: ({ row }) => {
        const goldTypeName = goldTypes.find(
          (type) => type.value === row.original.value,
        );
        if (!goldTypeName) return null;

        return <div>{goldTypeName.label}</div>;
      },
    },
    {
      accessorKey: "buyPrice",
      header: "Mua vào",
      cell: ({ row }) => {
        const buy = goldPricesData.prices[row.original.value].buy;
        const changeBuy = goldPricesData.prices[row.original.value].change_buy;

        return (
          <div>
            <div>{formatNumber(buy)}</div>
            {changeBuy ? (
              <div
                className={cn("", {
                  "text-[#d50606]": changeBuy < 0,
                  "text-[#08a845]": changeBuy > 0,
                })}
              >
                {formatNumber(changeBuy)}
              </div>
            ) : null}
          </div>
        );
      },
    },
    {
      accessorKey: "sellPrice",
      header: "Bán ra",
      cell: ({ row }) => {
        const sell = goldPricesData.prices[row.original.value].sell;
        const changeSell =
          goldPricesData.prices[row.original.value].change_sell;
        return (
          <div>
            <div>{sell ? formatNumber(sell) : ""}</div>
            {changeSell ? (
              <div
                className={cn("", {
                  "text-[#d50606]": changeSell < 0,
                  "text-[#08a845]": changeSell > 0,
                })}
              >
                {formatNumber(changeSell)}
              </div>
            ) : null}
          </div>
        );
      },
    },
  ];

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US");
  };

  const handleChangeGoldPricesRange = async (lastDate: number) => {
    const pricesRange = await fetch(
      `https://www.vang.today/api/prices.php?days=${lastDate}`,
    );

    return pricesRange.json();
  };

  const [collapse, setCollapse] = useState(true);

  return (
    <div className="p-3">
      <Card
        className={cn("transition-all duration-300", {
          "w-full": !collapse,
          "sm:w-fit": collapse,
        })}
      >
        <CardContent>
          {collapse ? (
            <div className="flex items-center justify-between gap-x-4">
              <div className="space-y-3">
                <div>
                  <div className="flex items-start">
                    <div className="w-20">Mua vào</div>
                    <div className="font-semibold">
                      <div className="text-base">
                        {formatNumber(goldPrices.prices.SJL1L10.buy)}
                      </div>
                      <div
                        className={cn("", {
                          "text-[#d50606]":
                            goldPrices.prices.SJL1L10.change_buy < 0,
                          "text-[#08a845]":
                            goldPrices.prices.SJL1L10.change_buy > 0,
                        })}
                      >
                        {formatNumber(goldPrices.prices.SJL1L10.change_buy)}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start">
                    <div className="w-20">Bán ra</div>
                    <div className="font-semibold">
                      <div className="text-base">
                        {formatNumber(goldPrices.prices.SJL1L10.sell)}
                      </div>
                      <div
                        className={cn("", {
                          "text-[#d50606]":
                            goldPrices.prices.SJL1L10.change_sell < 0,
                          "text-[#08a845]":
                            goldPrices.prices.SJL1L10.change_sell > 0,
                        })}
                      >
                        {formatNumber(goldPrices.prices.SJL1L10.change_sell)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => {
                  if (!collapse) return;
                  setCollapse((prev) => !prev);
                }}
              >
                <ChevronRight />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <DatePicker
                  disabled={{
                    after: new Date(),
                  }}
                  date={date}
                  onChange={handleChangeDate}
                />
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => {
                    setCollapse((prev) => !prev);
                  }}
                >
                  Thu nhỏ
                </button>
              </div>
              <div className="md:flex items-center gap-x-4">
                <div className="flex-1">
                  <DataTable columns={columns} data={goldTypes} />
                </div>
                <div className="flex-1 max-md:mt-4 flex items-center rounded-sm">
                  <LineChart
                    style={{
                      width: "100%",
                      maxWidth: "700px",
                      maxHeight: "70vh",
                      aspectRatio: 1.618,
                    }}
                    responsive
                    data={pricesRange.map((item: any) => {
                      return {
                        buy: item.prices.SJL1L10.buy,
                        sell: item.prices.SJL1L10.sell,
                        name: format(item.date, "dd/MM"),
                      };
                    })}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={formatNumber}
                      domain={["dataMin", "dataMax"]}
                      width="auto"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--background)",
                      }}
                      formatter={(value) => {
                        return [formatNumber(value as number)];
                      }}
                    />
                    <Legend />
                    <Line
                      animationDuration={3000}
                      strokeWidth={2}
                      type="monotone"
                      dataKey="buy"
                      name="Mua vào"
                      stroke="#d50606"
                      isAnimationActive={true}
                    />
                    <Line
                      animationDuration={3000}
                      strokeWidth={2}
                      type="monotone"
                      dataKey="sell"
                      name="Bán ra"
                      stroke="#08a845"
                      isAnimationActive={true}
                    />
                    <RechartsDevtools />
                  </LineChart>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { HomeTemplate };
