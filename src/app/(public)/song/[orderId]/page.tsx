import { SongPlayerView } from '@/components/song/song-player-view'

export default async function SongPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  return <SongPlayerView orderId={orderId} />
}
