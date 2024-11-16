import React from 'react';

const AppLayout = ({ aside, header, main }) => {
    return (
        <article className="h-screen flex bg-body">
            {/* Hide the default aside on mobile */}
            <aside className=" lg:flex w-16 shadow-lg flex-col bg-white border-r border-app-border">
                {aside}
            </aside>
            <section className="flex-2 flex flex-col ">
                <header className="backdrop-blur-md h-[4rem] flex items-center justify-between p-6 pb-0 bg-white/30 lg:ml-0">
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