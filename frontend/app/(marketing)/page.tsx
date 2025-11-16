import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Zap, Shield, Smartphone } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container px-4 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Управляйте задачами{" "}
            <span className="text-primary">эффективно</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Современное веб-приложение для управления личными задачами.
            Создавайте, отслеживайте и выполняйте задачи с легкостью.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/register">
              <Button size="lg">Начать бесплатно</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                Узнать больше
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-24 bg-muted/50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Все, что нужно для продуктивности
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Простые инструменты для достижения ваших целей
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CheckCircle2 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Простой интерфейс</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Интуитивно понятный дизайн, который не отвлекает от работы
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Быстрый доступ</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Мгновенная синхронизация на всех ваших устройствах
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Безопасность</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ваши данные надежно защищены и зашифрованы
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Smartphone className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Везде с вами</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Работает на компьютере, планшете и телефоне
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Как это работает
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Регистрация</h3>
              <p className="text-muted-foreground">
                Создайте аккаунт за несколько секунд через email или Google
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Создайте задачи</h3>
              <p className="text-muted-foreground">
                Добавляйте задачи, устанавливайте приоритеты и сроки
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Достигайте целей</h3>
              <p className="text-muted-foreground">
                Отслеживайте прогресс и выполняйте задачи эффективно
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="container px-4 py-24 bg-muted/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Начните бесплатно
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Попробуйте все возможности Task Manager без ограничений
          </p>
          <Link href="/pricing">
            <Button size="lg">Посмотреть тарифы</Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Готовы начать?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Присоединяйтесь к тысячам пользователей, которые уже управляют своими задачами эффективно
          </p>
          <Link href="/register">
            <Button size="lg">Создать аккаунт</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
