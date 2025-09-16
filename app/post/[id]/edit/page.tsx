import { EditPost } from '@/views/post'

export const revalidate = 0
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <EditPost postId={Number(id)} />
}
