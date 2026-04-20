import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8">
          <div className="glass-panel p-8 rounded-3xl border border-red-500/30 shadow-lg text-center max-w-lg">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong.</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">An unexpected error occurred in the application. Please try refreshing.</p>
            {this.state.error && (
              <div className="bg-red-50 text-red-800 p-4 rounded-xl text-left text-sm overflow-auto mb-6 max-h-40 border border-red-100">
                <p className="font-bold">{this.state.error.toString()}</p>
                <p className="text-xs mt-2 whitespace-pre-wrap">{this.state.errorInfo?.componentStack}</p>
              </div>
            )}
            <button 
              onClick={() => window.location.href = '/login'}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-md"
            >
              Return to Login
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
