import './App.css'
import { CurrentView, CurrentViewProvider, useCurrentView } from "@/contexts"
import { ReportView } from '@/views';

function ViewRouter() {
    const { view } = useCurrentView();

    if (view === CurrentView.ReportView) return <ReportView />;
    return null;
}

function App() {
    return (
        <CurrentViewProvider>
            <ViewRouter />
        </CurrentViewProvider>
    );
}

export default App
