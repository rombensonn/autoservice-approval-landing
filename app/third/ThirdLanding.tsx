"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import {
  ArrowDown,
  Camera,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  HelpCircle,
  Link as LinkIcon,
  MessageCircleQuestion,
  PhoneCall,
  PhoneOff,
  Send,
  ShieldCheck,
  UserRoundCheck,
  Wrench
} from "lucide-react";
import { BrandLogo } from "../components/BrandLogo";

type IconComponent = typeof PhoneCall;

type CardItem = {
  title: string;
  text: string;
  icon: IconComponent;
};

type StepItem = {
  title: string;
  text: string;
  icon: IconComponent;
};

type FormData = {
  name: string;
  phone: string;
  serviceName: string;
  city: string;
  callsPerDay: string;
  commonQuestion: string;
  callHandler: string;
  comment: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const painItems: CardItem[] = [
  {
    title: "Что с моей машиной?",
    text: "Клиент звонит, чтобы узнать статус, хотя заказ просто ждёт следующего этапа.",
    icon: MessageCircleQuestion
  },
  {
    title: "Когда будет готово?",
    text: "Сотруднику приходится вручную проверять заказ и каждый раз объяснять сроки.",
    icon: Clock3
  },
  {
    title: "Почему изменилась цена?",
    text: "Если нет понятной сметы и истории, приходится заново объяснять каждую работу.",
    icon: FileText
  },
  {
    title: "Какие работы уже сделали?",
    text: "Клиент не видит процесс и поэтому постоянно уточняет детали.",
    icon: CheckCircle2
  },
  {
    title: "Мне что-то нужно согласовать?",
    text: "Решение клиента задерживается, потому что информация разбросана по звонкам и чатам.",
    icon: HelpCircle
  },
  {
    title: "Администратор перегружен",
    text: "Вместо обработки новых заявок сотрудник отвечает на повторные вопросы по текущим заказам.",
    icon: PhoneCall
  }
];

const stepItems: StepItem[] = [
  {
    title: "Сотрудник создаёт заказ",
    text: "Вносит автомобиль, клиента и текущий статус.",
    icon: ClipboardList
  },
  {
    title: "Обновляет этап ремонта",
    text: "Диагностика, в работе, ждём согласования, готов к выдаче.",
    icon: Wrench
  },
  {
    title: "Добавляет фото и смету",
    text: "Клиент видит, что именно происходит с автомобилем.",
    icon: Camera
  },
  {
    title: "Отправляет ссылку клиенту",
    text: "Без установки приложения и сложной регистрации.",
    icon: LinkIcon
  },
  {
    title: "Клиент сам смотрит статус",
    text: "Проверяет сроки, цену, фото и ожидающие действия.",
    icon: UserRoundCheck
  },
  {
    title: "Звонков становится меньше",
    text: "Сотрудники меньше отвечают на одинаковые вопросы.",
    icon: PhoneOff
  }
];

const benefitItems: CardItem[] = [
  {
    title: "Меньше повторных звонков",
    text: "Клиент сам проверяет статус ремонта, сроки и ожидающие согласования.",
    icon: PhoneOff
  },
  {
    title: "Администратор свободнее",
    text: "Меньше времени уходит на однотипные объяснения по текущим заказам.",
    icon: UserRoundCheck
  },
  {
    title: "Клиенту спокойнее",
    text: "Он видит, что с автомобилем что-то происходит, а не ждёт звонка в неизвестности.",
    icon: ShieldCheck
  },
  {
    title: "Меньше путаницы",
    text: "Фото, смета, статус и решения клиента находятся в одном месте.",
    icon: ClipboardList
  },
  {
    title: "Быстрее согласования",
    text: "Клиент может согласовать работу прямо на странице заказа, не дожидаясь звонка.",
    icon: CheckCircle2
  }
];

const callsOptions = ["до 10", "10–30", "30–60", "больше 60", "не знаю"];

const questionOptions = [
  "статус ремонта",
  "сроки",
  "стоимость",
  "согласование допработ",
  "запись на услугу",
  "всё вместе"
];

const handlerOptions = [
  "администратор",
  "мастер-приёмщик",
  "владелец",
  "мастера",
  "несколько сотрудников"
];

const initialFormData: FormData = {
  name: "",
  phone: "",
  serviceName: "",
  city: "",
  callsPerDay: "",
  commonQuestion: "",
  callHandler: "",
  comment: ""
};

export function ThirdLanding() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-page text-primary">
      <Header />
      <main>
        <HeroSection />
        <PainSection />
        <SolutionSection />
        <BenefitsSection />
        <LeadSection />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="ds-header">
      <div className="container-page flex min-h-16 items-center justify-between gap-4">
        <a className="brand-logo-link focus-ring rounded-lg" href="#">
          <BrandLogo />
        </a>
        <nav aria-label="Основная навигация" className="flex items-center gap-3">
          <a
            className="ds-nav-link hidden rounded-lg text-sm font-semibold sm:inline"
            href="#pain"
          >
            Где теряется время
          </a>
          <a className="primary-button px-4 py-2 text-sm" href="#lead-form">
            Хочу тест
            <ArrowDown aria-hidden="true" size={18} />
          </a>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="ds-section--dark text-inverse">
      <div className="container-page grid gap-10 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,0.82fr)] lg:items-center lg:py-16">
        <div className="max-w-3xl">
          <p className="ds-kicker">
            Онлайн-страница заказа для клиента
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
            Клиенты постоянно звонят и спрашивают, что с машиной?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-inverse-muted">
            Дайте клиенту ссылку на заказ: он сам увидит статус ремонта, фото, смету, сроки и ожидающие согласования.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-inverse-muted">
            Сервис помогает снизить повторные звонки в автосервис: клиент получает понятную страницу своего заказа и сам проверяет, что происходит с автомобилем.
          </p>
          <div className="mt-8">
            <a className="primary-button primary-button--hero w-full sm:w-auto" href="#lead-form">
              Хочу протестировать
              <ArrowDown aria-hidden="true" size={20} />
            </a>
            <p className="mt-4 max-w-xl text-sm leading-6 text-inverse-muted">
              Ранняя версия для автосервисов, где сотрудники тратят много времени на одинаковые вопросы клиентов.
            </p>
          </div>
        </div>

        <OrderPageMockup />
      </div>
    </section>
  );
}

