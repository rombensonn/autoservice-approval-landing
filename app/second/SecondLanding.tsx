"use client";

import type { FormEvent, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  Banknote,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Eye,
  Gauge,
  ListChecks,
  PhoneCall,
  Send,
  ShieldCheck,
  TimerReset,
  UserRoundCheck
} from "lucide-react";
import { BrandLogo } from "../components/BrandLogo";
import { FilledDocumentIcon } from "../components/FilledDocumentIcon";

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
  presence: string;
  employees: string;
  controlIssue: string;
  comment: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const painItems: CardItem[] = [
  {
    title: "Приходится постоянно звонить",
    text: "Чтобы понять, что происходит, владелец каждый день спрашивает администратора, мастера или управляющего.",
    icon: PhoneCall
  },
  {
    title: "Статусы только на словах",
    text: "Один сотрудник говорит “в работе”, другой — “ждём клиента”, а точной картины нет.",
    icon: ClipboardList
  },
  {
    title: "Проблемы всплывают поздно",
    text: "О задержке часто становится понятно, когда клиент уже недоволен или срок сорван.",
    icon: TimerReset
  },
  {
    title: "Неясно, кто ответственный",
    text: "Когда заказ завис, приходится отдельно выяснять, кто должен был сдвинуть его дальше.",
    icon: UserRoundCheck
  },
  {
    title: "Непонятно, где застряли деньги",
    text: "Машина стоит, заказ не закрыт, деньги не получены, но в отчёте это видно не сразу.",
    icon: CircleDollarSign
  },
  {
    title: "Контроль зависит от личного присутствия",
    text: "Если владелец не приехал, прозрачность процесса резко падает.",
    icon: Eye
  }
];

const stepItems: StepItem[] = [
  {
    title: "Заказ попадает в систему",
    text: "Администратор или мастер фиксирует машину и текущий этап.",
    icon: ClipboardList
  },
  {
    title: "Сотрудник обновляет статус",
    text: "В работе, ждём клиента, ждём запчасть, контроль качества или готово к выдаче.",
    icon: ListChecks
  },
  {
    title: "Причина задержки фиксируется",
    text: "Не просто “стоит”, а понятно почему: клиент, запчасть, мастер, пост или оплата.",
    icon: AlertTriangle
  },
  {
    title: "Ответственный виден сразу",
    text: "По каждому заказу понятно, кто должен сдвинуть его дальше.",
    icon: UserRoundCheck
  },
  {
    title: "Владелец видит сводку",
    text: "Сколько заказов активно, сколько зависло, сколько просрочено и на какую сумму.",
    icon: Gauge
  },
  {
    title: "Проблемы решаются раньше",
    text: "Собственник реагирует до того, как задержка превратилась в конфликт.",
    icon: CheckCircle2
  }
];

const benefitItems: CardItem[] = [
  {
    title: "Меньше ручного контроля",
    text: "Не нужно постоянно звонить сотрудникам, чтобы узнать базовую картину по заказам.",
    icon: PhoneCall
  },
  {
    title: "Видны зависшие машины",
    text: "Сразу понятно, какие автомобили стоят без движения и почему.",
    icon: AlertTriangle
  },
  {
    title: "Понятна ответственность",
    text: "По каждому проблемному заказу видно, кто отвечает за следующий шаг.",
    icon: UserRoundCheck
  },
  {
    title: "Деньги не теряются в процессе",
    text: "Владелец видит заказы, которые зависли и ещё не дошли до оплаты или выдачи.",
    icon: Banknote
  },
  {
    title: "Быстрее управленческие решения",
    text: "Можно реагировать на проблемы в тот же день, а не после жалобы клиента.",
    icon: ShieldCheck
  }
];

const presenceOptions = [
  "да, почти всегда",
  "несколько раз в неделю",
  "редко",
  "управляю удалённо"
];

const employeeOptions = ["1–3", "4–7", "8–15", "больше 15"];

