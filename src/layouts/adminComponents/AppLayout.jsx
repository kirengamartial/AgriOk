import React from 'react';



const AppLayout = ({ aside, header, main }) => {
    return (
        <article className="h-screen flex">
            <aside className="w-60 shadow-lg flex flex-col bg-white border-r border-app-border">
                {aside}
            </aside>
            <section className="flex-1 flex flex-col overflow-hidden bg-body">
                <header className="backdrop-blur-md h-[4rem] flex items-center justify-between p-6 pb-0 bg-white/30">
                    {header}
                </header>
                <main className="flex-1 p-6 overflow-y-auto scrollbar-hide">
                    {main}
                </main>
            </section>
        </article>
    );
};

export default AppLayout;

