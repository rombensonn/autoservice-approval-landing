"use client";
import {
  ArrowDown,
  Banknote,
  Camera,
  Check,
  CheckCircle2,
  Clock3,
  Eye,
  FileCheck2,
  Gauge,
  History,
  Images,
  Link as LinkIcon,
  MessageCircle,
  MousePointerClick,
  PhoneForwarded,
  PhoneOff,
  Repeat2,
  Send,
  ShieldAlert,
  Warehouse,
  Wrench,
  X
} from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { BrandLogo } from "./components/BrandLogo";
import { FilledDocumentIcon } from "./components/FilledDocumentIcon";

type IconComponent = typeof PhoneOff;

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

type ApprovalOrder = {
  id: string;
  status: string;
  statusTone: "waiting" | "question" | "hold";
  defaultDecision: ApprovalDecision;
  title: string;
  sidebarText: string;
  price: string;
  time: string;
  photoSrc: string;
  photoAlt: string;
  approvalHistory: Array<{
    time: string;
    title: string;
    text: string;
    tone: "service" | "client" | "pending";
  }>;
};

type ApprovalDecision = "approve" | "question" | "decline";

type FormData = {
  name: string;
  phone: string;
  serviceName: string;
  city: string;
  carsPerDay: string;
  approvalDelay: string;
  comment: string;
  personalDataConsent: boolean;
  privacyPolicyConsent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type RadioField = "carsPerDay" | "approvalDelay";

const painItems: CardItem[] = [
  {
    title: "Клиент не берёт трубку",
    text: "Мастер уже нашёл проблему, но решение клиента приходится ждать часами.",
    icon: PhoneOff
  },
  {
    title: "Машина занимает пост",
    text: "Автомобиль стоит в боксе, хотя работа могла бы уже продолжаться.",
    icon: Warehouse
  },
  {
    title: "Мастер ждёт решения",
    text: "Сотрудник переключается на другие задачи, сроки начинают съезжать.",
    icon: Clock3
  },
  {
    title: "Администратор звонит повторно",
    text: "Вместо нормальной работы приходится снова и снова объяснять одно и то же.",
    icon: Repeat2
  },
  {
    title: "Фото теряются в мессенджерах",
    text: "Снимки, комментарии и договорённости остаются в разных чатах.",
    icon: Images
  },
  {
    title: "Возникают споры",
    text: "После ремонта клиент может сказать: “Я это не согласовывал”.",
    icon: ShieldAlert
  }
];

const stepItems: StepItem[] = [
  {
    title: "Мастер находит допработу",
    text: "Например, после диагностики или разборки.",
    icon: Wrench
  },
  {
    title: "Добавляет фото или видео",
    text: "Клиент видит, что именно обнаружено.",
    icon: Camera
  },
  {
    title: "Указывает цену и срок",
    text: "Сколько стоит работа и как изменится дата выдачи.",
    icon: Banknote
  },
  {
    title: "Отправляет ссылку клиенту",
    text: "Без установки приложения и сложной регистрации.",
    icon: LinkIcon
  },
  {
    title: "Клиент выбирает действие",
    text: "Согласовать, уточнить или отказаться.",
    icon: MousePointerClick
  },
  {
    title: "Решение сохраняется",
    text: "В истории остаются фото, цена, дата и выбранное действие.",
    icon: History
  }
];

const benefitItems: CardItem[] = [
  {
    title: "Меньше простоев",
    text: "Машина быстрее выходит из ожидания и освобождает пост.",
    icon: Gauge
  },
  {
    title: "Меньше звонков",
    text: "Клиент сам видит фото, цену и срок, а не слушает объяснения по телефону.",
    icon: PhoneForwarded
  },
  {
    title: "Больше согласованных допработ",
    text: "Клиенту проще принять решение, когда проблема показана наглядно.",
    icon: CheckCircle2
  },
  {
    title: "Меньше споров",
    text: "Решение фиксируется: фото, цена, срок, дата и действие клиента.",
    icon: FileCheck2
  },
  {
    title: "Контроль владельца",
    text: "Видно, какие заказы зависли на согласовании и на какую сумму.",
    icon: Eye
  }
];

const carsOptions = ["до 5", "5–10", "10–20", "больше 20"];
const delayOptions = ["да, регулярно", "иногда", "редко", "не знаю"];

const approvalPhotoSrc = "./images/approval-photo-volkswagen-polo-bracket.png";
const approvalPhotoAlt = "Фото повреждённого кронштейна Volkswagen Polo 2023 в автосервисе";

const approvalOrders: ApprovalOrder[] = [
  {
    id: "1842",
    status: "ждёт",
    statusTone: "waiting",
    defaultDecision: "approve",
    title: "Замена повреждённого кронштейна",
    sidebarText: "Замена повреждённого кронштейна",
    price: "8 500 ₽",
    time: "+1 день",
    photoSrc: approvalPhotoSrc,
    photoAlt: approvalPhotoAlt,
    approvalHistory: [
      {
        time: "12:08",
        title: "Мастер добавил фото",
        text: "Кронштейн сфотографирован после разборки.",
        tone: "service"
      },
      {
        time: "12:10",
        title: "Цена и срок указаны",
        text: "8 500 ₽, срок +1 день.",
        tone: "service"
      },
      {
        time: "12:14",
        title: "Ссылка отправлена",
        text: "Согласование ушло клиенту.",
        tone: "service"
      },
      {
        time: "12:15",
        title: "Заказ в ожидании",
        text: "Пост отмечен как занятый.",
        tone: "pending"
      },
      {
        time: "12:17",
        title: "Клиент открыл",
        text: "Фото и стоимость просмотрены.",
        tone: "client"
      },
      {
        time: "12:19",
        title: "Клиент согласовал",
        text: "Выбрано действие «Согласовать».",
        tone: "client"
      },
      {
        time: "12:19",
        title: "Администратор увидел",
        text: "Решение появилось в заказе.",
        tone: "service"
      },
      {
        time: "12:20",
        title: "Работа продолжена",
        text: "Решение сохранено в истории заказа.",
        tone: "service"
      }
    ]
  },
  {
    id: "1839",
    status: "не берёт",
    statusTone: "hold",
    defaultDecision: "question",
    title: "Диагностика крепления бампера",
    sidebarText: "Клиент не берёт трубку",
    price: "6 200 ₽",
    time: "+3 часа",
    photoSrc: "./images/approval-photo-volkswagen-polo-bumper-diagnostics.png",
    photoAlt: "Фото диагностики крепления бампера Volkswagen Polo 2023 в автосервисе",
    approvalHistory: [
      {
        time: "13:58",
        title: "Мастер добавил фото",
        text: "Снята зона крепления бампера.",
        tone: "service"
      },
      {
        time: "14:01",
        title: "Цена и срок указаны",
        text: "6 200 ₽, срок +3 часа.",
        tone: "service"
      },
      {
        time: "14:05",
        title: "Ссылка отправлена",
        text: "Согласование отправлено клиенту.",
        tone: "service"
      },
      {
        time: "14:08",
        title: "Заказ завис",
        text: "Сумма ожидания видна владельцу.",
        tone: "pending"
      },
      {
        time: "14:12",
        title: "Клиент открыл",
        text: "Фото диагностики просмотрено.",
        tone: "client"
      },
      {
        time: "14:24",
        title: "Решение не выбрано",
        text: "Нет действия от клиента.",
        tone: "pending"
      },
      {
        time: "14:31",
        title: "Повторный контакт",
        text: "Администратор видит, кому звонить.",
        tone: "service"
      },
      {
        time: "14:38",
        title: "Напоминание нужно",
        text: "Заказ остаётся в ожидании.",
        tone: "pending"
      }
    ]
  },
  {
    id: "1834",
    status: "уточнить",
    statusTone: "question",
    defaultDecision: "question",
    title: "Уточнение цены по крепежу",
    sidebarText: "Уточнить цену и срок",
    price: "4 900 ₽",
    time: "+2 часа",
    photoSrc: "./images/approval-photo-volkswagen-polo-fasteners.png",
    photoAlt: "Фото крепежа и клипс бампера Volkswagen Polo 2023 для уточнения цены",
    approvalHistory: [
      {
        time: "16:24",
        title: "Мастер добавил фото",
        text: "Клипсы и крепёж показаны отдельно.",
        tone: "service"
      },
      {
        time: "16:28",
        title: "Цена и срок указаны",
        text: "4 900 ₽, срок +2 часа.",
        tone: "service"
      },
      {
        time: "16:31",
        title: "Ссылка отправлена",
        text: "Согласование отправлено клиенту.",
        tone: "service"
      },
      {
        time: "16:34",
        title: "Клиент открыл",
        text: "Фото крепежа просмотрено.",
        tone: "client"
      },
      {
        time: "16:36",
        title: "Клиент уточняет",
        text: "Вопрос по составу клипс.",
        tone: "client"
      },
      {
        time: "16:41",
        title: "Ответ администратора",
        text: "Состав работ уточнён.",
        tone: "service"
      },
      {
        time: "16:42",
        title: "Ответ доставлен",
        text: "Клиент видит уточнение по цене.",
        tone: "client"
      },
      {
        time: "16:44",
        title: "Ожидает решения",
        text: "Клиент ещё не выбрал действие.",
        tone: "pending"
      }
    ]
  }
];

const initialFormData: FormData = {
  name: "",
  phone: "",
  serviceName: "",
  city: "",
  carsPerDay: "",
  approvalDelay: "",
  comment: "",
  personalDataConsent: false,
  privacyPolicyConsent: false
};

export function HomeLanding() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ApprovalShowcaseSection />
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
            Получить демо
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
        <div className="ds-hero-frame ds-hero-frame--solo">
          <div className="ds-hero-copy">
            <p className="ds-kicker">
              Согласование допработ без долгих звонков
            </p>
            <h1 className="ds-hero-title mt-5">
              Машина стоит в боксе, потому что клиент не отвечает?
            </h1>
            <p className="ds-hero-subtitle mt-6">
              Согласовывайте дополнительные работы по ссылке: клиент видит фото, цену и срок, а мастер быстрее продолжает ремонт.
            </p>
            <div className="mt-8 flex justify-center">
              <a className="primary-button primary-button--hero mx-auto w-full sm:w-auto" href="#lead-form">
                Записаться на демо
                <ArrowDown aria-hidden="true" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApprovalShowcaseSection() {
  return (
    <section id="interface" className="ds-interface-section section-pad scroll-mt-20" aria-label="Интерфейс согласования допработ">
      <div className="container-page">
        <div className="ds-interface-shell">
          <DesktopApprovalMockup />
          <div className="ds-approval-mobile">
            <ApprovalMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopApprovalMockup() {
  return (
    <article className="ds-approval-desktop" aria-label="Макет карточки согласования допработ">
      <div className="ds-desktop-topbar">
        <div className="ds-safari-traffic" aria-hidden="true">
          <span className="ds-safari-dot ds-safari-dot--close" />
          <span className="ds-safari-dot ds-safari-dot--minimize" />
          <span className="ds-safari-dot ds-safari-dot--zoom" />
        </div>
        <div className="ds-safari-nav" aria-hidden="true">
          <span>‹</span>
          <span>›</span>
        </div>
        <div className="ds-safari-address" aria-label="Открытый заказ">
          {approvalOrders.map((order) => (
            <span className={`ds-order-dependent ds-order-dependent--${order.id}`} key={`address-${order.id}`}>
              <span className="ds-safari-lock" aria-hidden="true" />
              <span className="ds-safari-address__value">autoservice.local/orders/{order.id}</span>
            </span>
          ))}
        </div>
        <div className="ds-safari-order">
          {approvalOrders.map((order) => (
            <span className={`ds-order-dependent ds-order-dependent--${order.id}`} key={`topbar-order-${order.id}`}>
              Заказ №{order.id}
            </span>
          ))}
        </div>
      </div>

      <div className="ds-desktop-layout">
        <aside className="ds-desktop-sidebar">
          <p className="text-sm font-semibold uppercase text-muted">Заказы на согласовании</p>
          <div className="mt-4 grid gap-3">
            {approvalOrders.map((order, index) => (
              <label
                key={order.id}
                className="ds-order-button"
                aria-label={`Показать заказ №${order.id}: ${order.sidebarText}, ${order.price}, ${order.time}`}
              >
                <input
                  className={`ds-order-radio ds-order-radio--${order.id}`}
                  type="radio"
                  name="desktop-approval-order"
                  defaultChecked={index === 0}
                />
                <span className="flex items-center justify-between gap-3">
                  <span className="whitespace-nowrap font-bold text-ink">Заказ №{order.id}</span>
                  <span className={`ds-order-status ds-order-status--${order.statusTone}`}>
                    {order.status}
                  </span>
                </span>
                <span className="mt-2 block text-left text-sm leading-5 text-body">{order.sidebarText}</span>
                <span className="mt-3 flex items-center justify-between text-sm font-bold text-graphite">
                  <span>{order.price}</span>
                  <span>{order.time}</span>
                </span>
              </label>
            ))}
          </div>
        </aside>

        <div className="ds-desktop-main">
          {approvalOrders.map((order) => (
            <div className={`ds-order-dependent ds-order-dependent--${order.id}`} key={`order-main-${order.id}`}>
              <div>
                <p className="text-sm font-semibold uppercase text-muted">Дополнительная работа</p>
                <h2 className="mt-2 text-3xl font-bold leading-tight text-ink">{order.title}</h2>
              </div>

              <div className="ds-approval-media mt-6">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={order.photoSrc}
                    alt={order.photoAlt}
                  />
                  <div className="absolute bottom-4 left-4 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-graphite shadow-sm">
                    Фото проблемы
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <InfoTile label="Стоимость" value={order.price} />
                <InfoTile label="Срок" value={order.time} />
              </div>

              <ApprovalActionGroup order={order} />
            </div>
          ))}
        </div>

        <aside className="ds-desktop-aside">
          <p className="text-sm font-semibold uppercase text-muted">История согласований</p>
          {approvalOrders.map((order) => (
            <div className={`ds-order-dependent ds-order-dependent--${order.id}`} key={`order-history-${order.id}`}>
              <div className="mt-4 grid gap-3">
                {order.approvalHistory.map((event) => (
                  <div className="ds-history-event" key={`${order.id}-${event.time}-${event.title}`}>
                    <span className={`ds-history-dot ds-history-dot--${event.tone}`} aria-hidden="true" />
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <p className="ds-history-title">{event.title}</p>
                        <time className="ds-history-time">{event.time}</time>
                      </div>
                      <p className="ds-history-text">{event.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </aside>
      </div>
    </article>
  );
}

function ApprovalActionGroup({ order }: { order: ApprovalOrder }) {
  return (
    <fieldset className="mt-5 grid grid-cols-3 gap-3">
      <legend className="sr-only">Решение по заказу №{order.id}</legend>
      <label className="focus-ring ds-mock-action ds-mock-action--approve inline-flex items-center justify-center gap-2">
        <input
          className="ds-action-radio"
          type="radio"
          name={`approval-decision-${order.id}`}
          defaultChecked={order.defaultDecision === "approve"}
        />
        <span className="ds-action-icon" aria-hidden="true">
          <Check size={13} strokeWidth={3} />
        </span>
        Согласовать
      </label>
      <label className="focus-ring ds-mock-action ds-mock-action--question inline-flex items-center justify-center gap-2">
        <input
          className="ds-action-radio"
          type="radio"
          name={`approval-decision-${order.id}`}
          defaultChecked={order.defaultDecision === "question"}
        />
        <span className="ds-action-icon" aria-hidden="true">
          <MessageCircle size={13} strokeWidth={2.7} />
        </span>
        Уточнить
      </label>
      <label className="focus-ring ds-mock-action ds-mock-action--decline inline-flex items-center justify-center gap-2">
        <input
          className="ds-action-radio"
          type="radio"
          name={`approval-decision-${order.id}`}
          defaultChecked={order.defaultDecision === "decline"}
        />
        <span className="ds-action-icon" aria-hidden="true">
          <X size={13} strokeWidth={3} />
        </span>
        Отказаться
      </label>
    </fieldset>
  );
}

function ApprovalMockup() {
  return (
    <article className="ds-approval-card p-3 sm:p-4" aria-label="Макет карточки согласования допработ">
      <div className="ds-approval-inner p-4 shadow-card sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="ds-status-pill ds-status-pill--attention px-3 py-1.5 text-sm font-semibold">
            <span className="ds-status-dot" aria-hidden="true" />
            Ожидает решения клиента
          </span>
          <span className="text-sm font-medium text-muted">Заказ №1842</span>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold uppercase text-muted">Дополнительная работа</p>
          <h2 className="mt-1 text-2xl font-bold text-ink">Замена повреждённого кронштейна</h2>
        </div>

        <div className="ds-approval-media mt-5">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={approvalPhotoSrc}
              alt={approvalPhotoAlt}
            />
            <div className="absolute bottom-3 left-3 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-graphite shadow-sm">
              Фото проблемы
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoTile label="Стоимость" value="8 500 ₽" />
          <InfoTile label="Срок" value="+1 день" />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button className="focus-ring ds-mock-action ds-mock-action--approve ds-mock-action--selected inline-flex items-center justify-center gap-2" type="button" aria-pressed="true">
            <span className="ds-action-icon" aria-hidden="true">
              <Check size={13} strokeWidth={3} />
            </span>
            Согласовать
          </button>
          <button className="focus-ring ds-mock-action ds-mock-action--question inline-flex items-center justify-center gap-2" type="button">
            <span className="ds-action-icon" aria-hidden="true">
              <MessageCircle size={13} strokeWidth={2.7} />
            </span>
            Уточнить
          </button>
          <button className="focus-ring ds-mock-action ds-mock-action--decline inline-flex items-center justify-center gap-2" type="button">
            <span className="ds-action-icon" aria-hidden="true">
              <X size={13} strokeWidth={3} />
            </span>
            Отказаться
          </button>
        </div>

        <p className="mt-4 rounded-lg bg-page px-3 py-2 text-sm leading-6 text-body">
          Решение будет сохранено в истории заказа.
        </p>
      </div>
    </article>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="ds-info-tile p-4">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-1 text-xl font-bold text-graphite">{value}</p>
    </div>
  );
}

function PainSection() {
  return (
    <section id="pain" className="ds-section ds-section--soft section-pad">
      <div className="container-page">
        <SectionHeader
          title="Где сервис теряет деньги"
          lead="Проблема не в ремонте. Проблема в паузе между найденной допработой и решением клиента."
        />
        <div className="ds-bento-grid ds-bento-grid--pain mt-8">
          {painItems.map((item) => (
            <FeatureCard key={item.title} item={item} tone="warning" />
          ))}
        </div>
        <p className="ds-callout ds-callout--warning mt-8 text-base font-semibold leading-7">
          Каждая такая пауза — это занятый пост, потерянное время и замороженные деньги.
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
          title="Как согласование проходит без лишних звонков"
          lead="Сотрудник собирает понятное согласование, а клиент принимает решение с телефона."
        />
        <div className="ds-step-grid mt-8">
          {stepItems.map((item, index) => (
            <StepCard key={item.title} item={item} index={index + 1} />
          ))}
        </div>
        <div className="ds-callout ds-callout--info mt-8">
          <p className="text-sm font-semibold uppercase text-action">Цепочка согласования</p>
          <p className="mt-3 text-lg font-bold leading-8 text-graphite">
            Проблема → Фото → Цена и срок → Ссылка → Решение клиента → Работа продолжается
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
          title="Что меняется для автосервиса"
          lead="Сервис не заменяет вашу учётную систему. Он закрывает самый болезненный момент: ожидание решения клиента по дополнительным работам."
        />
        <div className="ds-bento-grid ds-bento-grid--benefits mt-8">
          {benefitItems.map((item) => (
            <FeatureCard key={item.title} item={item} tone="success" />
          ))}
        </div>
        <p className="ds-callout ds-callout--success mt-8 text-base font-semibold leading-7">
          Главная задача — чтобы ремонт не останавливался из-за молчания клиента.
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
          <SectionHeader
            title="Проверьте, подойдёт ли сервис вашему автосервису"
            lead="Оставьте заявку — покажем раннюю версию и разберём, где у вас теряется время на согласованиях."
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
          <a className="focus-ring rounded-lg text-inverse-muted transition hover:text-inverse" href="/privacy">
            Политика обработки персональных данных
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

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
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

  function submitForm() {
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitForm();
  }

  return (
    <form className="ds-form-card" noValidate onSubmit={handleSubmit}>
      {isSent ? (
        <div className="ds-form-message ds-form-message--success mb-5" aria-live="polite">
          <p className="font-bold">Заявка отправлена.</p>
          <p className="mt-1 text-sm leading-6">
            Мы свяжемся с вами и покажем, как может работать согласование допработ в вашем сервисе.
          </p>
        </div>
      ) : null}

      {hasErrors ? (
        <div className="ds-form-message ds-form-message--error mb-5 text-sm font-medium" role="alert">
          Проверьте обязательные поля и телефон.
        </div>
      ) : null}

      <div className="grid gap-5">
        <Field label="Имя" error={errors.name} htmlFor="name">
          <input
            id="name"
            className="form-input"
            value={formData.name}
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </Field>

        <Field label="Телефон" error={errors.phone} htmlFor="phone">
          <input
            id="phone"
            className="form-input"
            type="tel"
            inputMode="tel"
            value={formData.phone}
            autoComplete="tel"
            placeholder="+7"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Название автосервиса" error={errors.serviceName} htmlFor="serviceName">
            <input
              id="serviceName"
              className="form-input"
              value={formData.serviceName}
              autoComplete="organization"
              required
              aria-invalid={Boolean(errors.serviceName)}
              aria-describedby={errors.serviceName ? "serviceName-error" : undefined}
              onChange={(event) => updateField("serviceName", event.target.value)}
            />
          </Field>

          <Field label="Город" error={errors.city} htmlFor="city">
            <input
              id="city"
              className="form-input"
              value={formData.city}
              autoComplete="address-level2"
              required
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? "city-error" : undefined}
              onChange={(event) => updateField("city", event.target.value)}
            />
          </Field>
        </div>

        <RadioGroup
          legend="Сколько машин обслуживаете в день?"
          name="carsPerDay"
          options={carsOptions}
          value={formData.carsPerDay}
          error={errors.carsPerDay}
          onChange={(value) => updateField("carsPerDay", value)}
        />

        <RadioGroup
          legend="Бывает ли простой на согласовании допработ?"
          name="approvalDelay"
          options={delayOptions}
          value={formData.approvalDelay}
          error={errors.approvalDelay}
          onChange={(value) => updateField("approvalDelay", value)}
        />

        <Field label="Комментарий" htmlFor="comment">
          <textarea
            id="comment"
            className="form-input min-h-28 resize-y"
            value={formData.comment}
            placeholder="Например: где чаще всего зависают согласования?"
            onChange={(event) => updateField("comment", event.target.value)}
          />
        </Field>

        <div className="ds-consent-list">
          <ConsentCheckbox
            id="personalDataConsent"
            checked={formData.personalDataConsent}
            error={errors.personalDataConsent}
            onChange={(checked) => updateField("personalDataConsent", checked)}
          >
            Даю согласие на обработку персональных данных для обработки заявки и обратной связи на условиях{" "}
            <a href="/personal-data-consent" target="_blank" rel="noreferrer">
              согласия на обработку персональных данных
            </a>
            .
          </ConsentCheckbox>

          <ConsentCheckbox
            id="privacyPolicyConsent"
            checked={formData.privacyPolicyConsent}
            error={errors.privacyPolicyConsent}
            onChange={(checked) => updateField("privacyPolicyConsent", checked)}
          >
            Подтверждаю, что ознакомлен(а) и согласен(на) с{" "}
            <a href="/privacy" target="_blank" rel="noreferrer">
              политикой обработки персональных данных
            </a>
            .
          </ConsentCheckbox>
        </div>

        <button className="primary-button w-full" type="button" disabled={isSubmitting} onClick={submitForm}>
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
        <p id={errorId} className="ds-field-error mt-2 text-sm font-medium" role="alert">
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
  name: RadioField;
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
          <label key={option} className={`radio-card ${value === option ? "radio-card--selected" : ""}`}>
            <input
              className="h-4 w-4 accent-highlight"
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              required
              onChange={(event) => onChange(event.target.value)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error ? (
        <p className="ds-field-error mt-2 text-sm font-medium" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function ConsentCheckbox({
  id,
  checked,
  error,
  onChange,
  children
}: {
  id: "personalDataConsent" | "privacyPolicyConsent";
  checked: boolean;
  error?: string;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label className={`ds-consent-card ${checked ? "ds-consent-card--selected" : ""}`}>
        <input
          id={id}
          className="ds-consent-input"
          type="checkbox"
          checked={checked}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="ds-consent-box" aria-hidden="true">
          <Check size={14} />
        </span>
        <span className="ds-consent-text">{children}</span>
      </label>
      {error ? (
        <p id={errorId} className="ds-field-error mt-2 text-sm font-medium" role="alert">
          {error}
        </p>
      ) : null}
    </div>
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

  if (!data.carsPerDay) {
    errors.carsPerDay = "Выберите объём машин в день.";
  }

  if (!data.approvalDelay) {
    errors.approvalDelay = "Выберите частоту простоя.";
  }

  if (!data.personalDataConsent) {
    errors.personalDataConsent = "Подтвердите согласие на обработку персональных данных.";
  }

  if (!data.privacyPolicyConsent) {
    errors.privacyPolicyConsent = "Подтвердите согласие с политикой обработки персональных данных.";
  }

  return errors;
}