const controlIssueOptions = [
  "статусы заказов",
  "сроки",
  "сотрудников",
  "простои",
  "выручку",
  "всё вместе"
];

const initialFormData: FormData = {
  name: "",
  phone: "",
  serviceName: "",
  city: "",
  presence: "",
  employees: "",
  controlIssue: "",
  comment: ""
};

export function SecondLanding() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DashboardShowcaseSection />
        <PainSection />
        <SolutionSection />
        <BenefitsSection />
        <LeadSection />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="ds-header">
      <div className="container-page flex min-h-16 items-center justify-between gap-4">
        <a className="brand-logo-link focus-ring rounded-lg" href="#">
          <BrandLogo />
        </a>
        <nav aria-label="Основная навигация" className="ds-main-nav">
          <div className="ds-nav-segment" aria-label="Разделы страницы">
            <a className="ds-nav-link focus-ring text-sm font-medium" href="#interface">
              Интерфейс
            </a>
            <a className="ds-nav-link focus-ring text-sm font-medium" href="#workflow">
              Как работает
            </a>
            <a className="ds-nav-link focus-ring text-sm font-medium" href="#benefits">
              Выгоды
            </a>
          </div>
          <a className="primary-button ds-nav-cta text-sm" href="#lead-form">
            Хочу тест
            <FilledDocumentIcon aria-hidden="true" size={18} />
          </a>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="ds-hero-section">
      <div className="container-page">
        <div className="ds-hero-frame ds-hero-frame--solo ds-hero-frame--owner-control">
          <div className="ds-hero-copy">
            <p className="ds-kicker">
              Контроль автосервиса с телефона
            </p>
            <h1 className="ds-hero-title mt-5">
              Вы не в сервисе — но должны видеть, что там происходит
            </h1>
            <p className="ds-hero-subtitle mt-6">
              Онлайн-экран для владельца автосервиса: какие машины в работе, где задержки, кто ответственный и почему заказ стоит.
            </p>
            <div className="mt-8 flex justify-center">
              <a className="primary-button primary-button--hero mx-auto w-full sm:w-auto" href="#lead-form">
                Хочу протестировать
                <ArrowDown aria-hidden="true" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardShowcaseSection() {
  return (
    <section id="interface" className="ds-interface-section section-pad scroll-mt-20" aria-label="Макет дашборда владельца автосервиса">
      <div className="container-page">
        <div className="ds-interface-shell">
          <OwnerDashboardMockup />
        </div>
      </div>
    </section>
  );
}

function OwnerDashboardMockup() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="ds-owner-dashboard"
      aria-label="Макет дашборда владельца автосервиса"
      initial={false}
    >
      <motion.div className="ds-owner-dashboard__header">
        <div>
          <p className="text-sm font-semibold text-muted">Экран владельца</p>
          <h2 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">Сводка на сегодня</h2>
        </div>
        <motion.span
          className="ds-owner-alert"
          animate={shouldReduceMotion ? undefined : { boxShadow: ["0 0 0 0 rgba(217,119,6,0)", "0 0 0 8px rgba(217,119,6,0.10)", "0 0 0 0 rgba(217,119,6,0)"] }}
          transition={shouldReduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          2 заказа требуют внимания
        </motion.span>
      </motion.div>

      <motion.div className="ds-owner-metrics mt-5">
        <DashboardMetric label="Активные заказы" value="18" tone="neutral" />
        <DashboardMetric label="Ожидают клиента" value="4" tone="warning" />
        <DashboardMetric label="Ожидают запчасти" value="3" tone="warning" />
        <DashboardMetric label="Просрочены" value="2" tone="danger" />
      </motion.div>

      <motion.div className="ds-owner-money mt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-body">Сумма в зависших заказах</p>
          <p className="text-2xl font-bold text-ink">186 000 ₽</p>
        </div>
        <div className="ds-owner-progress mt-4" aria-label="Доля зависших заказов">
          <motion.div
            className="ds-owner-progress__bar"
            animate={shouldReduceMotion ? undefined : { scaleX: [0.96, 1] }}
            transition={shouldReduceMotion ? undefined : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>

      <motion.div className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-ink">Заказы в ожидании</h3>
          <span className="text-sm font-semibold text-muted">обновлено 12:40</span>
        </div>
        <div className="mt-3 grid gap-3">
          <OrderRow
            car="BMW X5"
            status="ожидает согласования"
            responsible="Андрей"
            tone="attention"
          />
          <OrderRow
            car="Kia Rio"
            status="ждём запчасть"
            responsible="Сергей"
            tone="attention"
          />
          <OrderRow
            car="Audi A6"
            status="контроль качества"
            responsible="Максим"
            tone="active"
          />
        </div>
      </motion.div>
    </motion.article>
  );
}