function OrderPageMockup() {
  return (
    <aside
      aria-label="Макет клиентской страницы заказа"
      className="ds-phone-frame mx-auto w-full max-w-sm p-2"
    >
      <div className="ds-phone-screen">
        <div className="ds-phone-topbar px-5 py-4">
          <div className="ds-phone-grabber mx-auto mb-4 h-1 w-16 rounded-full" />
          <p className="text-sm font-semibold text-muted">Заказ № 1842</p>
          <h2 className="mt-1 text-2xl font-bold tracking-normal">Ваш автомобиль в ремонте</h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="ds-token-chip px-3 py-1.5 text-sm font-bold">
              Kia Rio
            </span>
            <span className="ds-status-pill ds-status-pill--attention px-3 py-1.5 text-sm font-bold">
              Ожидает согласования
            </span>
          </div>
        </div>

        <div className="grid gap-4 px-5 py-5">
          <div className="ds-mock-card p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 aria-hidden="true" className="text-highlight" size={20} />
              <h3 className="text-base font-bold">Что уже сделано</h3>
            </div>
            <p className="ds-status-pill ds-status-pill--active mt-3 rounded-md px-3 py-2 text-sm font-semibold">
              Диагностика завершена
            </p>
          </div>

          <div className="ds-mock-panel ds-mock-panel--attention p-4">
            <div className="flex items-center gap-2">
              <HelpCircle aria-hidden="true" className="text-action" size={20} />
              <h3 className="text-base font-bold text-primary">Нужно решение клиента</h3>
            </div>
            <div className="ds-mock-card mt-3 p-3 shadow-sm">
              <p className="text-sm font-bold text-primary">Замена тормозных дисков</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="ds-mock-tile p-2">
                  <span className="block text-xs font-semibold text-muted">Стоимость</span>
                  <strong className="mt-1 block text-base">12 400 ₽</strong>
                </div>
                <div className="ds-mock-tile p-2">
                  <span className="block text-xs font-semibold text-muted">Срок</span>
                  <strong className="mt-1 block text-base">Завтра после 16:00</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="focus-ring ds-mock-action ds-mock-action--approve" type="button">
              Согласовать
            </button>
            <button className="focus-ring ds-mock-action ds-mock-action--question" type="button">
              Задать вопрос
            </button>
          </div>

          <p className="text-center text-xs font-semibold text-muted">
            Информация обновлена 10 минут назад
          </p>
        </div>
      </div>
    </aside>
  );
}

