export function Dialog({ children, open, onClose }) {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          {children}
        </div>
      </div>
    );
  }
  
  export function DialogTitle({ children }) {
    return <h2 className="text-xl font-bold">{children}</h2>;
  }
  
  export function DialogContent({ children }) {
    return <div className="mt-4">{children}</div>;
  }