function DashboardMetric({
  label,
  value,
  tone
}: {
  label: string;
  value: string;
  tone: "neutral" | "warning" | "danger";
}) {
  const toneClass = {
    neutral: "ds-owner-metric--neutral",
    warning: "ds-owner-metric--warning",
    danger: "ds-owner-metric--danger"
  }[tone];

  return (
    <motion.div
      className={`ds-owner-metric ${toneClass}`}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
    >
      <p className="text-3xl font-bold leading-none">{value}</p>
      <p className="mt-2 text-xs font-semibold leading-5 text-body">{label}</p>
    </motion.div>
  );
}

function OrderRow({
  car,
  status,
  responsible,
  tone
}: {
  car: string;
  status: string;
  responsible: string;
  tone: "attention" | "active";
}) {
  const toneClass =
    tone === "attention"
      ? "ds-owner-status--warning"
      : "ds-owner-status--success";

  return (
    <motion.div
      className="ds-owner-order-row"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.18 }}
    >
      <div className="ds-owner-order-grid">
        <p className="font-bold text-ink">{car}</p>
        <span className={`ds-owner-status ${toneClass}`}>
          {status}
        </span>
        <p className="text-sm leading-5 text-body">
          Ответственный: <span className="font-bold text-graphite">{responsible}</span>
        </p>
      </div>
    </motion.div>
  );
}

function PainSection() {
  return (
    <section id="pain" className="ds-section ds-section--soft section-pad">
      <div className="container-page">
        <SectionHeader
          title="Что происходит, когда владелец не видит процесс"
          lead="Проблема не в том, что сотрудники ничего не делают. Проблема в том, что собственник узнаёт о задержках слишком поздно."
        />
        <div className="ds-bento-grid ds-bento-grid--pain mt-8">
          {painItems.map((item) => (
            <FeatureCard key={item.title} item={item} tone="warning" />
          ))}
        </div>
        <p className="ds-callout ds-callout--warning mt-8 text-base font-semibold leading-7">
          Собственнику нужен не ещё один чат. Ему нужна понятная картина по сервису в реальном времени.
        </p>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section id="workflow" className="ds-section section-pad scroll-mt-20">
      <div className="container-page">
        <SectionHeader
          title="Один экран вместо десятка звонков"
          lead="Владелец открывает телефон и видит, какие заказы идут нормально, а какие требуют внимания."
        />
        <div className="ds-step-grid mt-8">
          {stepItems.map((item, index) => (
            <StepCard key={item.title} item={item} index={index + 1} />
          ))}
        </div>
        <div className="ds-callout ds-callout--info mt-8">
          <p className="text-sm font-semibold uppercase text-action">Короткая цепочка контроля</p>
          <p className="mt-3 text-lg font-bold leading-8 text-graphite">
            Заказ → Статус → Причина задержки → Ответственный → Сводка владельца → Решение
          </p>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section id="benefits" className="ds-section ds-section--soft section-pad scroll-mt-20">
      <div className="container-page">
        <SectionHeader
          title="Что получает владелец автосервиса"
          lead="Не нужно сидеть в сервисе весь день, чтобы понимать, где порядок, а где уже нужна реакция."
        />
        <div className="ds-bento-grid ds-bento-grid--benefits mt-8">
          {benefitItems.map((item) => (
            <FeatureCard key={item.title} item={item} tone="success" />
          ))}
        </div>
        <p className="ds-callout ds-callout--success mt-8 text-base font-semibold leading-7">
          Главная задача — чтобы владелец видел реальное состояние сервиса без постоянного присутствия на месте.
        </p>
      </div>
    </section>
  );
}

