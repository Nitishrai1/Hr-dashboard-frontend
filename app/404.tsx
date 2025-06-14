// apps/hr-dashboard/pages/404.tsx or app/404.tsx based on your structure

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-600">Page Not Found</p>
    </div>
  );
}
