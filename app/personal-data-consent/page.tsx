import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "../components/BrandLogo";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных | Десмос Авто",
  description: "Текст согласия на обработку персональных данных для формы заявки Десмос Авто."
};

export default function PersonalDataConsentPage() {
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
        <h1 className="section-title mt-3">Согласие на обработку персональных данных</h1>
        <p className="section-lead">
          Текст согласия применяется к данным, которые пользователь добровольно указывает в форме заявки на сайте Десмос Авто.
        </p>

        <div className="ds-callout ds-callout--info mt-8 text-sm leading-6">
          Перед публикацией оператор должен дополнить согласие своим полным наименованием, адресом и контактами для отзыва согласия.
        </div>

        <div className="mt-10 grid gap-8 text-base leading-7 text-body">
          <section>
            <h2 className="text-2xl font-bold text-ink">1. Состав персональных данных</h2>
            <p className="mt-3">
              Пользователь дает согласие на обработку имени, номера телефона, названия автосервиса, города, сведений о работе автосервиса и комментария, если он указан в форме.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">2. Цели обработки</h2>
            <p className="mt-3">
              Персональные данные обрабатываются для приема заявки, обратной связи, демонстрации сервиса и подготовки предложения по тестированию сценария согласования дополнительных работ.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">3. Разрешенные действия</h2>
            <p className="mt-3">
              Согласие распространяется на сбор, запись, систематизацию, накопление, хранение, уточнение, использование, передачу поставщикам технической инфраструктуры, блокирование, удаление и уничтожение персональных данных.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">4. Срок действия и отзыв</h2>
            <p className="mt-3">
              Согласие действует до достижения целей обработки или до его отзыва. Пользователь может отозвать согласие, направив оператору обращение. После отзыва оператор прекращает обработку и уничтожает данные, если иное хранение не требуется по закону.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">5. Подтверждение согласия</h2>
            <p className="mt-3">
              Отметка чекбокса в форме означает, что пользователь действует свободно, своей волей и в своем интересе, а согласие является конкретным, предметным, информированным, сознательным и однозначным.
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm leading-6 text-muted">Дата публикации: 29 июня 2026 года.</p>
      </article>
    </main>
  );
}
