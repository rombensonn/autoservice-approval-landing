import type { Metadata } from "next";
import { SecondLanding } from "./SecondLanding";

export const metadata: Metadata = {
  title: "Контроль автосервиса с телефона — заказы, задержки и ответственные",
  description:
    "Сервис для владельцев автосервисов: смотрите активные заказы, зависшие машины, причины задержек и ответственных сотрудников в одном онлайн-экране."
};

export default function SecondPage() {
  return <SecondLanding />;
}
