import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Для начала работы",
    features: [
      "До 10 задач",
      "Базовый функционал",
      "Синхронизация на всех устройствах",
      "Поддержка по email",
    ],
    cta: "Начать бесплатно",
    href: "/register",
    popular: false,
  },
  {
    name: "Pro",
    price: "490",
    description: "Для активных пользователей",
    features: [
      "Неограниченное количество задач",
      "Приоритеты и теги",
      "Фильтры и поиск",
      "Приоритетная поддержка",
      "Статистика и аналитика",
      "Экспорт данных",
    ],
    cta: "Попробовать Pro",
    href: "/register",
    popular: true,
  },
  {
    name: "Team",
    price: "990",
    description: "Для команд",
    features: [
      "Все из Pro",
      "Совместная работа",
      "Управление командой",
      "Общие проекты",
      "Расширенная аналитика",
      "Персональный менеджер",
    ],
    cta: "Связаться с нами",
    href: "#",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="container px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Простые и понятные тарифы
          </h1>
          <p className="text-lg text-muted-foreground">
            Выберите план, который подходит именно вам
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.popular ? "border-primary shadow-lg" : ""}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium rounded-t-lg">
                  Популярный выбор
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₽{plan.price}</span>
                  <span className="text-muted-foreground">/месяц</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={plan.href} className="w-full">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Часто задаваемые вопросы
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Могу ли я изменить тариф позже?</h3>
              <p className="text-muted-foreground">
                Да, вы можете повысить или понизить тариф в любое время в настройках аккаунта.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Какие способы оплаты доступны?</h3>
              <p className="text-muted-foreground">
                Мы принимаем все основные банковские карты и электронные кошельки.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Есть ли пробный период?</h3>
              <p className="text-muted-foreground">
                Да, мы предоставляем 14-дневный пробный период для всех платных тарифов.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Можно ли вернуть деньги?</h3>
              <p className="text-muted-foreground">
                Да, мы предлагаем полный возврат средств в течение 30 дней.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
