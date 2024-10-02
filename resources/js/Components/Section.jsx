import React from "react";

const Section = ({ children ,...props}) => {
    return (
        <section 
        {...props}
        className=" mt-4 p-4 sm:p-8  bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            {children}
        </section>
    );
};

export default Section;