function PainSection() {
  return (
    <section className="ds-section section-pad" id="pain">
      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="section-title">На что уходит время сотрудников</h2>
          <p className="section-lead">
            Большая часть вопросов клиентов повторяется. Но каждый звонок всё равно отвлекает администратора или мастера.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {painItems.map((item) => (
            <InfoCard item={item} key={item.title} tone="attention" />
          ))}
        </div>

        <p className="ds-callout ds-callout--info mt-8 text-base font-bold leading-7">
          Если клиент сам видит статус, фото, цену и срок, часть звонков просто не возникает.
        </p>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="ds-section ds-section--soft section-pad">
      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="section-title">Одна ссылка вместо повторных звонков</h2>
          <p className="section-lead">
            Клиент открывает страницу заказа и сам видит актуальную информацию по ремонту.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stepItems.map((item, index) => (
            <StepCard item={item} key={item.title} step={index + 1} />
          ))}
        </div>

        <div className="ds-callout ds-callout--info mt-8">
          <p className="text-sm font-semibold text-muted">Короткая цепочка</p>
          <p className="mt-2 text-lg font-bold leading-8 text-primary">
            Заказ → Статус → Фото и смета → Ссылка клиенту → Самостоятельная проверка → Меньше звонков
          </p>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="ds-section section-pad">
      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="section-title">Что получает автосервис</h2>
          <p className="section-lead">
            Сервис не заменяет администратора. Он убирает часть повторных вопросов, на которые клиент может получить ответ сам.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {benefitItems.map((item) => (
            <InfoCard item={item} key={item.title} tone="active" />
          ))}
        </div>

        <p className="ds-callout ds-callout--success mt-8 text-base font-bold leading-7">
          Главная задача — чтобы клиент сам находил ответы на базовые вопросы по своему заказу.
        </p>
      </div>
    </section>
  );
}

function LeadSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function updateField(field: keyof FormData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[field];
        return nextErrors;
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    // TODO: подключить отправку заявки в CRM, таблицу или backend-эндпоинт.
    setIsSubmitted(true);
  }

  return (
    <section className="ds-section--dark section-pad text-inverse" id="lead-form">
      <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(22rem,1fr)] lg:items-start">
        <div>
          <p className="ds-kicker">
            Тест ранней версии
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-normal sm:text-4xl">
            Проверьте, сколько звонков можно убрать в вашем сервисе
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-inverse-muted sm:text-lg">
            Оставьте заявку — покажем раннюю версию клиентской страницы заказа и разберём, какие вопросы клиенты задают вам чаще всего.
          </p>
          <div className="mt-6 grid gap-3 text-sm font-semibold text-inverse-muted">
            <div className="flex items-start gap-3">
              <Check aria-hidden="true" className="mt-0.5 text-highlight" size={18} />
              <span>Посмотрим, где появляются повторные звонки.</span>
            </div>
            <div className="flex items-start gap-3">
              <Check aria-hidden="true" className="mt-0.5 text-highlight" size={18} />
              <span>Покажем, как выглядит клиентская ссылка по заказу.</span>
            </div>
            <div className="flex items-start gap-3">
              <Check aria-hidden="true" className="mt-0.5 text-highlight" size={18} />
              <span>Поймём, подходит ли ваш сценарий для теста.</span>
            </div>
          </div>
        </div>

        <div className="ds-lead-panel p-4 sm:p-6">
          {isSubmitted ? (
            <div className="ds-form-message ds-form-message--success p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 aria-hidden="true" className="mt-1 text-highlight" size={24} />
                <div>
                  <h3 className="text-xl font-bold">Заявка отправлена</h3>
                  <p className="mt-3 text-base leading-7">
                    Заявка отправлена. Мы свяжемся с вами и покажем, как клиентская ссылка может снизить количество повторных звонков в вашем автосервисе.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
              <FormField error={errors.name} id="name" label="Имя">
                <input
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={Boolean(errors.name)}
                  className={inputClass(Boolean(errors.name))}
                  id="name"
                  name="name"
                  onChange={(event) => updateField("name", event.target.value)}
                  type="text"
                  value={formData.name}
                />
              </FormField>

              <FormField error={errors.phone} id="phone" label="Телефон">
                <input
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  aria-invalid={Boolean(errors.phone)}
                  className={inputClass(Boolean(errors.phone))}
                  id="phone"
                  inputMode="tel"
                  name="phone"
                  onChange={(event) => updateField("phone", event.target.value)}
                  type="tel"
                  value={formData.phone}
                />
              </FormField>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField error={errors.serviceName} id="serviceName" label="Название автосервиса">
                  <input
                    aria-describedby={errors.serviceName ? "serviceName-error" : undefined}
                    aria-invalid={Boolean(errors.serviceName)}
                    className={inputClass(Boolean(errors.serviceName))}
                    id="serviceName"
                    name="serviceName"
                    onChange={(event) => updateField("serviceName", event.target.value)}
                    type="text"
                    value={formData.serviceName}
                  />
                </FormField>

                <FormField error={errors.city} id="city" label="Город">
                  <input
                    aria-describedby={errors.city ? "city-error" : undefined}
                    aria-invalid={Boolean(errors.city)}
                    className={inputClass(Boolean(errors.city))}
                    id="city"
                    name="city"
                    onChange={(event) => updateField("city", event.target.value)}
                    type="text"
                    value={formData.city}
                  />
                </FormField>
              </div>

              <FormField
                error={errors.callsPerDay}
                id="callsPerDay"
                label="Сколько звонков в день примерно принимает сервис?"
              >
                <SelectInput
                  error={Boolean(errors.callsPerDay)}
                  id="callsPerDay"
                  onChange={(value) => updateField("callsPerDay", value)}
                  options={callsOptions}
                  value={formData.callsPerDay}
                />
              </FormField>

              <FormField
                error={errors.commonQuestion}
                id="commonQuestion"
                label="О чём клиенты чаще всего спрашивают?"
              >
                <SelectInput
                  error={Boolean(errors.commonQuestion)}
                  id="commonQuestion"
                  onChange={(value) => updateField("commonQuestion", value)}
                  options={questionOptions}
                  value={formData.commonQuestion}
                />
              </FormField>

              <FormField error={errors.callHandler} id="callHandler" label="Кто обычно отвечает на звонки?">
                <SelectInput
                  error={Boolean(errors.callHandler)}
                  id="callHandler"
                  onChange={(value) => updateField("callHandler", value)}
                  options={handlerOptions}
                  value={formData.callHandler}
                />
              </FormField>

              <FormField id="comment" label="Комментарий">
                <textarea
                  className={`${inputClass(false)} min-h-28 resize-y`}
                  id="comment"
                  name="comment"
                  onChange={(event) => updateField("comment", event.target.value)}
                  placeholder="Например: какие вопросы клиенты задают чаще всего?"
                  value={formData.comment}
                />
              </FormField>

              <button className="primary-button w-full" type="submit">
                Оставить заявку на тест
                <Send aria-hidden="true" size={18} />
              </button>

              <p className="text-sm leading-6 text-body">
                Мы не продаём доступ сразу. Сначала проверим, есть ли у вас подходящий сценарий для теста.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoCard({ item, tone }: { item: CardItem; tone: "attention" | "active" }) {
  const Icon = item.icon;
  const toneClass =
    tone === "active"
      ? "ds-icon-chip--success"
      : "ds-icon-chip--warning";

  return (
    <article className="card p-5">
      <div className={`ds-icon-chip ${toneClass}`}>
        <Icon aria-hidden="true" size={21} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-primary">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-body">{item.text}</p>
    </article>
  );
}

function StepCard({ item, step }: { item: StepItem; step: number }) {
  const Icon = item.icon;

  return (
    <article className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="ds-step-icon">
          <Icon aria-hidden="true" size={21} />
        </div>
        <span className="ds-step-number px-2.5 py-1 text-sm font-bold">
          {step}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-primary">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-body">{item.text}</p>
    </article>
  );
}

function FormField({
  children,
  error,
  id,
  label
}: {
  children: ReactNode;
  error?: string;
  id: string;
  label: string;
}) {
  return (
    <div>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="ds-field-error mt-2 text-sm font-semibold" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectInput({
  error,
  id,
  onChange,
  options,
  value
}: {
  error: boolean;
  id: keyof FormData;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <select
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={error}
      className={inputClass(error)}
      id={id}
      name={id}
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      <option value="">Выберите вариант</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Footer() {
  return (
    <footer className="ds-footer">
      <div className="container-page flex flex-col gap-3 py-6 text-sm text-inverse-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a className="brand-logo-link focus-ring rounded-lg" href="#">
            <BrandLogo variant="footer" />
          </a>
          <p>Сервис находится на этапе раннего тестирования.</p>
        </div>
        <div className="flex flex-wrap gap-4 font-semibold">
          <a className="focus-ring ds-footer-link rounded-lg" href="#">
            Политика конфиденциальности
          </a>
          <a className="focus-ring ds-footer-link rounded-lg" href="#lead-form">
            Связаться
          </a>
        </div>
      </div>
    </footer>
  );
}

function inputClass(hasError: boolean) {
  return `form-input ${hasError ? "form-input--error" : ""}`;
}

function validateForm(formData: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = "Укажите имя.";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Укажите телефон.";
  } else if (formData.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Введите телефон минимум из 10 цифр.";
  }

  if (!formData.serviceName.trim()) {
    errors.serviceName = "Укажите название автосервиса.";
  }

  if (!formData.city.trim()) {
    errors.city = "Укажите город.";
  }

  if (!formData.callsPerDay) {
    errors.callsPerDay = "Выберите примерное количество звонков.";
  }

  if (!formData.commonQuestion) {
    errors.commonQuestion = "Выберите частый вопрос клиентов.";
  }

  if (!formData.callHandler) {
    errors.callHandler = "Выберите, кто отвечает на звонки.";
  }

  return errors;
}
