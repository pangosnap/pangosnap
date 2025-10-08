'use client'

// TODO: доделать
export default function Error({ error, reset }: { error: any; reset: () => void }) {
  return (
    <div className={'error-container'}>
      <h2>Что-то пошло не так!</h2>
      {/*<p>{error}</p>*/}
      <p>пиздец..</p>
      <button
        type={'button'}
        onClick={() => reset()}
        style={{ padding: '10px 20px', marginTop: '10px' }}
      >
        Попробовать снова (но лучше смотри консоль)
      </button>
    </div>
  )
}
