import React from "react";

const Acordeon = () => {
    return (
        <div className="flex w-full flex-col gap-4 overflow-hidden">
            <div className="flex flex-col items-start justify-start rounded-lg border border-slate-200 bg-white p-3 hover:cursor-pointer hover:bg-gray-50">
                <button
                    type="button"
                    aria-disabled="false"
                    className="group rounded-lg align-middle text-sm font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed stroke-slate-500 text-black min-w-[38px] gap-2 disabled:stroke-slate-400 disabled:text-slate-400 hover:opacity-80 flex h-auto w-full items-center justify-between overflow-hidden whitespace-pre-wrap p-0 text-left leading-tight"
                    id=":r72:"
                    aria-expanded="false"
                    aria-controls=":r73:"
                >
                    <div>
                        <div className="flex w-full items-center justify-start gap-2">
                            <div className="inline-flex size-5 items-center justify-start">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#1D4ED8"
                                    stroke-width="1.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11 16L15 12L11 8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                    <circle cx="12" cy="12" r="9"></circle>
                                </svg>
                            </div>
                            <p className="w-full font-medium">
                                What is Tailframes?
                            </p>
                        </div>
                    </div>
                    <div className="size-5">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="stroke-black transition-transform duration-300 ease-in-out"
                        >
                            <path d="M5.83325 8.33325L9.99992 12.4999L14.1666 8.33325"></path>
                        </svg>
                    </div>
                </button>
                <div
                    id=":r73:"
                    role="region"
                    aria-hidden="true"
                    aria-labelledby=":r72:"
                    className="grid w-full text-xs text-slate-600 transition-[grid-template-rows,opacity] duration-300 ease-out md:pr-7 text-justify pl-7 grid-rows-[0fr] opacity-0"
                >
                    <div className="overflow-hidden">
                        <p>
                            Tailframes is a comprehensive library of pre-built
                            UI components designed with <strong>React</strong>{" "}
                            and <strong>Tailwind CSS</strong>. Our goal is to
                            help developers quickly and efficiently build
                            beautiful, responsive websites by providing a wide
                            range of customizable{" "}
                            <strong>Tailwind CSS components</strong> that adhere
                            to modern <strong>UI/UX design principles</strong>.
                            Whether you're building a new project from scratch
                            or enhancing an existing one, Tailframes offers the
                            perfect blend of <strong>React components</strong>{" "}
                            to streamline your development process.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Acordeon;
