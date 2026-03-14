interface LoadingStateProps {
  fullScreen?: boolean;
  message?: string;
  subtitle?: string;
}

export function LoadingState({
  fullScreen = false,
  message = 'Se incarca...',
  subtitle = 'Pregatim joburile pentru tine.',
}: LoadingStateProps) {
  return (
    <div
      className={fullScreen
        ? 'relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_30%),linear-gradient(180deg,_#f4fbfb_0%,_#ecfeff_45%,_#f8fafc_100%)] px-4'
        : 'relative flex items-center justify-center overflow-hidden px-4 py-16'}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-5rem] top-8 h-56 w-56 rounded-full bg-teal-300/35 blur-3xl" />
        <div className="absolute right-[-4rem] top-12 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute bottom-[-5rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-100/80 blur-3xl" />
      </div>

      <div className="w-full max-w-md rounded-[2rem] border border-white/75 bg-white/80 px-8 py-10 text-center shadow-[0_24px_80px_rgba(125,211,252,0.22)] backdrop-blur-xl sm:px-10">
        <div className="mx-auto flex w-fit items-center justify-center rounded-2xl border border-teal-100 bg-white/90 px-4 py-3 shadow-sm shadow-cyan-100/70">
          <img src="/joblio_logo.png" alt="Joblio" className="h-9 w-auto object-contain sm:h-10" />
        </div>

        <div className="mt-6 flex items-end justify-center gap-2" aria-hidden="true">
          <span className="h-3.5 w-3.5 animate-bounce rounded-full bg-teal-500 [animation-delay:-0.3s]" />
          <span className="h-3.5 w-3.5 animate-bounce rounded-full bg-sky-500 [animation-delay:-0.15s]" />
          <span className="h-3.5 w-3.5 animate-bounce rounded-full bg-cyan-400" />
        </div>

        <div className="mt-6">
          <p className="text-2xl font-semibold tracking-tight text-sky-950 sm:text-[1.7rem]">{message}</p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-sky-900/60 sm:text-[0.95rem]">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
