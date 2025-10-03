import Link from 'next/link'

export default function NotFound404() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.errorNumber}>
          <h1 style={styles.number}>
            4<span style={styles.zero}>0</span>4
          </h1>
          <div style={styles.underline}></div>
        </div>
        <div style={styles.text}>
          <h2 style={styles.title}>Oops! Page not found</h2>
          <p style={styles.description}>
            {`This page doesn't exist. Or maybe it moved somewhere else.`}
          </p>
        </div>
        <Link href={'/'} style={styles.homeLink}>
          <svg style={styles.icon} fill={'none'} stroke={'currentColor'} viewBox={'0 0 24 24'}>
            <path
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
              strokeWidth={2}
              d={'M10 19l-7-7m0 0l7-7m-7 7h18'}
            />
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 1rem',
  },
  content: {
    maxWidth: '28rem',
    width: '100%',
    textAlign: 'center' as const,
  },
  errorNumber: {
    marginBottom: '2rem',
  },
  number: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0,
  },
  zero: {
    display: 'inline-block',
    margin: '0 0.5rem',
  },
  underline: {
    width: '6rem',
    height: '2px',
    background: 'linear-gradient(to right, #60a5fa, #8b5cf6)',
    margin: '1rem auto 0',
    borderRadius: '9999px',
  },
  text: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '1rem',
    margin: 0,
  },
  description: {
    color: '#475569',
    fontSize: '1.125rem',
    lineHeight: 1.6,
    margin: 0,
  },
  homeLink: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1e293b',
    color: 'white',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    width: '1.25rem',
    height: '1.25rem',
    marginRight: '0.5rem',
  },
}
