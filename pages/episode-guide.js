import React from 'react';
import Layout from "../components/Layout";
import SimpleHeader from "../components/SimpleHeader";

const EpisodeGuide = () => {
    return (
        <Layout title={"Episode Guide"}>
            <SimpleHeader text={"Episode Guide"}/>

            <h2 className={`text-center`}>Coming soon</h2>

        </Layout>
    );
};

export default EpisodeGuide;
