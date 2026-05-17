import { useToast } from '../contexts/ToastContext';

export default function Toast() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div key={toast.id} className={`px-4 py-2 rounded-lg shadow-lg text-white animate-slide-up ${
          toast.type === 'success' ? 'bg-green-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          {toast.message}
          <button onClick={() => removeToast(toast.id)} className="ml-4 text-white opacity-70 hover:opacity-100">✕</button>
        </div>
      ))}
    </div>
  );
}