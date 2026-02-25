import BottomNav from '../components/BottomNav';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col h-full bg-background-soft font-sans relative">
            <main className="flex-1 overflow-y-auto pb-28">
                {children}
            </main>
            <BottomNav />
        </div>
    );
};

export default MainLayout;
