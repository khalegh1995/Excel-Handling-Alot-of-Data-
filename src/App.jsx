import { Suspense, lazy } from "react";
import LoadingPage from "./components/Loading";

const TableData = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./components/TableData")), 2000);
  });
});

export default function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="ml-2">
        <TableData />
      </div>
    </Suspense>
  );
}
