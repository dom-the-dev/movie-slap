import React from 'react';
import Layout from "../components/Layout";

const StyleGuide = () => {
    return (
        <Layout title={"Styleguide"}>
            <h1>Headline</h1>
            <h2>Headline</h2>
            <h3>Headline</h3>
            <h4>Headline</h4>

            <div>
                <button className={"primary"}>Primary</button>
                <br/>
                <button className={"secondary"}>Secondary</button>
            </div>

            <div className="form-group">
                <label htmlFor="" className="label">Label</label>
                <input type="text" className="input" placeholder={"Input"}/>
            </div>
        </Layout>

    );
};

export default StyleGuide;
