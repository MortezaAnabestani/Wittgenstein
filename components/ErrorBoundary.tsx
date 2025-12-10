
import React, { ErrorInfo, ReactNode } from "react";
import { RotateCcw, AlertTriangle, Copy, ChevronDown, ChevronUp, Eraser } from "lucide-react";
import { storage } from "../services/storage";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  showDetails: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, showDetails: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  copyError = () => {
    if (this.state.error) {
      const text = `Error: ${this.state.error.name}\nMessage: ${this.state.error.message}\nStack: ${this.state.error.stack}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('گزارش خطا کپی شد!');
      }
    }
  };

  softReset = () => {
     // Only clear critical playing state, not progress
     storage.removeItem('persian_connections_currency'); // Optional: Keep currency? Maybe safe to clear to fix bugs.
     // Reload page
     window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-theme-bg flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-board-bg p-8 rounded-3xl shadow-2xl max-w-md w-full flex flex-col items-center gap-4 animate-pop border border-white/20">
            <div className="bg-red-100 p-4 rounded-full text-red-500 shadow-inner">
              <AlertTriangle size={48} />
            </div>
            
            <h1 className="text-2xl font-black text-theme-dark">خطای سیستمی</h1>
            <p className="text-slate-600 font-bold text-sm leading-relaxed">
              ویتگنشتاین با تناقض روبرو شد.
            </p>

            <button 
              onClick={() => this.setState((s) => ({ showDetails: !s.showDetails }))}
              className="flex items-center gap-1 text-xs text-slate-500 font-bold hover:text-slate-800 transition-colors"
            >
              {this.state.showDetails ? 'مخفی کردن' : 'نمایش کد خطا'}
              {this.state.showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {this.state.showDetails && (
              <div className="bg-slate-200 p-3 rounded-xl w-full text-xs text-left font-mono overflow-auto max-h-40 text-slate-600 shadow-inner relative group">
                <button 
                  onClick={this.copyError}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 rounded hover:bg-white text-slate-500 transition-colors"
                  title="کپی"
                >
                  <Copy size={14} />
                </button>
                <pre>{this.state.error?.stack}</pre>
              </div>
            )}

            <div className="flex flex-col gap-3 w-full mt-2">
               <button
                onClick={() => window.location.reload()}
                className="w-full bg-theme-dark text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-all shadow-lg"
              >
                <RotateCcw size={18} />
                تلاش مجدد
              </button>
              
              <button
                onClick={this.softReset}
                className="w-full bg-orange-100 text-orange-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-200 transition-colors"
              >
                <Eraser size={18} />
                پاکسازی حافظه موقت (Soft Reset)
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
