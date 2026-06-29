import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "../components/BrandLogo";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных | Десмос Авто",
  description: "Политика обработки персональных данных для формы заявки Десмос Авто."
};

const dataItems = [
  "имя",
  "номер телефона",
  "название автосервиса",
  "город",
  "сведения о количестве обслуживаемых машин",
  "сведения о простоях на согласовании допработ",
  "комментарий, если пользователь его оставил"
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-page text-ink">
      <header className="border-b border-line bg-page">
        <div className="container-page flex min-h-16 items-center justify-between gap-4">
          <Link className="brand-logo-link focus-ring rounded-lg" href="/">
            <BrandLogo />
          </Link>
          <Link className="secondary-button min-h-11 px-4 py-2 text-sm" href="/">
            На главную
          </Link>
        </div>
      </header>

      <article className="container-page section-pad max-w-4xl">
        <p className="text-sm font-bold uppercase text-action">Правовая информация</p>
        <h1 className="section-title mt-3">Политика обработки персональных данных</h1>
        <p className="section-lead">
          Настоящая политика описывает, как обрабатываются персональные данные, переданные через форму заявки на сайте Десмос Авто.
        </p>

        <div className="ds-callout ds-callout--info mt-8 text-sm leading-6">
          Перед публикацией оператор должен указать свое полное наименование, адрес и контакт для обращений субъектов персональных данных.
        </div>

        <div className="mt-10 grid gap-8 text-base leading-7 text-body">
          <section>
            <h2 className="text-2xl font-bold text-ink">1. Оператор и область действия</h2>
            <p className="mt-3">
              Оператором персональных данных является владелец сайта и сервиса Десмос Авто. Политика применяется к данным, которые пользователь передает через форму заявки.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">2. Какие данные обрабатываются</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {dataItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">3. Цели обработки</h2>
            <p className="mt-3">
              Данные используются для обработки заявки, связи с пользователем, демонстрации ранней версии сервиса и оценки применимости сценария согласования допработ.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">4. Правовое основание и действия с данными</h2>
            <p className="mt-3">
              Обработка выполняется на основании согласия субъекта персональных данных. Оператор может выполнять сбор, запись, систематизацию, накопление, хранение, уточнение, использование, передачу поставщикам технической инфраструктуры, блокирование, удаление и уничтожение данных.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">5. Срок обработки и отзыв согласия</h2>
            <p className="mt-3">
              Данные обрабатываются до достижения целей обработки, до отзыва согласия или до прекращения обязанности хранить данные по закону. Пользователь может отозвать согласие, направив оператору обращение.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">6. Права субъекта персональных данных</h2>
            <p className="mt-3">
              Пользователь вправе получать сведения об обработке своих данных, требовать уточнения, блокирования или уничтожения данных, а также обжаловать действия оператора в уполномоченный орган или суд.
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm leading-6 text-muted">Дата публикации: 29 июня 2026 года.</p>
      </article>
    </main>
  );
}
