import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    if (typeof window !== 'undefined' && window.__onAppError) {
      window.__onAppError(error, info);
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--ivory)',
            color: 'var(--navy)',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 540 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              Aureva Estates
            </div>
            <h1
              className="serif"
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 400,
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Something went wrong.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--slate)', marginTop: 18 }}>
              An unexpected error occurred. Please reload the page or return to the homepage.
            </p>
            <button
              className="btn btn-navy"
              style={{ marginTop: 28 }}
              onClick={() => {
                window.location.hash = '#home';
                window.location.reload();
              }}
            >
              Return home <span className="arrow"></span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
