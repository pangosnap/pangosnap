'use client'

import Link from 'next/link'

export function HomeView() {
  return (
    <>
      <h1>Главная страница</h1>

      {/* переход в модалку через interception route */}
      <Link href={'/post/1'} scroll={false}>
        Открыть пост 1 (модалка)
      </Link>

      <br />

      {/* пример 404 в модалке */}
      <Link href={'/post/1444'} scroll={false}>
        Открыть пост 1444 (404 в модалке)
      </Link>

      <br />

      {/* прямой переход на каноническую страницу поста */}
      <Link href={'/post/1'}>Прямо на страницу поста (без фона)</Link>
    </>
  )
}
