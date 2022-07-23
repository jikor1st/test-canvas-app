import { Component, ErrorInfo, ReactNode, ReactElement } from 'react';

//types
import type { ErrorBoundaryState } from './error-boundary.type';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactElement;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  /* 클라이언트 Error Boundary 컴포넌트 */
  public state: ErrorBoundaryState = {
    hasError: false,
  };
  // 기본 에러 메세지 컴포넌트 지정
  public initialFallBack: ReactNode = (<h1>Error occured...</h1>);

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      } else {
        return this.initialFallBack;
      }
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