function LeadSection() {
  return (
    <section id="lead-form" className="ds-section section-pad scroll-mt-20">
      <div className="container-page ds-lead-grid">
        <div className="ds-lead-copy">
          <p className="ds-form-kicker">
            Заявка на ранний тест
          </p>
          <SectionHeader
            title="Проверьте, нужен ли вашему сервису такой контроль"
            lead="Оставьте заявку — покажем раннюю версию экрана владельца и разберём, какие показатели вам важно видеть каждый день."
          />
          <div className="ds-callout ds-callout--info mt-6 text-sm leading-6">
            Мы не продаём доступ сразу. Сначала проверим, есть ли у вас подходящий сценарий для теста.
          </div>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="ds-footer py-8 text-inverse">
      <div className="container-page flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a className="brand-logo-link focus-ring rounded-lg" href="#">
            <BrandLogo variant="footer" />
          </a>
          <p className="text-inverse-muted">Сервис находится на этапе раннего тестирования.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a className="focus-ring rounded-lg text-inverse-muted transition hover:text-inverse" href="#">
            Политика конфиденциальности
          </a>
          <a className="focus-ring rounded-lg text-inverse-muted transition hover:text-inverse" href="#lead-form">
            Связаться
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ title, lead }: { title: string; lead: string }) {
  return (
    <div className="ds-section-header">
      <h2 className="section-title">{title}</h2>
      <p className="section-lead">{lead}</p>
    </div>
  );
}

function FeatureCard({ item, tone }: { item: CardItem; tone: "warning" | "success" }) {
  const Icon = item.icon;
  const toneClass =
    tone === "warning"
      ? "ds-feature-card--warning"
      : "ds-feature-card--success";
  const iconClass =
    tone === "warning"
      ? "ds-icon-chip--warning"
      : "ds-icon-chip--success";

  return (
    <article className={`ds-feature-card ${toneClass}`}>
      <div className={`ds-icon-chip ${iconClass}`}>
        <Icon aria-hidden="true" size={22} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-body">{item.text}</p>
    </article>
  );
}

function StepCard({ item, index }: { item: StepItem; index: number }) {
  const Icon = item.icon;

  return (
    <article className="ds-step-card">
      <div className="flex items-start gap-4">
        <div className="ds-step-icon">
          <Icon aria-hidden="true" size={21} />
        </div>
        <div>
          <p className="text-sm font-bold text-action">Шаг {index}</p>
          <h3 className="mt-1 text-lg font-bold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-body">{item.text}</p>
        </div>
      </div>
    </article>
  );
}

function LeadForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const hasErrors = Object.keys(errors).length > 0;

  function updateField(field: keyof FormData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSent(false);
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      // TODO: подключить отправку заявки в backend/API вместо локального состояния.
      setIsSubmitting(false);
      setIsSent(true);
      setFormData(initialFormData);
    }, 450);
  }

  return (
    <form className="ds-form-card" noValidate onSubmit={handleSubmit}>
      {isSent ? (
        <div className="ds-form-message ds-form-message--success mb-5" aria-live="polite">
          <p className="text-sm leading-6">
            <span className="font-bold">Заявка отправлена.</span>{" "}
            Мы свяжемся с вами и покажем, как может выглядеть экран контроля для владельца вашего автосервиса.
          </p>
        </div>
      ) : null}

      {hasErrors ? (
        <div className="ds-form-message ds-form-message--error mb-5 text-sm font-semibold" role="alert">
          Проверьте обязательные поля и телефон.
        </div>
      ) : null}

      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Имя" error={errors.name} htmlFor="second-name">
            <input
              id="second-name"
              className="form-input"
              value={formData.name}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "second-name-error" : undefined}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </Field>

          <Field label="Телефон" error={errors.phone} htmlFor="second-phone">
            <input
              id="second-phone"
              className="form-input"
              type="tel"
              inputMode="tel"
              value={formData.phone}
              autoComplete="tel"
              placeholder="+7"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "second-phone-error" : undefined}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Название автосервиса" error={errors.serviceName} htmlFor="second-service-name">
            <input
              id="second-service-name"
              className="form-input"
              value={formData.serviceName}
              autoComplete="organization"
              aria-invalid={Boolean(errors.serviceName)}
              aria-describedby={errors.serviceName ? "second-service-name-error" : undefined}
              onChange={(event) => updateField("serviceName", event.target.value)}
            />
          </Field>

          <Field label="Город" error={errors.city} htmlFor="second-city">
            <input
              id="second-city"
              className="form-input"
              value={formData.city}
              autoComplete="address-level2"
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? "second-city-error" : undefined}
              onChange={(event) => updateField("city", event.target.value)}
            />
          </Field>
        </div>

        <RadioGroup
          legend="Вы каждый день находитесь в сервисе?"
          name="presence"
          options={presenceOptions}
          value={formData.presence}
          error={errors.presence}
          onChange={(value) => updateField("presence", value)}
        />

        <RadioGroup
          legend="Сколько сотрудников в сервисе?"
          name="employees"
          options={employeeOptions}
          value={formData.employees}
          error={errors.employees}
          onChange={(value) => updateField("employees", value)}
        />

        <RadioGroup
          legend="Что сложнее всего контролировать?"
          name="controlIssue"
          options={controlIssueOptions}
          value={formData.controlIssue}
          error={errors.controlIssue}
          onChange={(value) => updateField("controlIssue", value)}
        />

        <Field label="Комментарий" htmlFor="second-comment">
          <textarea
            id="second-comment"
            className="form-input min-h-28 resize-y"
            value={formData.comment}
            placeholder="Например: что чаще всего приходится спрашивать у сотрудников?"
            onChange={(event) => updateField("comment", event.target.value)}
          />
        </Field>

        <button className="primary-button w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Отправляем заявку..." : "Оставить заявку на тест"}
          <Send aria-hidden="true" size={19} />
        </button>

        <p className="text-sm leading-6 text-muted">
          Мы не продаём доступ сразу. Сначала проверим, есть ли у вас подходящий сценарий для теста.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  const errorId = `${htmlFor}-error`;

  return (
    <div>
      <label className="form-label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="ds-field-error mt-2 text-sm font-semibold" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function RadioGroup({
  legend,
  name,
  options,
  value,
  error,
  onChange
}: {
  legend: string;
  name: keyof FormData;
  options: string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="form-label">{legend}</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className={`radio-card ${value === option ? "radio-card--selected" : ""}`}
          >
            <input
              className="h-4 w-4 shrink-0 accent-highlight"
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(event) => onChange(event.target.value)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error ? (
        <p className="ds-field-error mt-2 text-sm font-semibold" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  const phoneDigits = data.phone.replace(/\D/g, "");

  if (!data.name.trim()) {
    errors.name = "Укажите имя.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Укажите телефон.";
  } else if (phoneDigits.length < 10) {
    errors.phone = "Введите телефон с кодом города или оператора.";
  }

  if (!data.serviceName.trim()) {
    errors.serviceName = "Укажите название автосервиса.";
  }

  if (!data.city.trim()) {
    errors.city = "Укажите город.";
  }

  if (!data.presence) {
    errors.presence = "Выберите, как часто вы бываете в сервисе.";
  }

  if (!data.employees) {
    errors.employees = "Выберите количество сотрудников.";
  }

  if (!data.controlIssue) {
    errors.controlIssue = "Выберите, что сложнее всего контролировать.";
  }

  return errors;
}
