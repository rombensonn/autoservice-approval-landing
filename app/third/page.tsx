import type { Metadata } from "next";
import { ThirdLanding } from "./ThirdLanding";

export const metadata: Metadata = {
  title: "Меньше звонков в автосервис — клиент сам видит статус ремонта",
  description:
    "Сервис для автосервисов: клиент получает ссылку на заказ и сам видит статус ремонта, фото, смету, сроки и согласования. Меньше повторных звонков сотрудникам."
};

export default function ThirdPage() {
  return <ThirdLanding />;
}
