import './App.css'
import { CurrentView, CurrentViewProvider, useCurrentView } from "@/contexts"
import { TestView, ReportView } from '@/views';

function ViewRouter() {
    const { view } = useCurrentView();

    if (view === CurrentView.TestView) return <TestView />;
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
