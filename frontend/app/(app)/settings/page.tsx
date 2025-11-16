"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const { data: session } = useSession()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Настройки</h1>
        <p className="text-muted-foreground mt-2">
          Управление вашим профилем и настройками
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
          <CardDescription>
            Обновите информацию вашего профиля
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              defaultValue={session?.user?.name || ""}
              placeholder="Ваше имя"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={session?.user?.email || ""}
              disabled
            />
            <p className="text-sm text-muted-foreground">
              Email нельзя изменить
            </p>
          </div>

          <Button>Сохранить изменения</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Подключенные аккаунты</CardTitle>
          <CardDescription>
            Управление подключенными аккаунтами
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Google</p>
              <p className="text-sm text-muted-foreground">
                Вход через Google аккаунт
              </p>
            </div>
            <Button variant="outline">Подключено</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Опасная зона</CardTitle>
          <CardDescription>
            Необратимые действия с вашим аккаунтом
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Удалить аккаунт</h3>
              <p className="text-sm text-muted-foreground mb-4">
                После удаления аккаунта все ваши данные будут безвозвратно удалены
              </p>
              <Button variant="destructive">Удалить аккаунт</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
