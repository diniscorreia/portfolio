import React from "react";
import { Link } from "gatsby";
import Layout from "components/Layout";

const NotFoundPage = () => (
    <Layout>
        <h1>
            NOT FOUND
        </h1>
        <p>
            In the 404 no one can hear you scream... <Link to="/">Go back.</Link>
        </p>
    </Layout>
)

export default NotFoundPage;