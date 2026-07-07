import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught render error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.assign("/");
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-amz-bg px-4 text-center">
          <h1 className="text-2xl font-bold text-amz-ink">
            Something went wrong
          </h1>
          <p className="max-w-md text-sm text-amz-muted">
            An unexpected error occurred while rendering this page. Please head
            back and try again.
          </p>
          <button
            onClick={this.handleReset}
            className="cursor-pointer rounded-full bg-amz-cart px-6 py-2 text-sm font-medium text-amz-ink hover:bg-amz-cart-hover"
          >
            Back to home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
